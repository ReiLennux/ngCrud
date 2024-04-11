import { Component, EventEmitter, Input, OnChanges, Output, output } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-subcat-filter',
  templateUrl: './subcat-filter.component.html',
  styleUrls: ['./subcat-filter.component.css']
})
export class SubcatFilterComponent implements OnChanges {
  subcategorias: any[] = [];
  @Input() categoriaSeleccionadaId: number = 0;
  
  @Output() subcategoriaSeleccionada = new EventEmitter<any>();


  constructor(private productsService: ProductsService) { }

  ngOnChanges(): void {
    this.filtrarSubcategorias();
  }

  filtrarSubcategorias() {
    if (this.categoriaSeleccionadaId != 0) {
      this.productsService.getsubcategorias().subscribe(
        (data: any[]) => {
          this.subcategorias = data.filter(subcategoria => subcategoria.idCatCategorias == this.categoriaSeleccionadaId);
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
