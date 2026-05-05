import { StorageService } from './../../../core/services/storage.service';
import { Component } from '@angular/core';
import { SelectedProduct, product } from '../../../core/models/product';
import { DateSale, Sale, SaleDetails } from '../../../core/models/sale';
import { createDateSale } from '../../../shared/utils/generateDateSale';
import { generateAndDownloadTicket } from '../../../shared/utils/handleTicket';
import { SalesService } from '../services/sales.service';
import { ProductsService } from '../../products/services/products.service';
import { CategoriesService, Categoria, Subcategoria } from '../../catalogs/services/categories.service';
import { AlertService } from '../../../core/services/alert.service';
import { FilterField } from '../../../shared/components/filters/filters.component';

@Component({
  selector: 'app-sale-pos',
  templateUrl: './sale-pos.component.html',
  standalone: false
})
export class SalePosComponent {
  searchTerm: string = '';

  newDateSale: DateSale = createDateSale()
  newSales: Sale[] = []

  products: product[] = [];
  selectedProducts: SelectedProduct[] = [];

  filterFields: FilterField[] = [];
  private _currentFilters: any = { categoria: '', subcategoria: '', searchTerm: '' };
  get currentFilters(): any { return this._currentFilters; }
  set currentFilters(val: any) { this._currentFilters = val; this.filtrarProductos(); }

  userOnSession: String = ''
  isLoading: boolean = false;

  constructor(
    private saleService: SalesService,
    private productsService: ProductsService,
    private storageService: StorageService,
    private categoriesService: CategoriesService,
    private alertService: AlertService
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

  categorias: { id: string, strName: string }[] = [];
  subcategorias: { id: string, strName: string }[] = [];

  loadFilters() {
    this.categoriesService.obtenerCategorias().subscribe({
      next: (cats) => {
        this.categorias = cats.map(c => ({ id: c.id!, strName: c.strName }));
        this.categoriesService.obtenerTodasSubCategorias().subscribe({
          next: (subs) => {
            this.subcategorias = subs.map(s => ({ id: s.id!, strName: s.strName }));
            this.setupFilterFields();
          }
        });
      }
    });
  }

  setupFilterFields() {
    this.filterFields = [
      {
        key: 'categoria',
        label: 'Categoría',
        type: 'select',
        options: this.categorias,
        gridColSpan: 'lg:col-span-3'
      },
      {
        key: 'subcategoria',
        label: 'Subcategoría',
        type: 'select',
        options: this.subcategorias,
        gridColSpan: 'lg:col-span-3'
      },
      {
        key: 'searchTerm',
        label: 'Buscar Producto',
        type: 'text',
        placeholder: 'Ej. Coca Cola',
        icon: 'fa-solid fa-magnifying-glass',
        gridColSpan: 'lg:col-span-6'
      }
    ];
  }


  filteredProducts: product[] = [];

  ngOnInit(): void {
    this.loadFilters();
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
    this.filteredProducts = this.products.filter(producto => {
      const matchCat = !this.currentFilters.categoria || 
                       this.currentFilters.categoria === '' || 
                       producto.idCatCategoria?.toString() === this.currentFilters.categoria.toString();
      
      const matchSub = !this.currentFilters.subcategoria || 
                       this.currentFilters.subcategoria === '' || 
                       producto.idCatSubcategoria?.toString() === this.currentFilters.subcategoria.toString();
      
      const matchSearch = !this.currentFilters.searchTerm || 
                         this.currentFilters.searchTerm === '' || 
                         producto.strName.toLowerCase().includes(this.currentFilters.searchTerm.toLowerCase());
      
      return matchCat && matchSub && matchSearch;
    });
  }

  async crearSale() {
    if (this.selectedProducts.length > 0) {
      this.isLoading = true;
      try {
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
            this.newDateSale = createDateSale(); // Reset the folio for the next sale
            this.isLoading = false;
          },
          error: error => {
            console.error("Error creating sale:", error);
            this.alertService.error('Error al registrar la venta. Por favor, verifica la consola.');
            this.isLoading = false;
          }
        });
      } catch (err) {
        console.error("Sync error preparing sale:", err);
        this.alertService.error('Error interno al preparar la venta.');
        this.isLoading = false;
      }
    } else {
      console.warn("No products selected");
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


