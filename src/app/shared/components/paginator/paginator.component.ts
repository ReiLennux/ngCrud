import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css'],
    standalone: false
})
export class PaginatorComponent {
  @Input() totalItems: number = 0; // Total de elementos a paginar
  @Input() itemsPerPage: number = 5; // Número de elementos por página
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>(); // Evento para notificar cambio de página
  currentPage: number = 1; // Página actual

  constructor() { }
  
  // Calcula el número total de páginas
  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Genera un rango de páginas para mostrar en el paginador
  get pagesRange(): number[] {
    const pagesArray: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {

      pagesArray.push(i);
    }
    return pagesArray;
  }

  // Cambia a la página seleccionada
  changePage(page: number): void {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }
}
