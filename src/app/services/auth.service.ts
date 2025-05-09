import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, from, throwError } from 'rxjs';
import {Auth, signInWithEmailAndPassword, UserCredential} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public login(user: any): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, user.email, user.password)).pipe(
      tap(userCredential => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', userCredential.user.uid); // Using UID as a simple token
          localStorage.setItem('user', userCredential.user.email!);
        }
        // Redirect or handle successful login as needed
        this.router.navigateByUrl('/home');
      }),
      catchError(error => {
        console.error('Error during Firebase login:', error);
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
