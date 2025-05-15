import { StorageService } from './core/services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'v1.11';
  isLoggedIn: boolean = false;
  constructor(private storageService: StorageService) { }

  check(): boolean { 
    return this.storageService.isAuthenticated();
  }
  
}
