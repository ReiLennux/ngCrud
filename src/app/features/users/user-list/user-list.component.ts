import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { UserService } from '../services/user.service';
import { FilterField } from '../../../shared/components/filters/filters.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: false
})
export class UserListComponent implements OnInit {

  //#region properties
  users: User[] = [];
  filteredUsers: User[] = [];
  filterFields: FilterField[] = [];
  estados: { id: string, strName: string }[] = [];
  tipos: { id: string, strName: string }[] = [];
  
  private _currentFilters: any = { status: '', type: '', email: '' };
  get currentFilters(): any { return this._currentFilters; }
  set currentFilters(val: any) { this._currentFilters = val; this.filterUsers(); }
  //#endregion

  //#region constructor
  constructor(private userService: UserService) { }
  //#endregion

  //#region lifecycle hooks
  ngOnInit(): void {
    this.loadFilters();
    this.loadUserData();
  }
  //#endregion

  //#region filters
  loadFilters() {
    this.userService.estados().subscribe({
      next: (data) => {
        this.estados = data;
        this.userService.tipos().subscribe({
          next: (tiposData) => {
            this.tipos = tiposData;
            this.setupFilterFields();
          }
        });
      }
    });
  }

  setupFilterFields() {
    this.filterFields = [
      {
        key: 'status',
        label: 'Estado',
        type: 'select',
        options: this.estados,
        gridColSpan: 'lg:col-span-3'
      },
      {
        key: 'type',
        label: 'Tipo de Usuario',
        type: 'select',
        options: this.tipos,
        gridColSpan: 'lg:col-span-3'
      },
      {
        key: 'email',
        label: 'Buscar por correo',
        type: 'text',
        placeholder: 'ejemplo@correo.com',
        icon: 'fa-solid fa-magnifying-glass',
        gridColSpan: 'lg:col-span-6'
      }
    ];
  }

  // handleFilterChange is now replaced by the setter


  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      const matchStatus = !this.currentFilters.status || user.idUsuCatEstadoFK == this.currentFilters.status;
      const matchType = !this.currentFilters.type || user.idUsuCatTipoUsuario == this.currentFilters.type;
      const matchEmail = !this.currentFilters.email || user.email.toLowerCase().includes(this.currentFilters.email.toLowerCase());
      
      return matchStatus && matchType && matchEmail;
    });
  }

  getStatusName(estadoId: string): String {
    const estado = this.estados.find((estado: { id: string; }) => estado.id == estadoId);
    return estado ? estado.strName : '';
  }

  getTypeName(tipoId: string): String {
    const tipo = this.tipos.find((tipo: { id: string; }) => tipo.id == tipoId);
    return tipo ? tipo.strName : '';
  }
  //#endregion


  loadUserData() {
    this.userService.obtenerDatosUsuario().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.filterUsers();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}


