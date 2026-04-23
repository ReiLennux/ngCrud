import { StorageService } from './../../../core/services/storage.service';
import { Component } from '@angular/core';
import { SelectedProduct, product } from '../../../core/models/product';
import { DateSale, Sale, SaleDetails } from '../../../core/models/sale';
import { createDateSale } from '../../../helpers/generateDateSale';
import { generateAndDownloadTicket } from '../../../helpers/handleTicket';
import { SalesService } from '../../../core/services/sales.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { CategoriesService } from '../../../core/services/products/catalog/categories.service';



@Component({
  selector: 'app-principal-sales',
  templateUrl: './principal-sales.component.html',
  styleUrls: ['./principal-sales.component.css'],
  standalone: false
})
export class PrincipalSalesComponent {
  searchTerm: string = '';

  newDateSale: DateSale = createDateSale()
  newSales: Sale[] = []

  products: product[] = [];
  selectedProducts: SelectedProduct[] = [];

  categorias: { id: string, strName: string }[] = [];
  subcategorias: { id: string, strName: string }[] = [];

  categoriaSeleccionadoId: string = "";
  subcategoriaSeleccionadoId: string = "";

  userOnSession: String = ''

  constructor(
    private saleService: SalesService,
    private productsService: ProductsService,
    private storageService: StorageService,
    private categoriesService: CategoriesService,

  ) { }

  incrementQuantity(selectedProduct: SelectedProduct) {
    selectedProduct.quantity++
  }

  decrementQuantity(selectedProduct: SelectedProduct) {
    if (selectedProduct.quantity > 1) {
      selectedProduct.quantity--;
    } else {
      const index = this.selectedProducts.indexOf(selectedProduct);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);

      }
    }
  }

  obtenerCategorias() {
    this.categoriesService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  obtenerSubcategorias() {
    this.categoriesService.obtenerTodasSubCategorias().subscribe(
      (data: any[]) => {
        this.subcategorias = data;
      },
      err => {
        console.error(err);
      }
    );
  }


  ngOnInit(): void {
    this.productsService.obtenerProductos().subscribe(
      (data: product[]) => {
        this.products = data;
      }
    );
    this.userOnSession = this.storageService.getUserInSession()
  }

  pushProduct(product: product) {
    if (product.decStock !== 0) {
      const isProductExists = this.selectedProducts.some(
        (p) => p.product.id === product.id
      );
      if (isProductExists) {

      } else {
        this.selectedProducts.push({ product: product, quantity: 1 });
      }
    } else {

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
      ((this.categoriaSeleccionadoId == "" || producto.idCatCategoria == this.categoriaSeleccionadoId) &&
        (this.subcategoriaSeleccionadoId == "" || producto.idCatSubcategoria == this.subcategoriaSeleccionadoId)) &&
      (this.searchTerm === '' || producto.strName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  async crearSale() {
    if (this.selectedProducts.length > 0) {
      const saleDetails: SaleDetails[] = this.selectedProducts.map(selectedProduct => ({
        idProProducto: selectedProduct.product.id,
        decQuantity: Number(selectedProduct.quantity)
      }));

      const subtotal = this.selectedProducts.reduce((total, p) =>
        total + (p.product.decPrice * p.quantity), 0);

      const newSale: Sale = {
        DateSale: this.newDateSale,
        SaleDetails: saleDetails,
        decSubtotal: subtotal
      };

      this.saleService.postSale(newSale).subscribe(
        response => {
          generateAndDownloadTicket(this.selectedProducts);
          this.selectedProducts = [];
        },
        error => {
        }
      );

    } else {

    }
  }

  calTotal(): number {
    let total = 0;
    this.selectedProducts.forEach(selectedProduct => {
      total += selectedProduct.product.decPrice * selectedProduct.quantity;
    });
    return total;
  }


}
