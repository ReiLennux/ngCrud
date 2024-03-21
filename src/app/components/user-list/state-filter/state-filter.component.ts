import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-state-filter',
  templateUrl: './state-filter.component.html',
  styleUrls: ['./state-filter.component.css']
})
export class StateFilterComponent implements OnInit {
  estados: { id: Number, strName: string }[] = [];
  @Output() filterChanged = new EventEmitter<string>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.estados().subscribe(
      (data: any) => {
        this.estados = data;
      }
    );
  }

  onFilterChange(estado: string) {
    this.filterChanged.emit(estado);
  }
}
