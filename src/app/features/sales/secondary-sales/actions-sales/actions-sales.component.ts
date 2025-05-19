import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateSale, Sale, SaleDetails } from '../../../../core/models/sale';
import Swal from 'sweetalert2';
import { SelectedProduct, product } from '../../../../core/models/product';
import { SalesService } from '../../../../core/services/sales.service';
import { ProductsService } from '../../../../core/services/products/products.service';
import { generateAndDownloadTicket } from '../../../../helpers/handleTicket';

@Component({
    selector: 'app-actions-sales',
    templateUrl: './actions-sales.component.html',
    styleUrl: './actions-sales.component.css',
    standalone: false
})
export class ActionsSalesComponent implements OnInit {
  @Input() Sale!: Sale;
  @Output() saleActualizada = new EventEmitter<void>();
  showModal: boolean = false;
  postSales!: Sale; 
  selectedProducts:SelectedProduct[] = [];
  constructor(private saleService: SalesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.saleService.getSaleById(this.Sale.id!).subscribe(
      (sale: any) => {
        this.postSales = sale;
        this.productsService.obtenerProductos().subscribe((productos: product[]) => {
          sale.SaleDetails.forEach((detail: SaleDetails) => {
            const matchedProduct = productos.find(p => p.id == detail.idProProducto);
            if (matchedProduct) {
              this.selectedProducts.push({
                id: sale.id,
                product: matchedProduct,
                quantity: detail.decQuantity
              });
            }
          });
          console.log("productos dentro de la venta: ", this.selectedProducts);
        });
      }
    );
  }
  


   delete() {
     Swal.fire({
       title: "¿Realmente quieres eliminar esta venta?",
       text: "Si eliminas esta venta, se perderán sus datos para siempre y el stock de los productos sera devuelto.",
       icon: "warning",
       background: "#111827",
       color:"#fff",
       showCancelButton: true,
       confirmButtonColor: "#d33",
       cancelButtonColor: "#374151",
       cancelButtonText: "Cancelar",
       confirmButtonText: "Continuar"
     }).then((result: { isConfirmed: any; }) => {
       if (result.isConfirmed) {
         this.saleService.deleteSale(this.Sale).subscribe(
           res => {
             this.saleActualizada.emit();
           },
           err => console.error(err)
         );
         Swal.fire({
           title: "Eliminado",
           text: "La venta fue eliminada",
           icon: "success"
         });
       }
     });
   }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  incrementQuantity(selectedProduct: SelectedProduct) {
    selectedProduct.quantity++
  }

  decrementQuantity(selectedProduct: SelectedProduct) {
    if (selectedProduct.quantity > 1) {
        selectedProduct.quantity--;
    } else {
        Swal.fire({
            title: '¿Eliminar producto?',
            text: '¿Estás seguro de que deseas eliminar este producto de la lista?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const index = this.selectedProducts.indexOf(selectedProduct);
                if (index !== -1) {
                    this.selectedProducts.splice(index, 1);
                    Swal.fire(
                        'Producto eliminado',
                        'El producto ha sido eliminado de la lista.',
                        'success'
                    );
                }
            }
        });
    }
}

async reprintTicket() {
    generateAndDownloadTicket(this.selectedProducts);
}


async updateSale() {

  if (this.selectedProducts.length > 0) {
    const saleDetails: SaleDetails[] = this.selectedProducts.map(selectedProduct => ({
      idProProducto: selectedProduct.product.id,
      decQuantity: Number(selectedProduct.quantity)
    }));

    const subtotal = this.selectedProducts.reduce((total, p) => {
      return total + (p.product.decPrice * p.quantity);
    }, 0);

    const newSale: Sale = {
      id: this.Sale.id, // si es una actualización
      DateSale: this.Sale.DateSale,  //usa camelCase como en tu modelo
      SaleDetails: saleDetails,
      decSubtotal: subtotal,
      firebaseId: this.Sale.firebaseId  //si aplica
    };

    this.saleService.updateSale(newSale).then(
      () => {
        this.selectedProducts = [];

        Swal.fire({
          icon: 'success',
          title: 'Venta actualizada con éxito',
          showConfirmButton: false
        });
      }
    ).catch(
      error => {
        console.error("Error al actualizar venta:", error);
      }
    );

  } else {
    Swal.fire({
      title: '¡Claro que no! 😄',
      text: "Venta con 0 productos, imposible cobrar.",
      icon: "error",
      background: "#111827",
      color: "#fff",
      showConfirmButton: false
    });
  }
}


}
