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
  public eliminarProducto(id : Number): Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/${id}`)
    .pipe(
      catchError(error => {
        console.error('Error al eliminar producto: ', error);
        return throwError('Error al eliminar producto');
      })
    )
  }

  public editarProducto(producto: product): void {
    this.http.put<void>(`${this.API_URL}/${producto.id}`, producto)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      );
  }

  public agregarProducto(producto: product): void {
    this.http.post(`${this.API_URL}`, producto)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      );
  }

  public getsubcategorias(): Observable<any> {
    return this.http.get(`${this.API_URL}/subcategorias`)
    .pipe(
        catchError(error => {
          console.error('No se pueden obtener las subcategorias: ', error);
          return throwError('No se pueden obtener las subcategorias');
        })
      );
  }

  public getcategorias(): Observable<any> {
    return this.http.get(`${this.API_URL}/categorias`)
    .pipe(
        catchError(error => {
          console.error('No se pueden obtener las categorías: ', error);
          return throwError('No se pueden obtener las categorías');
        })
      );
  }

}

