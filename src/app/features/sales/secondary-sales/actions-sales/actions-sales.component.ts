import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateSale, Sale, SaleDetails } from '../../../../core/models/sale';
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

  showAlert: boolean = false;

  constructor(private saleService: SalesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.saleService.getSaleById(this.Sale.id!).subscribe({
      next: (sale: any) => {
        this.postSales = sale;
        this.productsService.obtenerProductos().subscribe({
          next: (productos: product[]) => {
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
          }
        });
      }
    });
  }
  


   delete() {
    this.saleService.deleteSale(this.Sale).subscribe({
      next: res => {
        this.saleActualizada.emit();
        setTimeout(() => this.showModal = false, 1500);
      },
      error: err => {}
    });
   }

  toggleModal(){
    this.showModal = !this.showModal;
    this.showAlert = false;
  }

  incrementQuantity(selectedProduct: SelectedProduct) {
    selectedProduct.quantity++
  }

  decrementQuantity(selectedProduct: SelectedProduct) {
    if (selectedProduct.quantity > 1) {
        selectedProduct.quantity--;
    } else {
        const index = this.selectedProducts.indexOf(selectedProduct);
        if (index !== -1) {
            this.selectedProducts.splice(index, 1);
        }
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
      id: this.Sale.id,
      DateSale: this.Sale.DateSale,
      SaleDetails: saleDetails,
      decSubtotal: subtotal,
      firebaseId: this.Sale.firebaseId
    };

    this.saleService.updateSale(newSale).then(
      () => {
        this.selectedProducts = [];
      }
    ).catch(
      error => {}
    );

  } else {
    // Venta con 0 productos, imposible cobrar
  }
}


}
