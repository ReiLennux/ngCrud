import { StorageService } from './../../../core/services/storage.service';
import { Component } from '@angular/core';
import { SelectedProduct, product } from '../../../core/models/product';
import { DateSale, Sale, SaleDetails } from '../../../core/models/sale';
import { createDateSale } from '../../../shared/utils/generateDateSale';
import { generateAndDownloadTicket } from '../../../shared/utils/handleTicket';
import { SalesService } from '../services/sales.service';
import { ProductsService } from '../../products/services/products.service';
import { CategoriesService, Categoria, Subcategoria } from '../../products/services/catalog/categories.service';



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
    this.categoriesService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data.map(c => ({ id: c.id!, strName: c.strName }));
      },
      error: err => {
        console.error(err);
      }
    });
  }

  obtenerSubcategorias() {
    this.categoriesService.obtenerTodasSubCategorias().subscribe({
      next: (data: Subcategoria[]) => {
        this.subcategorias = data.map(s => ({ id: s.id!, strName: s.strName }));
      },
      error: err => {
        console.error(err);
      }
    });
  }


  filteredProducts: product[] = [];

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerSubcategorias();
    this.productsService.obtenerProductos().subscribe({
      next: (data: product[]) => {
        this.products = data;
        this.filtrarProductos();
      }
    });
    this.userOnSession = this.storageService.getUserInSession()
  }

  pushProduct(product: product) {
    if (product.decStock > 0) {
      const existing = this.selectedProducts.find(p => p.product.id === product.id);
      if (existing) {
        this.incrementQuantity(existing);
      } else {
        this.selectedProducts.push({ product: product, quantity: 1 });
      }
    }
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }

  filtrarProductos() {
    this.filteredProducts = this.products.filter(producto =>
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

      this.saleService.postSale(newSale).subscribe({
        next: response => {
          generateAndDownloadTicket(this.selectedProducts);
          this.selectedProducts = [];
        },
        error: error => {
        }
      });

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
