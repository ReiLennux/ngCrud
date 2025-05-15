import { Component, EventEmitter, Input, OnChanges, Output, output } from '@angular/core';
import { product } from '../../../../core/models/product';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CategoriesService } from '../../../../core/services/products/catalog/categories.service';

@Component({
    selector: 'app-subcat-filter',
    templateUrl: './subcat-filter.component.html',
    styleUrls: ['./subcat-filter.component.css'],
    standalone: false
})
export class SubcatFilterComponent implements OnChanges {
  subcategorias: any[] = [];
  @Input() categoriaSeleccionadaId: string = "";
  @Input() product: product | any ;
  @Output() subcategoriaSeleccionada = new EventEmitter<any>();



  constructor(
    private productsService: ProductsService,
    private categorisService: CategoriesService
  ) { }

  ngOnChanges(): void {
    this.filtrarSubcategorias();
  }

  filtrarSubcategorias() {
    if (this.categoriaSeleccionadaId != "") {
      this.categorisService.obtenerSubcategorias(this.categoriaSeleccionadaId).subscribe(
        (data: any[]) => {
          this.subcategorias = data.filter(subcategoria => subcategoria.idCatCategorias == this.categoriaSeleccionadaId);
          if(this.product){
            this.subcategoriaSeleccionada.emit(this.product.idCatSubcategoria);
          }
        },
        err => console.error(err)
      );
    }else {
      this.subcategorias = [];
      this.subcategoriaSeleccionada.emit(0);
    }
  }
onSubcategoriaSeleccionada(event: any) {
  const selectedSubcategoryId = event.target.value;
  // Emitir el ID de la subcategoría seleccionada en lugar del ID de la categoría
  this.subcategoriaSeleccionada.emit(selectedSubcategoryId);
}


}
