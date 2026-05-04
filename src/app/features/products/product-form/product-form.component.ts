import { FileService } from './../../../core/services/file.service';
import { CategoriesService, Categoria, Subcategoria } from '../../catalogs/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { product } from '../../../core/models/product';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductsService } from '../services/products.service';
@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    standalone: false
})
export class ProductFormComponent implements OnInit {
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
    private fileService: FileService
  ){}

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerSubcategorias();
  }

  async submitForm() {
    if (!this.selectedFile) {
      this.productsService.agregarProducto(this.newProducto).subscribe();
      this.resetForm();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'mypreset');

    try {
      const res = await this.fileService.uploadFile(formData, 'mypreset');
      if (res) {
        this.newProducto.strImage = res.url;
      }
      
      const response = await of(this.productsService.agregarProducto(this.newProducto)).toPromise();
      this.resetForm();
      
    } catch (err) {
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
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
  
  onCategoriaSeleccionada(categoria: string | number | null) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria.toString() : '0';
    this.newProducto.idCatCategoria = this.categoriaSeleccionadoId;
  }
  
  onsubcategoriaSeleccionada(subcategoria: string | number | null) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria.toString() : '0';
    this.newProducto.idCatSubcategoria = this.subcategoriaSeleccionadoId;
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
}


