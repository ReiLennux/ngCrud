import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: false
})
export class UserListComponent implements OnInit {

  //#region properties
  users: User[] = [];
  filteredUsers: User[] = [];

  filteredStatus: number = 0;
  filteredType: number = 0;
  filteredEmail: string = '';

  estados: {id: number, strName: string }[] = [];
  tipos: {id: number, strName: string }[] = [];
  //#endregion

  //#region constructor
  constructor(private userService: UserService) {}
  //#endregion

  //#region lifecycle hooks
  ngOnInit(): void {
    this.loadFilters();
    this.loadUserData();
  }
  //#endregion

  //#region filters
  loadFilters(){
    this.userService.estados().subscribe(
      (data: any) => {
        this.estados = data;
      }
    );
    this.userService.tipos().subscribe(
      (data: any) => {
        this.tipos = data;
      }
    );
  }

  filterUsers() {
    let filteredUsers = this.users.filter(user =>
      (this.filteredStatus == 0 || user.idUsuCatEstadoFK == this.filteredStatus) &&
      (this.filteredType == 0 || user.idUsuCatTipoUsuario == this.filteredType) &&
      (this.filteredEmail == '' || user.strName.toLowerCase().includes(this.filteredEmail.toLowerCase()))
    );
    this.filteredUsers = filteredUsers;
  }

  getStatusName(estadoId: number): String {
    const estado = this.estados.find((estado: { id: number; }) => estado.id === estadoId);
    return estado ? estado.strName : '';
  }

  getTypeName(tipoId: number): String {
    const tipo = this.tipos.find((tipo: { id: number; }) => tipo.id === tipoId);
    return tipo ? tipo.strName : '';
  }
  //#endregion

  
  loadUserData() {
    this.userService.obtenerDatosUsuario().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filterUsers(); // Llama a filterUsers después de obtener los datos del usuario
      },
      err => console.error(err)
    );
  }
}
