import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(): void {
    this.loading = true;

    this.auth.login(this.userData).subscribe(
      res => {
        this.userData = {email: '', password: ''};
        this.loading = false;
        this.router.navigate(['/home']);
      },
      err => {
        this.loading = false;
      }
    );
  }
}
