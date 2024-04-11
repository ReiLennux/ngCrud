import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  tipos: { id: Number, strName: string }[] = [];
  user: {
    strName: string;
    strPassword: string;
    idUsuCatTipoUsuario: number;
  } = { strName: '', strPassword: '', idUsuCatTipoUsuario: 0 };

  rPassword: string = "";
  comparePassword: boolean = true;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.tipos().subscribe(
      (data: any) => {
        this.tipos = data;
      }
    );
  }

  checkPasswordMatch() {
    this.comparePassword = this.user.strPassword === this.rPassword;
  }
  
  submitForm(form: any) {
    if (form.valid && this.comparePassword) {
      this.userService.crearUsuario(form.value).subscribe(
        res => {
          Swal.fire({
            icon: "success",
            title: "Usuario Creado",
            showConfirmButton: false,
            timer: 1500
          });
          this.user = { strName: '', strPassword: '', idUsuCatTipoUsuario: 0 };
        },
        err => {
          Swal.fire({
            icon: "error",
            title: "No se pudo crear el usuario, por favor intente nuevamente en un momento",
            showConfirmButton: false,
            timer: 1500
          });
          console.error(err);
        }
      );
    } else {
      console.log('Formulario no válido o las contraseñas no coinciden');
    }
  }
}
