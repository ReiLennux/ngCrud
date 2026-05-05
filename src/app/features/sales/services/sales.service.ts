import { product } from '../../../core/models/product';
import { Injectable } from '@angular/core';
import { Sale } from '../../../core/models/sale';
import { Observable, catchError, from, map, mergeAll, throwError, tap, switchMap } from 'rxjs';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, deleteDoc, updateDoc, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { AlertService } from '../../../core/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private saleCollection = collection(this.firestore, 'Sales') as CollectionReference<Sale>;
  private productCollection = collection(this.firestore, 'products') as CollectionReference<product>;


  constructor(private firestore: Firestore, private alertService: AlertService) { }


  public getSaleData(): Observable<Sale[]> {
    return collectionData(this.saleCollection, { idField: 'id' }).pipe(
      catchError(error => {
        this.alertService.error('Error al obtener ventas');
        return throwError(() => new Error('Error al obtener ventas'));
      })
    );
  }

  private async updateProductStock(productId: string, quantityChange: number): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${productId}`) as DocumentReference<product>;
    const productSnapshot = await getDoc(productDocRef);
  
    if (productSnapshot.exists()) {
      const product = productSnapshot.data();
      const newStock = product.decStock + quantityChange;
  
      await updateDoc(productDocRef, { decStock: newStock });
    } else {
      this.alertService.error(`Producto con ID ${productId} no encontrado para ajustar stock.`);
    }
  }
  

  public getSaleById(id: string): Observable<Sale> {
    const saleDocRef = doc(this.firestore, `Sales/${id}`) as DocumentReference<Sale>;
    return from(getDoc(saleDocRef)).pipe(
      map(snapshot => {
        const data = snapshot.data();
        if (snapshot.exists() && data) {
          return { ...data, id: snapshot.id };
        } else {
          throw new Error('Venta no encontrada');
        }
      }),
      catchError(error => {
        this.alertService.error('Error al obtener datos de venta desde Firestore');
        return throwError(() => new Error('Error al obtener datos de venta'));
      })
    );
  }


  public postSale(sale: Sale): Observable<Sale> {
    return from(addDoc(this.saleCollection, sale)).pipe(
      switchMap(async snapshot => {
        if (!snapshot.id) {
          throw new Error('Error al agregar la venta');
        }
  
        // Reducir el stock de cada producto vendido
        for (const detail of sale.SaleDetails) {
          await this.updateProductStock(detail.idProProducto, -detail.decQuantity);
        }
  
        return { id: snapshot.id, ...sale } as Sale;
      }),
      tap(() => this.alertService.success('Venta creada con éxito.'))
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
      tap(() => this.alertService.success('La venta fue eliminada.')),
      catchError(error => {
        this.alertService.error('Error al eliminar venta de Firestore');
        return throwError(() => new Error('Error al eliminar venta'));
      })
    );
  }
  

  public async updateSale(sale: Sale): Promise<void> {
    try {
      const saleDocRef = doc(this.firestore, `Sales/${sale.id}`) as DocumentReference<Sale>;
      const prevSaleSnap = await getDoc(saleDocRef);
  
      if (!prevSaleSnap.exists()) {
        throw new Error('Venta original no encontrada');
      }
  
      const prevSale = prevSaleSnap.data();
  
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
      this.alertService.success('Venta actualizada con éxito.');
  
    } catch (error) {
      this.alertService.error('Error al actualizar venta y ajustar stock');
      throw new Error('Error al actualizar venta y ajustar stock');
    }
  }
  

  public getSaleStates(): Observable<{ id: string; strName: string }[]> {
    const statesCollection = collection(this.firestore, 'VenCatState') as CollectionReference<{ id: string; strName: string }>;
    return collectionData(statesCollection, { idField: 'id' }).pipe(
      catchError(error => {
        this.alertService.error('Error al obtener estados de venta');
        return throwError(() => new Error('Error al obtener estados de venta'));
      })
    );
  }
}
