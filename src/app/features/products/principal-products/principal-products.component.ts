import { Component, OnInit } from '@angular/core';
import { product } from '../../../core/models/product';
import { Categoria, CategoriesService, Subcategoria } from '../../../core/services/products/catalog/categories.service';
import { ProductsService } from '../../../core/services/products/products.service';
@Component({
    selector: 'app-principal-products',
    templateUrl: './principal-products.component.html',
    styleUrls: ['./principal-products.component.css'],
    standalone: false
})
export class PrincipalProductsComponent implements OnInit {
  products: product[] = [];
  categorias: {id: string; strName: string}[] = [];
  subcategorias: {id: string; strName: string}[] = [];
  productoSeleccionadoId!: string;
  categoriaSeleccionadoId: string = "";
  subcategoriaSeleccionadoId: string = "";
  searchTerm: string = '';

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerSubcategorias();
  }

  //#region Filters

  //#endregion

  obtenerProductos() {
    this.productsService.obtenerProductos().subscribe({
      next: (data: product[]) => {
        this.products = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  obtenerCategorias() {
    this.categoriesService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data.map(c => ({ id: c.id!, strName: c.strName }));
      },
      error: err => {
        console.error(err);
      }
    });
  }

  obtenerSubcategorias() {
    this.categoriesService.obtenerTodasSubCategorias().subscribe({
      next: (data: Subcategoria[]) => {
        this.subcategorias = data.map(s => ({ id: s.id!, strName: s.strName }));
      },
      error: err => {
        console.error(err);
      }
    });
  }

  seleccionarProducto(id: string) {
    this.productoSeleccionadoId = id;
  }

  actualizarProductos() {
    this.products = [];
    this.ngOnInit();
  }

  obtenerCategoria(categoriaId: string): String {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.strName : '';
  }

  obtenerSubcategoria(subcategoriaId: string | undefined): String {
    const subcategoria = this.subcategorias.find(subcat => subcat.id === subcategoriaId);
    return subcategoria ? subcategoria.strName : '';
  }

  filtrarProductos(): product[] {
    return this.products
      .filter(producto =>
        ((this.categoriaSeleccionadoId == "" || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
          (this.subcategoriaSeleccionadoId == "" || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
        (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
  }

  onsubcategoriaSeleccionada(subcategoria: string | number | null) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria.toString() : '0';
  }

}
