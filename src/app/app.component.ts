import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'v1.11';
  isLoggedIn: boolean = false;
  constructor(private auth: AuthService) { }

  check(): boolean { 
    return this.auth.isLoggedIn();
  }
  
}
