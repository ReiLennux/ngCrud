import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; // Adjust the import path if necessary

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private cookieService: CookieService,
  ) { }


  private storageKeys = {
    token: 'authToken',
    role: 'role',
    name: 'name',
    email: 'email',
  };

  setToken(token: string): void {
    this.cookieService.set(this.storageKeys.token, token, { path: '/' });
  }

  getToken(): string {
    return this.cookieService.get(this.storageKeys.token);
  }

  clearSession(): void {
    this.cookieService.delete(this.storageKeys.token, '/');
    localStorage.clear();
  }

  saveUserData(rol: string, nombre: string, email: string): void {
    localStorage.setItem(this.storageKeys.role, rol);
    localStorage.setItem(this.storageKeys.name, nombre);
    localStorage.setItem(this.storageKeys.email, email);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('authToken');
  }
}
