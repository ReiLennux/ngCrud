import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData = {
    strName: '',
    strPassword: ''
  };

  // Variable para controlar el estado de carga del inicio de sesión
  loading: boolean = false;

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(): void {
    // Muestra el indicador de carga
    this.loading = true;

    this.auth.login(this.userData).subscribe(
      res => {
        // Reinicia los datos del formulario después de un inicio de sesión exitoso
        this.userData = {strName: '', strPassword: ''};
        // Oculta el indicador de carga después de completar el inicio de sesión
        this.loading = false;
        // Aquí puedes redirigir a la página de inicio después del inicio de sesión exitoso
        this.router.navigate(['/home']);
      },
      err => {
        // Manejo de errores, si es necesario
        console.log(err);
        // Oculta el indicador de carga en caso de error
        this.loading = false;
      }
    );
  }
}
