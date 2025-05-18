import { StorageService } from './../../../core/services/storage.service';
import { Component } from '@angular/core';
import { SelectedProduct, product } from '../../../core/models/product';
import { DateSale, Sale, SaleDetails } from '../../../core/models/sale';
import { createDateSale } from '../../../helpers/generateDateSale';
import Swal from 'sweetalert2';
import { generateAndDownloadTicket } from '../../../helpers/handleTicket';
import { SalesService } from '../../../core/services/sales.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { UserService } from '../../../core/services/user.service';


@Component({
    selector: 'app-principal-sales',
    templateUrl: './principal-sales.component.html',
    styleUrls: ['./principal-sales.component.css'] // Corregido styleUrl a styleUrls
    ,
    standalone: false
})
export class PrincipalSalesComponent {
  searchTerm: string = '';

  newDateSale: DateSale = createDateSale()
  newSales: Sale[] = []

  products: product[] = [];
  selectedProducts: SelectedProduct[] = [];

  categoriaSeleccionadoId: string = "";
  subcategoriaSeleccionadoId: string = "";

  userOnSesion: String = ''


  constructor(
    private saleService: SalesService, 
    private productsService: ProductsService,
    private storageService: StorageService,
  ) { }

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


  ngOnInit(): void {
    this.productsService.obtenerProductos().subscribe(
      (data: product[]) => {
        this.products = data;
      }
    );
    this.userOnSesion = this.storageService.getUserInSession()
  }

  pushProduct(product: product) {
    if(product.decStock !== 0){
      const isProductExists = this.selectedProducts.some(
        (p) => p.product.id === product.id
      );
      if (isProductExists) {
        Swal.fire({
          icon: 'info',
          title: 'el producto ya esta en la venta',
          showConfirmButton: false
        })
      } else {
        this.selectedProducts.push({ product: product, quantity: 1 }); // Por defecto, la cantidad es 1
      }
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Stock insuficiente',
        showConfirmButton: false
      })
    }
    
  }


  onCategoriaSeleccionada(categoria: any) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria : 0;
  }

  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
  }

  filtrarProductos(): product[] {
    return this.products.filter(producto =>
      ((this.categoriaSeleccionadoId == "" || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
        (this.subcategoriaSeleccionadoId == "" || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
      (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  async crearSale() {
    if (this.selectedProducts.length > 0) {
      const saleDetails: SaleDetails[] = this.selectedProducts.map(selectedProduct => ({
        idProProducto: selectedProduct.product.id,
        decQuantity: Number(selectedProduct.quantity)
      }));
  
      const subtotal = this.selectedProducts.reduce((total, p) =>
        total + (p.product.decPrice * p.quantity), 0);
  
      const newSale: Sale = {
        DateSale: this.newDateSale,
        SaleDetails: saleDetails,
        decSubtotal: subtotal
      };
  
      this.saleService.postSale(newSale).subscribe(
        response => {
          generateAndDownloadTicket(this.selectedProducts);
          this.selectedProducts = [];
  
          Swal.fire({
            icon: 'success',
            title: 'Venta creada con éxito',
            showConfirmButton: false
          });
        },
        error => {
          console.error("Error al crear venta:", error);
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
  
  calTotal(): number {
    let total = 0;
    this.selectedProducts.forEach(selectedProduct => {
        total += selectedProduct.product.decPrice * selectedProduct.quantity;
    });
    return total;
}

  
}
