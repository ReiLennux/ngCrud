import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-type-filter',
  templateUrl: './type-filter.component.html',
  styleUrls: ['./type-filter.component.css']
})
export class TypeFilterComponent implements OnInit {
  tipos: {id: Number, strName: string }[] = []; // Cambiado de Number a number
  @Output() filterChanged = new EventEmitter<string>(); // Emite el id del tipo seleccionado

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.tipos().subscribe(
      (data: any) => {
        this.tipos = data;
      }
    );
  }

  onFilterChange(tipo: string) {
    this.filterChanged.emit(tipo);
  }
}
