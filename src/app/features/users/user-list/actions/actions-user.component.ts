import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';
@Component({
    selector: 'app-actions-user',
    templateUrl: './actions-user.component.html',
    styleUrl: './actions-user.component.css',
    standalone: false
})
export class ActionsUserComponent implements OnInit {
  @Input() user!: User;
  @Output() usuarioCambio = new EventEmitter<void>();
  showModal : boolean = false;
  showPassword: boolean = false;

  estados: {id: string, strName: string }[] = [];
  tipos: {id: string, strName: string }[] = [];
  putUser: User = {
    id: '',
    email: "",
    idUsuCatEstadoFK: '',
    idUsuCatTipoUsuario: '',
    strPassword: "",
  };
  rPassword: string =""
  userOnSesion: string = localStorage.getItem('user')!


  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.loadFilters()
  }
  toggleModal() {
    this.showModal = !this.showModal;
    this.putUser = {... this.user}
  }

  deleteButton(id: String) {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Se eliminará este producto y su información.",
      icon: "warning",
      background: "#111827",
      color:"#fff",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#374151",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Continuar"
    }).then((result: { isConfirmed: any; }) => {
    if (result.isConfirmed) {
    this.userService.eliminarUsuario(id.toString()).subscribe(
      res => {
        Swal.fire({
          title: "Eliminado",
          text: "El usuario ha sido eliminado",
          icon: "success"
        });
        this.usuarioCambio.emit();
      },
      err => {
        Swal.fire({
        title: "Error",
        text: "El usuario no ha sido eliminado debido a un error en el sistema, por favor intente nuevamente en otro momento",
        icon: "info"
      });}
    );
    }
  })
  }

  updateButton(id: Number) {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  loadFilters(){
    this.userService.estados().subscribe(
      (data: []) => {
        this.estados = data;
      }
    )
    this.userService.tipos().subscribe(
      (data: []) => {
        this.tipos = data;
      }
    )
  }

  update(){
    this.userService.updateUsuario(this.putUser).subscribe(
      res => {
        Swal.fire({
          title: "Actualizado",
          text: "El usuario ha sido actualizado",
          icon: "success"
        });
        this.usuarioCambio.emit();
      },
      err => {
        Swal.fire({
        title: "Error",
        text: "El usuario no ha sido actualizado debido a un error en el sistema, por favor intente nuevamente en otro momento",
        icon: "info"
      });}
    );
  }

  setEstado(estado: string) {
    this.putUser.idUsuCatEstadoFK = estado;
  }
  setTipo(tipo: string) {
    this.putUser.idUsuCatTipoUsuario = tipo;
  }


}




