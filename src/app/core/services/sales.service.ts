import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateSale, Sale } from '../models/sale';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  API_URL = 'https://ng-api-crud.onrender.com/ventas';
  static decQuantity: any;

  constructor(private http: HttpClient) { }

  public obtenerDataSale(): Observable<Sale[]>{
    return this.http.get<any[]>(`${this.API_URL}/`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener ventas: ', error);
          return throwError('Error al obtener ventas');
        })
      );
  }

  public obtenerSaleById(id: string): Observable<Sale>{
    return this.http.get<Sale>(`${this.API_URL}/s/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener venta: ', error);
          return throwError('Error al obtener venta');
        })
      );
  }

  public obtenerEstados(): Observable<any> {
    return this.http.get(`${this.API_URL}/status`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener estados: ', error);
          return throwError('Error al obtener estados');
        })
      );
  }

  public async crearDateSale(dateSale: DateSale): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.API_URL}/DataSale`, dateSale).toPromise();
      return response; 
    } catch (error) {
      console.error('Error al crear la venta: ', error);
      throw new Error('Error al crear la venta');
    }
  }

  public insertarSale(sale: Sale){
    console.log(sale);
    return this.http.post<any>(`${this.API_URL}/`, sale).pipe(
      map(response => {
        return response;
      }));
  }

  public eliminarSale(id: string){
    return this.http.delete<any>(`${this.API_URL}/${id}`).pipe(
      map(response => {
        return response;
      }));
  }

  public actualizarSale(sale: Sale){
    return this.http.put<any>(`http://localhost:3000/ventas/su/${sale.id}`, sale).pipe(
      map(response => {
        return response;
      }));
  }
}
