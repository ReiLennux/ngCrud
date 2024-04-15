import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { SelectedProduct, product } from '../../../models/product';
import { DateSale, Sale } from '../../../models/sale';
import { createDateSale } from '../../../helpers/generateDateSale';
import { SalesService } from '../../../services/sales.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-principal-sales',
  templateUrl: './principal-sales.component.html',
  styleUrls: ['./principal-sales.component.css'] // Corregido styleUrl a styleUrls
})
export class PrincipalSalesComponent {
  idVenVenta: number = 0;
  searchTerm: String = '';

  newDateSale: DateSale = createDateSale()
  newSales: Sale[] = []

  products: product[] = [];
  selectedProducts: SelectedProduct[] = [];

  categoriaSeleccionadoId: number = 0;
  subcategoriaSeleccionadoId: number = 0;

  userOnSesion: String = ''


  constructor(private saleService: SalesService, private productsService: ProductsService, private userService:UserService) { }

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
    this.userService.usuarioEnSesion().subscribe(
      (data: any) => {
        this.userOnSesion = data[0].strName;
      }
    )
  }

  pushProduct(product: product) {
    if(product.decStock !== 0){
      const isProductExists = this.selectedProducts.some(
        (p) => p.product.id === product.id
      );
      if (isProductExists) {
        console.log("El producto ya está en la lista.");
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
      ((this.categoriaSeleccionadoId == 0 || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
        (this.subcategoriaSeleccionadoId == 0 || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
      (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  async crearSale() {
    await this.crearDateSale();
    if (this.idVenVenta !== 0) {
      if (this.selectedProducts.length > 0) {
        this.selectedProducts.forEach(selectedProduct => {
          const newSale: Sale = {
            idVenVenta: this.idVenVenta,
            idProProducto: selectedProduct.product.id,
            decQuantity: selectedProduct.quantity, // Utilizamos la cantidad asociada con cada producto
            decSubtotal: selectedProduct.product.decPrice * selectedProduct.quantity // Calculamos el subtotal multiplicando el precio por la cantidad
          };
  
          this.saleService.insertarSale(newSale).subscribe(
            response => {
              this.ImprimirTicket(this.selectedProducts)
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
  
  async crearDateSale() {
    if (this.selectedProducts.length > 0) {
      try {
        const response = await this.saleService.crearDateSale(this.newDateSale);
        this.idVenVenta = response.insertedId;
      } catch (error) {
        // Manejar el error si es necesario
        console.error('Error al crear la venta: ', error);
      }
    } else {
      Swal.fire({
        title: 'Claro que no! 😄',
        text: "Venta con 0 productos, imposible cobrar.",
        icon: "error",
        background: "#111827",
        color: "#fff",
        showConfirmButton: false
      })
    }
  }

  calTotal(): number {
    let total = 0;
    this.selectedProducts.forEach(selectedProduct => {
        total += selectedProduct.product.decPrice * selectedProduct.quantity;
    });
    return total;
}

ImprimirTicket(selectedProducts: SelectedProduct[]) {
  console.log(selectedProducts);
}

  
}
