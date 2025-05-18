import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private saleCollection = collection(this.firestore, 'Sales');
  static decQuantity: any;

  constructor(private firestore: Firestore) { }


  public getSaleData(): Observable<Sale[]> {
    return collectionData(this.saleCollection, { idField: 'id' }).pipe(
      map((sales: any[]) => {
        return sales.map(sale => {
          return {
            id: sale.id, // Esto es necesario para que el campo 'id' se mapee correctamente.
            DateSale: sale.DateSale,
            SaleDetails: sale.SaleDetails,
            decSubtotal: sale.decSubtotal,
          } as Sale;
        });
      }),
      catchError(error => {
        console.error('Error al obtener ventas: ', error);
        return throwError(() => new Error('Error al obtener ventas'));
      })
    );
  }

  public getSaleById(id: string): Observable<Sale> {
    const saleDocRef = doc(this.firestore, `Sales/${id}`);
    return from(getDoc(saleDocRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() } as unknown as Sale;
        } else {
          throw new Error('Venta no encontrada');
        }
      }),
      catchError(error => {
        console.error('Error al obtener datos de venta desde Firestore: ', error);
        return throwError(() => new Error('Error al obtener datos de venta'));
      })
    );
  }


  public postSale(sale: Sale): Observable<Sale> {
    const saleDocRef = doc(this.firestore, `Sales/${sale.id}`);
    return from(addDoc(this.saleCollection, sale)).pipe(
      map(snapshot => {
        if (snapshot.id) {
          return { id: snapshot.id, ...sale } as unknown as Sale;
        } else {
          throw new Error('Error al agregar la venta');
        }
      }),
      catchError(error => {
        console.error('Error al agregar venta a Firestore: ', error);
        return throwError(() => new Error('Error al agregar venta'));
      })
    );
  }

  public deleteSale(id: string): Observable<void> {
    const saleDocRef = doc(this.firestore, `Sales/${id}`);
    return from(deleteDoc(saleDocRef)).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Error al eliminar venta de Firestore: ', error);
        return throwError(() => new Error('Error al eliminar venta'));
      })
    );
  }

  public updateSale(sale: Sale): Observable<void> {
    const saleDocRef = doc(this.firestore, `Sales/${sale.id}`);
    return from(updateDoc(saleDocRef, { ...sale })).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Error al actualizar venta en Firestore: ', error);
        return throwError(() => new Error('Error al actualizar venta'));
      })
    );
  }

  public getSaleStates(): Observable<any[]> {
    const statesCollection = collection(this.firestore, 'VenCatState');
    return collectionData(statesCollection, { idField: 'id' }).pipe(
      map((states: any[]) => {
        return states.map(state => {
          return {
            id: state.id,
            strName: state.strName
          };
        });
      }),
      catchError(error => {
        console.error('Error al obtener estados de venta: ', error);
        return throwError(() => new Error('Error al obtener estados de venta'));
      })
    );
  }
}
