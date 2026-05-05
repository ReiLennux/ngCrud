import { CategoriesService, Categoria, Subcategoria } from '../../../catalogs/services/categories.service';
import { FileService } from './../../../../core/services/file.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { product } from '../../../../core/models/product';
import { ProductsService } from '../../services/products.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  standalone: false
})
export class ActionsComponent implements OnInit {
  @Input() producto!: product;
  @Output() productoActualizado = new EventEmitter<void>();

  showModal: boolean = false;
  isLoading: boolean = false;
  showAlert: boolean = false;
  selectedFile: File | undefined;

  categorias: { id: string, strName: string }[] = [];
  subcategorias: { id: string, strName: string }[] = [];
  categoriaSeleccionadoId: string = '';
  subcategoriaSeleccionadoId: string = '';

  putProducto: product = {} as product;

  constructor(
    private productsServices: ProductsService,
    private fileService: FileService,
    private categoriesService: CategoriesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // Load category lists once at init so they're ready when the modal opens
    this.categoriesService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data.map(c => ({ id: c.id!, strName: c.strName }));
      }
    });
    this.categoriesService.obtenerTodasSubCategorias().subscribe({
      next: (data: Subcategoria[]) => {
        this.subcategorias = data.map(s => ({ id: s.id!, strName: s.strName }));
      }
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.showAlert = false;
    this.selectedFile = undefined;
    this.isLoading = false;

    if (this.showModal) {
      // Copy product data and sync select variables when opening
      this.putProducto = { ...this.producto };
      // Defer by one tick so the options are rendered before selection is applied
      setTimeout(() => {
        this.categoriaSeleccionadoId = this.producto.idCatCategoria?.toString() ?? '';
        this.subcategoriaSeleccionadoId = this.producto.idCatSubcategoria?.toString() ?? '';
      }, 0);
    }
  }

  onCategoriaChange(value: string) {
    this.categoriaSeleccionadoId = value;
    this.putProducto.idCatCategoria = value;
  }

  onSubcategoriaChange(value: string) {
    this.subcategoriaSeleccionadoId = value;
    this.putProducto.idCatSubcategoria = value;
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }

  delete() {
    this.productsServices.eliminarProducto(this.producto.id).subscribe({
      next: () => {
        this.productoActualizado.emit();
      },
      error: () => {
        this.showAlert = true;
      }
    });
  }

  async update() {
    // Ensure IDs are synced before saving
    this.putProducto.idCatCategoria = this.categoriaSeleccionadoId;
    this.putProducto.idCatSubcategoria = this.subcategoriaSeleccionadoId;

    this.isLoading = true;

    try {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('upload_preset', 'mypreset');
        const res = await this.fileService.uploadFile(formData, 'mypreset');
        if (res) {
          this.putProducto.strImage = res.url;
        }
      }

      this.productsServices.editarProducto(this.putProducto).subscribe({
        next: () => {
          this.alertService.success('Producto actualizado');
          this.productoActualizado.emit();
          this.toggleModal();
        },
        error: () => {
          this.alertService.error('Error al actualizar producto');
          this.isLoading = false;
        }
      });

    } catch (err) {
      this.alertService.error('Error al subir imagen');
      this.isLoading = false;
    }
  }
}
