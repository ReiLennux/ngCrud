import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { AlertService } from '../../../core/services/alert.service';

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

  constructor(private userService: UserService, private alertService: AlertService) { }

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
          this.alertService.success('Usuario creado exitosamente.');
          this.resetForm();
        },
        error: err => {
          this.alertService.error('Error al crear el usuario. Por favor, intente nuevamente.');
          console.error('Error creando usuario', err);
        }
      });
    } else {
      this.alertService.warning('Formulario no válido o contraseñas no coinciden.');
    }
  }

  private resetForm(): void {
    this.user = this.getEmptyUser();
    this.rPassword = '';
    this.comparePassword = true;
  }
}
