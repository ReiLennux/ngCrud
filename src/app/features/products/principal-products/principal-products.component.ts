import { Component, OnInit } from '@angular/core';
import { product } from '../../../core/models/product';
import Swal from 'sweetalert2';
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
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  productoSeleccionadoId!: string;
  categoriaSeleccionadoId: string = "";
  subcategoriaSeleccionadoId: string = "";
  searchTerm: string = '';

  constructor(
    private productsService: ProductsService,
    private cateogoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerSubcategorias();
  }

  obtenerProductos() {
    this.productsService.obtenerProductos().subscribe(
      (data: product[]) => {
        this.products = data;
      },
      err => console.error(err)
    );
  }

  obtenerCategorias() {
    this.cateogoriesService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      err => console.error(err)
    );
  }

  obtenerSubcategorias() {
    this.cateogoriesService.obtenerTodasSubCategorias().subscribe(
      (data: any[]) => {
        this.subcategorias = data;
      },
      err => console.error(err)
    );
  }

  seleccionarProducto(id: string) {
    this.productoSeleccionadoId = id;
  }

  actualizarProductos() {

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto actualizado",
      showConfirmButton: false,
      timer: 1500
    });
    this.products = [];
    this.ngOnInit();
  }

  obtenerCategoria(categoriaId: string | undefined): String {
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


  onCategoriaSeleccionada(categoria: any) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria : 0;
  }

  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
  }

}
