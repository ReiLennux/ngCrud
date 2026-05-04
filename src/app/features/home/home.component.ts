import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: false
})
export class HomeComponent {
  constructor(public auth: AuthService) { } 
  logout(): void {
    this.auth.logout();
  }
}
