import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'https://ng-api-crud.onrender.com/usuarios';

  constructor(private http: HttpClient) { }

  public obtenerDatosUsuario(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener datos de usuario: ', error);
          return throwError('Error al obtener datos de usuario');
        })
      );
  }


  public usuarioEnSesion() {
    return this.http.get<any>(`${this.API_URL}/u/${localStorage.getItem('user')}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener datos de usuario: ', error);
          return throwError('Error al obtener datos de usuario');
        })
      );
  }

  public eliminarUsuario(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar usuario: ', error);
          return throwError('Error al eliminar usuario');
        })
      );
  }
  public updateUsuario(usuario: User){
    return this.http.put(`${this.API_URL}/${usuario.id}`, usuario)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar usuario: ', error);
          return throwError('Error al actualizar usuario');
        })
      );
  }

  public tipos(): Observable<any> {
    return this.http.get(`${this.API_URL}/tipos`)
      .pipe(
        catchError(error => {
          console.error('No se pueden obtener las categorías: ', error);
          return throwError('No se pueden obtener las categorías');
        })
      );
  }

  public estados(): Observable<any> {
    return this.http.get(`${this.API_URL}/estados`)
      .pipe(
        catchError(error => {
          console.error('No se pueden obtener los estados: ', error);
          return throwError('No se pueden obtener los estados');
        })
      );
  }

  public crearUsuario(user: Object): Observable<any> {
    return this.http.post(`${this.API_URL}`, user)
      .pipe(
        catchError(error => {
          console.error('Error al crear usuario: ', error);
          return throwError('Error al crear usuario');
        })
      );
  }


}
