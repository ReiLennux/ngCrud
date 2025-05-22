// g-paginator.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-g-paginator',
  templateUrl: './g-paginator.component.html',
  styleUrls: ['./g-paginator.component.scss']
})
export class GPaginatorComponent {
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalSize: number = 100;
  
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalSize / this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.emitPageChange();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.emitPageChange();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.emitPageChange();
    }
  }

  private emitPageChange() {
    this.pageChange.emit(this.page);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
