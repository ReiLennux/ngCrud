import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../models/product';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL = 'https://ng-api-crud.onrender.com/productos';

  constructor(private http: HttpClient) { }

  public obtenerProductos(): Observable<product[]> {
    return this.http.get<product[]>(`${this.API_URL}/`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener productos: ', error);
          return throwError('Error al obtener productos');
        })
      );
  }
}
