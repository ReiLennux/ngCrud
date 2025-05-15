import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateSale, Sale } from '../../../../core/models/sale';
import Swal from 'sweetalert2';
import { SelectedProduct, product } from '../../../../core/models/product';
import { SalesService } from '../../../../core/services/sales.service';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
    selector: 'app-actions-sales',
    templateUrl: './actions-sales.component.html',
    styleUrl: './actions-sales.component.css',
    standalone: false
})
export class ActionsSalesComponent implements OnInit {
  @Input() dataSale!: DateSale;
  @Output() saleActualizada = new EventEmitter<void>();
  showModal: boolean = false;
  postSales:any[] = []; 
  selectedProducts:SelectedProduct[] = [];
  constructor(private saleService: SalesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.saleService.obtenerSaleById(this.dataSale.id).subscribe(
      (data: any) => {
        this.postSales = data;
        console.log(this.postSales);
  
        // Obtener todos los productos
        this.productsService.obtenerProductos().subscribe(
          (productos: product[]) => {
            // Filtrar los productos basados en los IDs de los productos de las ventas y la cantidad
            this.selectedProducts = productos
              .filter((product: product) => {
                const saleMatch = this.postSales.find((sale: Sale) => sale.idProProducto === product.id);
                return saleMatch !== undefined; // Retornar true si hay una coincidencia
              })
              .map((product: product) => {
                const saleMatch = this.postSales.find((sale: Sale) => sale.idProProducto === product.id);
                return {id:saleMatch.id, product: product, quantity: saleMatch ? saleMatch.decQuantity : 0 };
              });
          }
        );
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
        this.saleService.eliminarSale(this.dataSale.id).subscribe(
          res => {
            console.log(res); 
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


async updateSale() {
  console.log('updateSales');
  if (this.dataSale.id != 0) {
    if (this.selectedProducts.length > 0) {
      this.selectedProducts.forEach(selectedProduct => {
        const newSale: Sale = {
          id: selectedProduct.id,
          idVenVenta: this.dataSale.id,
          idProProducto: selectedProduct.product.id,
          decQuantity: Number(selectedProduct.quantity), 
          decSubtotal: selectedProduct.product.decPrice * selectedProduct.quantity
        };
        this.saleService.actualizarSale(newSale).subscribe(
          response => {
            console.log("se logro")
            this.selectedProducts = [];
            Swal.fire({
              icon:'success',
              title: 'Venta creada con éxito',
              showConfirmButton: false
            })
            
          },
          error => {
            console.error(error);
          }
        );
      });
    } else {
      Swal.fire({
        title: 'Claro que no! 😄',
        text: "Venta con 0 productos, imposible cobrar.",
        icon: "error",
        background: "#111827",
        color: "#fff",
        showConfirmButton: false
      });
    }
  } else {
    console.log('no hay idventa')
  }
}

}
