import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../models/product';
@Component({
  selector: 'app-principal-sales',
  templateUrl: './principal-sales.component.html',
  styleUrl: './principal-sales.component.css'
})
export class PrincipalSalesComponent {
  searchTerm: String = '';

  products:  product[] = [];
  selectedProducts: product[] = [];

  categoriaSeleccionadoId: number = 0;
  subcategoriaSeleccionadoId: number = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.obtenerProductos().subscribe(
      (data: product[]) => {
        this.products = data;
      }
    );
  }
  pushProduct(product: product) {
    // Verificar si el producto ya está presente en el arreglo
    const isProductExists = this.selectedProducts.some(
      (p) => p.id === product.id
    );
    if (isProductExists) {
      console.log("El producto ya está en la lista.");
    } else {
      // Si el producto no existe, añadirlo al arreglo
      this.selectedProducts.push(product);
    }
  }
  onCategoriaSeleccionada(categoria: any) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria : 0;
  }

  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
  }

  filtrarProductos(): product[] {
    return this.products
      .filter(producto =>
        ((this.categoriaSeleccionadoId == 0 || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
          (this.subcategoriaSeleccionadoId == 0 || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
        (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
  }

}
