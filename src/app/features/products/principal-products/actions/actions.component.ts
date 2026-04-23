import { CategoriesService } from './../../../../core/services/products/catalog/categories.service';
import { FileService } from './../../../../core/services/file.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../../../../core/models/product';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.css'],
    standalone: false
})
export class ActionsComponent {
  @Input() producto!: product;
  @Output() productoActualizado = new EventEmitter<void>();
  showModal: boolean = false;
  selectedFile: File | undefined;
  categorias: {id: string, strName: string}[] = [];
  subcategorias: {id: string, strName: string}[] = [];
  categoriaSeleccionadoId: string = "";
  subcategoriaSeleccionadoId: string = "";
  putProducto: product = { ...this.producto };

  showAlert: boolean = false;

  constructor(
    private productsServices: ProductsService, 
    private fileService: FileService,
    private categoriesService: CategoriesService
  ) {}

  delete() {
    this.productsServices.eliminarProducto(this.producto.id).subscribe(
      res => {
        this.productoActualizado.emit();
        setTimeout(() => this.showModal = false, 1500);
      },
      err => {
        this.showAlert = true;
      }
    );
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.putProducto = { ...this.producto };
    this.showAlert = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCategoriaSeleccionada(categoria: any) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria : 0;
    this.putProducto.idCatCategoria = this.categoriaSeleccionadoId;
  }
  
  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
    this.putProducto.idCatSubcategoria = this.subcategoriaSeleccionadoId;
  }

  obtenerCategorias() {
    this.categoriesService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      err => {
        console.error(err);
      }
    );
  }
  
  obtenerSubcategorias() {
    this.categoriesService.obtenerTodasSubCategorias().subscribe(
      (data: any[]) => {
        this.subcategorias = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  async update() {
    if (!this.selectedFile) {
      try {
        await this.productsServices.editarProducto(this.putProducto);
        this.toggleModal();
        this.productoActualizado.emit();
      } catch (err) {
      }
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'mypreset');

    try {
      const res: any = await this.fileService.uploadFile(formData, 'upload');
      this.putProducto.strImage = res.url;
      await of(this.productsServices.editarProducto(this.putProducto)).toPromise();
      this.productoActualizado.emit();
      this.toggleModal();
    } catch (err) {
    }
  }
}
