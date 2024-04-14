import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateSale } from '../models/sale';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  API_URL = 'https://ng-api-crud.onrender.com/sales';

  constructor(private http: HttpClient) { }

  public crearDateSale(dateSale: DateSale) {
    console.log(dateSale);
    return this.http.post<number>(`${this.API_URL}/DataSale`, dateSale).pipe(
      map(response => {
        console.log(response);
        return response; // Devuelve la respuesta para mantener el flujo del observable
      }),
      catchError(error => {
        console.error('Error al crear la venta: ', error);
        return throwError('Error al crear la venta');
      })
    );
  }
}
