import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  tipos: { id: string, strName: string }[] = [];

  user: User = this.getEmptyUser();
  rPassword: string = "";
  comparePassword: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadTipos();
  }

  private getEmptyUser(): User {
    return {
      email: '',
      strPassword: '',
      idUsuCatTipoUsuario: '',
      id: '',
      idUsuCatEstadoFK: ''
    };
  }

  private loadTipos(): void {
    this.userService.tipos().subscribe({
      next: (data: { id: string, strName: string }[]) => this.tipos = data,
      error: err => console.error('Error cargando tipos de usuario', err)
    });
  }

  checkPasswordMatch(): void {
    this.comparePassword = this.user.strPassword === this.rPassword;
  }

  submitForm(form: any): void {
    this.checkPasswordMatch();

    if (form.valid && this.comparePassword) {
      const newUser: User = {
        ...form.value,
        idUsuCatEstadoFK: 1,
        idUsuCatTipoUsuario: Number(form.value.idUsuCatTipoUsuario)
      };

      this.userService.crearUsuario(newUser).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            showConfirmButton: false,
            timer: 1500
          });
          this.resetForm();
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el usuario',
            text: 'Por favor, intente nuevamente más tarde',
            showConfirmButton: true
          });
          console.error('Error creando usuario', err);
        }
      });
    } else {
      console.warn('Formulario no válido o contraseñas no coinciden');
    }
  }

  private resetForm(): void {
    this.user = this.getEmptyUser();
    this.rPassword = '';
    this.comparePassword = true;
  }
}
