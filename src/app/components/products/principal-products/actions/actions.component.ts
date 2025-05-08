import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { product } from '../../../../models/product';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

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
  categoriaSeleccionadoId: number = 0;
  subcategoriaSeleccionadoId: number = 0;
  putProducto: product = { ...this.producto }; // Copia independiente del producto

  constructor(
    private productsServices: ProductsService, 
    private http: HttpClient,
  ) {}

  delete() {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Se eliminará este producto y su información.",
      icon: "warning",
      background: "#111827",
      color:"#fff",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#374151",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Continuar"
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.productsServices.eliminarProducto(this.producto.id).subscribe(
          res => {
            console.log(res); 
            this.productoActualizado.emit();
          },
          err => console.error(err)
        );
        Swal.fire({
          title: "Eliminado",
          text: "El producto ha sido eliminado",
          icon: "success"
        });
      }
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.putProducto = { ...this.producto }; // Actualiza la copia independiente del producto
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

  async update() {
    if (!this.selectedFile) {
      try {
        await this.productsServices.editarProducto(this.putProducto);
        this.toggleModal();
        this.productoActualizado.emit();
        console.log('Producto actualizado con éxito.');
      } catch (err) {
        console.error('Error al editar el producto:', err);
      }
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'mypreset');

    try {
      const res = await this.http.post<any>('https://api.cloudinary.com/v1_1/dnx8n0vfe/image/upload', formData).toPromise();
      this.putProducto.strImage = res.url;
      await of(this.productsServices.editarProducto(this.putProducto)).toPromise();
      console.log(this.putProducto)
      this.productoActualizado.emit();
      this.toggleModal();
      console.log('Producto actualizado con éxito.');
    } catch (err) {
      console.error('Error al cargar la imagen a Cloudinary:', err);
    }
  }
}
