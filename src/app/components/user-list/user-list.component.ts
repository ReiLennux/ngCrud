import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  estadoFiltrado: string = '';
  tipoFiltrado: string = '';
  filtroNombre: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.obtenerDatosUsuario().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filteredUsers = data;
      },
      err => console.error(err)
    );
  }

  filterByEstado(estado: string) {
    this.estadoFiltrado = estado;
    this.filterUsers();
  }

  filterByTipo(tipo: string) {
    this.tipoFiltrado = tipo;
    this.filterUsers();
  }

  filterByName(nombre: string) {
    this.filtroNombre = nombre;
    this.filterUsers();
  }

  clearFilters() {
    this.estadoFiltrado = '';
    this.tipoFiltrado = '';
    this.filtroNombre = '';
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      (this.estadoFiltrado === '' || user.estado === this.estadoFiltrado) &&
      (this.tipoFiltrado === '' || user.tipo === this.tipoFiltrado) &&
      (this.filtroNombre === '' || user.usuarioNombre.toLowerCase().includes(this.filtroNombre.toLowerCase()))
    );
  }

  deleteButton(id: Number) {
    this.userService.eliminarUsuario(id).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
    this.ngOnInit()
  }
}