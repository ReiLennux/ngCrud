import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

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

  submitForm(form: NgForm): void {
    this.checkPasswordMatch();

    if (form.valid && this.comparePassword) {
      const newUser: User = {
        ...form.value,
        idUsuCatEstadoFK: '1',
        idUsuCatTipoUsuario: form.value.idUsuCatTipoUsuario.toString()
      };

      this.userService.crearUsuario(newUser).subscribe({
        next: () => {
          this.resetForm();
        },
        error: err => {
          console.error('Error creando usuario', err);
        }
      });
    }
  }

  private resetForm(): void {
    this.user = this.getEmptyUser();
    this.rPassword = '';
    this.comparePassword = true;
  }
}
