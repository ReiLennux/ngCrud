import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
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
  estados : {id: Number, strName: string}[] = []
  tipos: {id: Number, strName: string}[] = []
  putUser: User = {
    id: 0,
    strName: "",
    idUsuCatEstadoFK: 0,
    idUsuCatTipoUsuario: 0,
    strPassword: "",
  };
  rPassword: string =""
  userOnSesion: Number  = Number(localStorage.getItem('user'))


  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.loadFilters()
  }
  toggleModal() {
    this.showModal = !this.showModal;
    this.putUser = {... this.user}
  }

  deleteButton(id: Number) {
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

  setEstado(estado: number) {
    this.putUser.idUsuCatEstadoFK = estado;
  }
  setTipo(tipo: number) {
    this.putUser.idUsuCatTipoUsuario = tipo;
  }


}




