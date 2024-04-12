import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
@Component({
  selector: 'app-actions-user',
  templateUrl: './actions-user.component.html',
  styleUrl: './actions-user.component.css'
})
export class ActionsUserComponent {
  @Input() user!: User;
  @Output() usuarioCambio = new EventEmitter<void>();
  showModal : boolean = false;
  showPassword: boolean = false;
  putUser: User = {
    usuarioId: 0,
    usuarioNombre: "",
    estado: "",
    tipo: ""
  };


  constructor(private userService: UserService) {}

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
    this.userService.eliminarUsuario(id).subscribe(
      res => {
        Swal.fire({
          title: "Eliminado",
          text: "El usuario ha sido eliminado",
          icon: "success"
        });
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

}




