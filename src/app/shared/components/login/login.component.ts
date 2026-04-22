import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  userData = {
    email: '',
    password: ''
  };

  loading: boolean = false;

  constructor(private router: Router, private auth: AuthService, private alertService: AlertService) {}

  onSubmit(): void {
    this.loading = true;

    this.auth.login(this.userData).subscribe(
      res => {
        this.userData = {email: '', password: ''};
        this.loading = false;
        this.router.navigate(['/home']);
      },
      err => {
        this.alertService.error('Credenciales incorrectas. Por favor, intente de nuevo.');
        this.loading = false;
      }
    );
  }
}
