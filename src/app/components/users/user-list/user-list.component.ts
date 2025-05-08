import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
    standalone: false
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  estadoFiltrado: number = 0;
  tipoFiltrado: number = 0;
  filtroNombre: string = '';
  usuariosPorPagina: number = 5; // Número de usuarios por página
  paginaActual: number = 1; // Página actual, empieza en 1
  estados: any;
  tipos: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.userService.estados().subscribe(
      (data: any) => {
        this.estados = data;
        this.loadUserData(); // Llama a la siguiente función después de obtener los estados
      }
    );
    this.userService.tipos().subscribe(
      (data: any) => {
        this.tipos = data;
      }
    );
  }
  
  loadUserData() {
    this.userService.obtenerDatosUsuario().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filterUsers(); // Llama a filterUsers después de obtener los datos del usuario
      },
      err => console.error(err)
    );
  }
  
  

  filterByEstado(estado: number) {
    this.estadoFiltrado = estado;
    this.filterUsers();
  }

  filterByTipo(tipo: number) {
    this.tipoFiltrado = tipo;
    this.filterUsers();
  }

  filterByName(nombre: string) {
    this.filtroNombre = nombre;
    this.filterUsers();
  }

  clearFilters() {
    this.estadoFiltrado = 0;
    this.tipoFiltrado = 0;
    this.filtroNombre = '';
    this.filterUsers();
  }

  filterUsers() {
    // Aplicamos los filtros sobre todos los usuarios
    let filteredUsers = this.users.filter(user =>
      (this.estadoFiltrado == 0 || user.idUsuCatEstadoFK == this.estadoFiltrado) &&
      (this.tipoFiltrado == 0 || user.idUsuCatTipoUsuario == this.tipoFiltrado) &&
      (this.filtroNombre == '' || user.strName.toLowerCase().includes(this.filtroNombre.toLowerCase()))
    );

    // Calculamos los índices de inicio y fin para la paginación
    const indiceInicial = (this.paginaActual - 1) * this.usuariosPorPagina;
    const indiceFinal = indiceInicial + this.usuariosPorPagina;

    // Filtramos los usuarios según la paginación
    this.filteredUsers = filteredUsers.slice(indiceInicial, indiceFinal);
  }
  
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.filterUsers();
  }

  get paginasTotales(): number[] {
    return Array(Math.ceil(this.filteredUsers.length / this.usuariosPorPagina)).fill(0).map((x, i) => i + 1);
  }

  obtenerEstado(estadoId: number): String {
    const estado = this.estados.find((estado: { id: number; }) => estado.id === estadoId);
    return estado ? estado.strName : '';
  }

  obtenerTipo(tipoId: number): String {
    const tipo = this.tipos.find((tipo: { id: number; }) => tipo.id === tipoId);
    return tipo ? tipo.strName : '';
  }
}
