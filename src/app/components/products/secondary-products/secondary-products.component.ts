import { Component } from '@angular/core';
import { product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-secondary-products',
  templateUrl: './secondary-products.component.html',
  styleUrl: './secondary-products.component.css'
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

    constructor(private productsService: ProductsService){}

  submitForm(){
    this.productsService.agregarProducto(this.newProducto)
  }
}
