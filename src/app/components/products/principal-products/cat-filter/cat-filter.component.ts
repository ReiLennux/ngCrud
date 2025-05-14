import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { product } from '../../../../models/product';
import { ProductsService } from '../../../../services/products/products.service';
import { CategoriesService } from '../../../../services/products/catalog/categories.service';

@Component({
    selector: 'app-cat-filter',
    templateUrl: './cat-filter.component.html',
    styleUrls: ['./cat-filter.component.css'],
    standalone: false
})
export class CatFilterComponent implements OnInit {
  categorias: any[] = [];
  @Output() categoriaSeleccionada = new EventEmitter<any>();
  @Input() product: product | any ;
  selectedCategoryId: any;

  constructor(
    private productsService: ProductsService,
    private categorisService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categorisService.obtenerCategorias().subscribe(
      (data: any[]) => {
        this.categorias = data;
        
        // Si el producto está definido y tiene una categoría, establece el valor seleccionado
        if (this.product && this.product.idCatCategoria) {
          this.selectedCategoryId = this.product.idCatCategoria;
          // Emitir el evento con el valor seleccionado
          this.categoriaSeleccionada.emit(this.selectedCategoryId);
        }
      },
      err => console.error(err)
    );
  }

  onCategoriaSeleccionada(event: any) {
    const selectedCategoryId = event.target.value;
    this.categoriaSeleccionada.emit(selectedCategoryId);
  }
}
