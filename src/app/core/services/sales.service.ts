import { product } from './../models/product';
import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { Observable, catchError, from, map, mergeAll, throwError } from 'rxjs';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private saleCollection = collection(this.firestore, 'Sales');
  private productCollection = collection(this.firestore, 'Products');
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

  private async updateProductStock(productId: number, quantityChange: number): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${productId}`);
    const productSnapshot = await getDoc(productDocRef);
  
    if (productSnapshot.exists()) {
      console.log('Producto encontrado:', productSnapshot.data());
      const product = productSnapshot.data() as product;
      const newStock = product.decStock + quantityChange;
  
      await updateDoc(productDocRef, { decStock: newStock });
    } else {
      console.error(`Producto con ID ${productId} no encontrado para ajustar stock.`);
    }
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
    return from(addDoc(this.saleCollection, sale)).pipe(
      map(async snapshot => {
        if (!snapshot.id) {
          throw new Error('Error al agregar la venta');
        }
  
        // Reducir el stock de cada producto vendido
        for (const detail of sale.SaleDetails) {
          await this.updateProductStock(detail.idProProducto, -detail.decQuantity);
        }
  
        return { id: snapshot.id, ...sale } as Sale;
      }),
      map(promise => from(promise)),
      catchError(error => {
        console.error('Error al agregar venta a Firestore: ', error);
        return throwError(() => new Error('Error al agregar venta'));
      }),
      map(obs => obs as unknown as Observable<Sale>),
      mergeAll()
    );
  }
  
  

  public deleteSale(sale: Sale): Observable<void> {
    return from((async () => {
      const saleDocRef = doc(this.firestore, `Sales/${sale.id}`);
  
      // Reponer el stock de cada producto involucrado
      for (const detail of sale.SaleDetails) {
        await this.updateProductStock(detail.idProProducto, detail.decQuantity); // Se suma de vuelta
      }
  
      // Eliminar la venta
      await deleteDoc(saleDocRef);
    })()).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Error al eliminar venta de Firestore: ', error);
        return throwError(() => new Error('Error al eliminar venta'));
      })
    );
  }
  

  public async updateSale(sale: Sale): Promise<void> {
    try {
      const saleDocRef = doc(this.firestore, `Sales/${sale.id}`);
      const prevSaleSnap = await getDoc(saleDocRef);
  
      if (!prevSaleSnap.exists()) {
        throw new Error('Venta original no encontrada');
      }
  
      const prevSale = prevSaleSnap.data() as Sale;
  
      // 1. Revertir stock anterior
      for (const detail of prevSale.SaleDetails) {
        await this.updateProductStock(detail.idProProducto, detail.decQuantity); // sumamos lo anterior
      }
  
      // 2. Aplicar nuevo stock
      for (const detail of sale.SaleDetails) {
        await this.updateProductStock(detail.idProProducto, -detail.decQuantity); // restamos lo nuevo
      }
  
      // 3. Actualizar la venta
      await updateDoc(saleDocRef, { ...sale });
  
    } catch (error) {
      console.error('Error al actualizar venta y ajustar stock:', error);
      throw new Error('Error al actualizar venta y ajustar stock');
    }
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
