import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, from, throwError } from 'rxjs';
import {Auth, signInWithEmailAndPassword, UserCredential} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { AlertService } from './alert.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private router: Router,
    private storageService: StorageService,
    private alertService: AlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public login(user: Partial<User>): Observable<UserCredential> {
    if (!user.email || !user.strPassword) {
      this.alertService.error('Credenciales incompletas');
      return throwError(() => new Error('Credenciales incompletas'));
    }
    return from(signInWithEmailAndPassword(this.auth, user.email, user.strPassword)).pipe(
      tap(userCredential => {
        if (isPlatformBrowser(this.platformId)) {
                  this.storageService.setToken(userCredential.user.uid);
        this.storageService.saveUserData(userCredential.user.email!, userCredential.user.email!, userCredential.user.email!);
        }
        // Redirect or handle successful login as needed
        this.router.navigateByUrl('/home');
      }),
      catchError(error => {
        this.alertService.error('Error al iniciar sesión');
        return throwError('Error al iniciar sesión');
      })
    );
  }

  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.clearSession();
      this.router.navigate(['/login']);
    }
  }
}
