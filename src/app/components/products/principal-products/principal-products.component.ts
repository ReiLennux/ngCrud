import { Component, OnInit } from '@angular/core';
import { product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal-products',
  templateUrl: './principal-products.component.html',
  styleUrls: ['./principal-products.component.css']
})
export class PrincipalProductsComponent implements OnInit {
  products: product[] = [];
  categorias: { id: Number, strName: String, strDescription: String }[] = [];
  subcategorias: any[] = [];
  productoSeleccionadoId!: string;
  categoriaSeleccionadoId: number = 0;
  subcategoriaSeleccionadoId: number = 0;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10; // Change this to your desired page size

  constructor(private productsService: ProductsService) { }

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
    this.productsService.getcategorias().subscribe(
      (data: []) => {
        this.categorias = data;
      },
      err => console.error(err)
    );
  }

  obtenerSubcategorias() {
    this.productsService.getsubcategorias().subscribe(
      (data: []) => {
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

  obtenerCategoria(categoriaId: number): String {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.strName : '';
  }

  obtenerSubcategoria(subcategoriaId: number): String {
    const subcategoria = this.subcategorias.find(subcat => subcat.id === subcategoriaId);
    return subcategoria ? subcategoria.strName : '';
  }

  filtrarProductos(): product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.products
      .filter(producto =>
        ((this.categoriaSeleccionadoId == 0 || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
          (this.subcategoriaSeleccionadoId == 0 || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
        (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
      .slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  onCategoriaSeleccionada(categoria: any) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria : 0;
    this.currentPage = 1; // Reset page number when category changes
  }

  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
    this.currentPage = 1; // Reset page number when subcategory changes
  }

}
