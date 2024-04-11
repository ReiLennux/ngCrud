import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-cat-filter',
  templateUrl: './cat-filter.component.html',
  styleUrls: ['./cat-filter.component.css']
})
export class CatFilterComponent implements OnInit {
  categorias: any[] = [];
  @Output() categoriaSeleccionada = new EventEmitter<any>();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getcategorias().subscribe(
      (data: []) => {
        this.categorias = data;
      },
      err => console.error(err)
    );
  }

  onCategoriaSeleccionada(event: any) {
    const selectedCategoryId = event.target.value;
    this.categoriaSeleccionada.emit(selectedCategoryId);
  }
  
}
