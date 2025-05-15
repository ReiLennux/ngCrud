import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-type-filter',
    templateUrl: './type-filter.component.html',
    styleUrls: ['./type-filter.component.css'],
    standalone: false
})
export class TypeFilterComponent implements OnInit {
  tipos: {id: number, strName: string }[] = [];
  @Output() filterChanged = new EventEmitter<number>(); // Cambiado a number para emitir el ID del tipo
  @Input() user: User | any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.tipos().subscribe(
      (data: any) => {
        this.tipos = data;
      }
    );
  }

  onFilterChange(event: any) {
    const selectedTipoId = event.target.value;
    // Emitir el ID de la subcategoría seleccionada en lugar del ID de la categoría
    this.filterChanged.emit(selectedTipoId);
  }
}
