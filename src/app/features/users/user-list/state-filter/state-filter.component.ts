import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';

@Component({
    selector: 'app-state-filter',
    templateUrl: './state-filter.component.html',
    styleUrls: ['./state-filter.component.css'],
    standalone: false
})
export class StateFilterComponent implements OnInit {
  estados: {id: number, strName: string }[] = [];

  ngOnInit(): void {

  }

  onFilterChange(event: any) {
    const selectedEstadoId = event.target.value;
  }
}
