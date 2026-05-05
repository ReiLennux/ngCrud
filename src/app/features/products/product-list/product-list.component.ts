import { Component, OnInit } from '@angular/core';
import { product } from '../../../core/models/product';
import { Categoria, CategoriesService, Subcategoria } from '../../catalogs/services/categories.service';
import { ProductsService } from '../services/products.service';
import { FilterField } from '../../../shared/components/filters/filters.component';
@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    standalone: false
})
export class ProductListComponent implements OnInit {
  products: product[] = [];
  filterFields: FilterField[] = [];
  private _currentFilters: any = { categoria: '', subcategoria: '', searchTerm: '' };
  get currentFilters(): any { return this._currentFilters; }
  set currentFilters(val: any) { 
    this._currentFilters = val; 
    this.currentPage = 1;
    this.filtrarProductos(); 
  }

  currentPage: number = 1;
  pageSize: number = 5;
  paginatedProducts: product[] = [];

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.loadFilters();
  }

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

  // handleFilterChange is now replaced by the setter


  obtenerProductos() {
    this.productsService.obtenerProductos().subscribe({
      next: (data: product[]) => {
        this.products = data;
        this.filtrarProductos();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  categorias: {id: string; strName: string}[] = [];
  subcategorias: {id: string; strName: string}[] = [];
  productoSeleccionadoId!: string;

  seleccionarProducto(id: string) {
    this.productoSeleccionadoId = id;
  }

  actualizarProductos() {
    this.products = [];
    this.ngOnInit();
  }

  obtenerCategoria(categoriaId: string): String {
    const categoria = this.categorias.find(cat => cat.id == categoriaId);
    return categoria ? categoria.strName : '';
  }

  obtenerSubcategoria(subcategoriaId: string | undefined): String {
    const subcategoria = this.subcategorias.find(subcat => subcat.id == subcategoriaId);
    return subcategoria ? subcategoria.strName : '';
  }

  filteredProducts: product[] = [];

  filtrarProductos() {
    const filtered = this.products.filter(producto => {
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

    this.filteredProducts = filtered;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

}
