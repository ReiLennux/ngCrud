import { StorageService } from './../../../core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    standalone: false
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

constructor(
  private storageService: StorageService,
  private authService: AuthService,
){ }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
