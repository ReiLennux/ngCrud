import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateSale, Sale } from '../models/sale';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  API_URL = 'https://ng-api-crud.onrender.com/sales';

  constructor(private http: HttpClient) { }

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
}
