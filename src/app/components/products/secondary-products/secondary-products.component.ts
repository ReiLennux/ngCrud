import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-secondary-products',
    templateUrl: './secondary-products.component.html',
    styleUrls: ['./secondary-products.component.css'],
    standalone: false
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

  async submitForm() {
    if (!this.selectedFile) {
      this.productsService.agregarProducto(this.newProducto);
      console.log('Producto creado con éxito.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'mypreset');

    try {
      const res = await this.http.post<any>('https://api.cloudinary.com/v1_1/dnx8n0vfe/image/upload', formData).toPromise();
      this.newProducto.strImage = res.url;
      
      const response = await of(this.productsService.agregarProducto(this.newProducto)).toPromise();
      
      console.log(response);
      console.log(this.newProducto);
      
      Swal.fire({
        icon: "success",
        title: "Producto creado Creado",
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (err) {
      console.error('Error:', err);
    }
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
