import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URI= 'https://ng-api-crud.onrender.com/auth';
  
  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public login(user: any): Observable<void> {
    return this.http.post<any>(`${this.API_URI}/login`, user).pipe(
      map(response => {
        const token = response.token;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', token);
          
        }
        if (this.isLoggedIn()){
          this.router.navigateByUrl('/home');
        }
      }),
      catchError(error => {
        console.error('Error al iniciar sesión: ', error);
        return throwError('Error al iniciar sesión');
      })
    );
  }

  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }
}
