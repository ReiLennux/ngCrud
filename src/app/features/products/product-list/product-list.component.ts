import { Component, OnInit } from '@angular/core';
import { product } from '../../../core/models/product';
import { Categoria, CategoriesService, Subcategoria } from '../../catalogs/services/categories.service';
import { ProductsService } from '../services/products.service';
@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    standalone: false
})
export class ProductListComponent implements OnInit {
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
        this.filtrarProductos();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  obtenerCategorias() {
    this.categoriesService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data.map(c => ({ id: c.id!, strName: c.strName }));
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  obtenerSubcategorias() {
    this.categoriesService.obtenerTodasSubCategorias().subscribe({
      next: (data: Subcategoria[]) => {
        this.subcategorias = data.map(s => ({ id: s.id!, strName: s.strName }));
      },
      error: (err: any) => {
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
    const categoria = this.categorias.find(cat => cat.id == categoriaId);
    return categoria ? categoria.strName : '';
  }

  obtenerSubcategoria(subcategoriaId: string | undefined): String {
    const subcategoria = this.subcategorias.find(subcat => subcat.id == subcategoriaId);
    return subcategoria ? subcategoria.strName : '';
  }

  filteredProducts: product[] = [];

  filtrarProductos() {
    this.filteredProducts = this.products.filter(producto =>
      ((this.categoriaSeleccionadoId == "" || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
        (this.subcategoriaSeleccionadoId == "" || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
      (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  onsubcategoriaSeleccionada(subcategoria: string | number | null) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria.toString() : '0';
  }

}
