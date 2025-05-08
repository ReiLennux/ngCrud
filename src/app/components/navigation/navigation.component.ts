import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    standalone: false
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;
constructor(private auth: AuthService){ }
  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logout(): void {
    this.auth.logout();
  }
}
