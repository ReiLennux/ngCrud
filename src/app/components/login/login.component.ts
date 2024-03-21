// login.component.ts
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

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(): void {
    this.auth.login(this.userData).subscribe(
      res => this.userData = {strName: '', strPassword:''},
      err => console.log(err)
    )
  }
}
