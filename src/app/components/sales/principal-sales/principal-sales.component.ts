import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { product } from '../../../models/product';
import { DateSale, Sale } from '../../../models/sale';
import { createDateSale } from '../../../helpers/generateDateSale';
import { SalesService } from '../../../services/sales.service';

@Component({
  selector: 'app-principal-sales',
  templateUrl: './principal-sales.component.html',
  styleUrls: ['./principal-sales.component.css'] // Corregido styleUrl a styleUrls
})
export class PrincipalSalesComponent {
  idVenVenta: any;
  searchTerm: String = '';

  newDateSale: DateSale = createDateSale()

  products: product[] = [];
  selectedProducts: product[] = [];

  categoriaSeleccionadoId: number = 0;
  subcategoriaSeleccionadoId: number = 0;

  constructor(private saleService: SalesService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.obtenerProductos().subscribe(
      (data: product[]) => {
        this.products = data;
      }
    );
  }

  pushProduct(product: product) {
    const isProductExists = this.selectedProducts.some(
      (p) => p.id === product.id
    );
    if (isProductExists) {
      console.log("El producto ya está en la lista.");
    } else {
      this.selectedProducts.push(product);
    }
  }

  onCategoriaSeleccionada(categoria: any) {
    this.categoriaSeleccionadoId = categoria !== null ? categoria : 0;
  }

  onsubcategoriaSeleccionada(subcategoria: any) {
    this.subcategoriaSeleccionadoId = subcategoria !== null ? subcategoria : 0;
  }

  filtrarProductos(): product[] {
    return this.products.filter(producto =>
      ((this.categoriaSeleccionadoId == 0 || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
        (this.subcategoriaSeleccionadoId == 0 || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
      (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  crearDateSale() {
    this.saleService.crearDateSale(this.newDateSale).subscribe(
      response => {
        console.log('Venta creada exitosamente:', response);
        // Aquí puedes realizar cualquier otra acción después de crear la venta
      },
      error => {
        console.error('Error al crear la venta:', error);
        // Aquí puedes manejar el error de manera apropiada
      }
    );
  }
}
