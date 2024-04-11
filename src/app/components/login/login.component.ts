import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
        this.userData = {strName: '', strPassword: ''};
        this.loading = false;
        this.router.navigate(['/home']);
      },
      err => {
        Swal.fire({
          title: "You shall not pass!",
          html: `
          <img src="https://cdn.vox-cdn.com/thumbor/lyJqnnNCu3Mkbsov-Lup5_jdiVg=/0x0:3831x1587/2070x1164/filters:focal(1835x397:2447x1009):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70123899/4k_fellowship_movie_screencaps.com_23524.0.jpg">`,
          text: "- Gandalf",
          icon: "error",
          background: "#111827",
          color:"#fff",
          showConfirmButton: false
        })
        // Oculta el indicador de carga en caso de error
        this.loading = false;
      }
    );
  }
}
