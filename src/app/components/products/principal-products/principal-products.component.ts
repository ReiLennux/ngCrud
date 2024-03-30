import { Component, OnInit } from '@angular/core';
import { product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-principal-products',
  templateUrl: './principal-products.component.html',
  styleUrl: './principal-products.component.css'
})
export class PrincipalProductsComponent implements OnInit {
  products:  product[] = [];
popover: any;

  constructor(private productsService: ProductsService) { }
  ngOnInit(): void {
    this.productsService.obtenerProductos().subscribe(
      (data: product[]) => {
        console.log(data)
        this.products = data;
      },
      err => console.error(err)
    )
  }
}
