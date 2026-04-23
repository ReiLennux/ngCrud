import { CategoriesService, Categoria, Subcategoria } from './../../../../core/services/products/catalog/categories.service';
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
    this.productsServices.eliminarProducto(this.producto.id).subscribe({
      next: res => {
        this.productoActualizado.emit();
        setTimeout(() => this.showModal = false, 1500);
      },
      error: err => {
        this.showAlert = true;
      }
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.putProducto = { ...this.producto };
    this.showAlert = false;
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }

  onCategoriaSeleccionada(categoria: string | number | null) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria.toString() : '0';
    this.putProducto.idCatCategoria = this.categoriaSeleccionadoId;
  }
  
  onsubcategoriaSeleccionada(subcategoria: string | number | null) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria.toString() : '0';
    this.putProducto.idCatSubcategoria = this.subcategoriaSeleccionadoId;
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
      const res = await this.fileService.uploadFile(formData, 'upload');
      if (res) {
        this.putProducto.strImage = res.url;
      }
      await of(this.productsServices.editarProducto(this.putProducto)).toPromise();
      this.productoActualizado.emit();
      this.toggleModal();
    } catch (err) {
    }
  }
}
