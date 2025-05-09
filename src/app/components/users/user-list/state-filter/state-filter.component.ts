import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
    selector: 'app-state-filter',
    templateUrl: './state-filter.component.html',
    styleUrls: ['./state-filter.component.css'],
    standalone: false
})
export class StateFilterComponent implements OnInit {
  estados: {id: number, strName: string }[] = [];
  @Output() filterChanged = new EventEmitter<number>();
  @Input() user: User | any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.estados().subscribe(
      (data: any) => {
        this.estados = data;
      }
    );
  }

  onFilterChange(event: any) {
    const selectedEstadoId = event.target.value;
    this.filterChanged.emit(selectedEstadoId);
  }
}
