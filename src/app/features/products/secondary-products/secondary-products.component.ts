import { FileService } from './../../../core/services/file.service';
import { CategoriesService, Categoria } from './../../../core/services/products/catalog/categories.service';
import { Component, OnInit } from '@angular/core';
import { product } from '../../../core/models/product';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
    selector: 'app-secondary-products',
    templateUrl: './secondary-products.component.html',
    styleUrls: ['./secondary-products.component.css'],
    standalone: false
})
export class SecondaryProductsComponent implements OnInit {
  newProducto: product = {
    id: 0,
    strName: '',
    strDescription: '',
    idCatSubcategoria: "",
    idCatCategoria: "",
    decMinimum: 0,
    decMaximum: 0,
    decStock: 0,
    decCost: 0,
    decPrice: 0,
    strImage: ''
  };
  
  selectedFile: File | undefined;

  categorias: {id: string, strName: string}[] = [];
  subcategorias: {id: string, strName: string}[] = [];
  categoriaSeleccionadoId: string = "";
  subcategoriaSeleccionadoId: string = "";

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private fileService: FileService,
  ){}

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerSubcategorias();
  }

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
      const res: any = await this.fileService.uploadFile(formData, 'mypreset');
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
    this.newProducto = {
      id: 0,
      strName: '',
      strDescription: '',
      idCatSubcategoria: "",
      idCatCategoria: "",
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
    this.newProducto.idCatCategoria = this.categoriaSeleccionadoId.toString()
  }
  
  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
    this.newProducto.idCatSubcategoria = this.subcategoriaSeleccionadoId.toString()
  }

  obtenerCategorias() {
    this.categoriesService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      err => console.error(err)
    );
  }

  obtenerSubcategorias() {
    this.categoriesService.obtenerTodasSubCategorias().subscribe(
      (data: any[]) => {
        this.subcategorias = data;
      },
      err => console.error(err)
    );
  }
}
