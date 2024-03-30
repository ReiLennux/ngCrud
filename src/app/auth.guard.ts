import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = localStorage.getItem('token'); 

      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // En caso de que no estemos en un entorno de navegador (ej. SSR), redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
