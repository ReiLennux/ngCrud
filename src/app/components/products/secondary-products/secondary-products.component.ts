import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-secondary-products',
  templateUrl: './secondary-products.component.html',
  styleUrls: ['./secondary-products.component.css']
})
export class SecondaryProductsComponent {
  newProducto: product = {
    id: 0,
    strName: '',
    strDescription: '',
    idCatSubcategoria: 0,
    idCatCategoria: 0,
    decMinimum: 0,
    decMaximum: 0,
    decStock: 0,
    decCost: 0,
    decPrice: 0,
    strImage: ''
  };
  selectedFile: File | undefined;

  categoriaSeleccionadoId: number = 0;
  subcategoriaSeleccionadoId: number = 0;

  constructor(
    private productsService: ProductsService,
    private http: HttpClient,
  ){}

  submitForm(){
    if (!this.selectedFile) {
      this.productsService.agregarProducto(this.newProducto);
      console.log('Producto creado con éxito.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'mypreset');
    
    this.http.post<any>('https://api.cloudinary.com/v1_1/dnx8n0vfe/image/upload', formData).subscribe(
      (res) => {
        this.newProducto.strImage = res.url;

        of(this.productsService.agregarProducto(this.newProducto)).subscribe(
          () => {
            console.log('Producto creado con éxito.');
            console.log(this.newProducto);
            // Resetear el formulario después de la creación exitosa
            this.resetForm();
          },
          (err) => {
            console.error('Error al crear el producto:', err);
          }
        );
      },
      (err) => {
        console.error('Error al cargar la imagen a Cloudinary:', err);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  resetForm() {
    // Resetear el objeto del nuevo producto y el archivo seleccionado
    this.newProducto = {
      id: 0,
      strName: '',
      strDescription: '',
      idCatSubcategoria: 0,
      idCatCategoria: 0,
      decMinimum: 0,
      decMaximum: 0,
      decStock: 0,
      decCost: 0,
      decPrice: 0,
      strImage: ''
    };
    this.selectedFile = undefined;
  }
  onCategoriaSeleccionada(categoria: any) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria : 0;
    this.newProducto.idCatCategoria = parseInt(this.categoriaSeleccionadoId.toString())
  }
  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
    this.newProducto.idCatSubcategoria = parseInt(this.subcategoriaSeleccionadoId.toString())
  }
}
