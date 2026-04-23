import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc, getDoc, CollectionReference } from '@angular/fire/firestore';
import { product } from '../../models/product';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCollection = collection(this.firestore, 'products') as CollectionReference<product>;

  constructor(private firestore: Firestore, private alertService: AlertService) {}

  // Obtener todos los productos
  public obtenerProductos(): Observable<product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }).pipe(
      catchError(error => {
        this.alertService.error('Error al obtener productos');
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  // Agregar producto (con imagen en base64)
  public agregarProducto(producto: product): Observable<void> {
    const productoSinImagen = { ...producto };

    const file = producto.strImage as File;

    if (!(file instanceof File)) {
      return from(addDoc(this.productsCollection, producto)).pipe(
        tap(() => this.alertService.success('Producto agregado con éxito.')),
        map(() => void 0),
        catchError(error => {
          this.alertService.error('Error al agregar producto sin imagen');
          return throwError(() => new Error('Error al agregar producto'));
        })
      );
    }

    return from(this.convertFileToBase64(file)).pipe(
      switchMap((base64: string) => {
        productoSinImagen.strImage = base64;
        return from(addDoc(this.productsCollection, productoSinImagen));
      }),
      map(() => void 0),
      tap(() => this.alertService.success('Producto agregado con éxito.')),
      catchError(error => {
        this.alertService.error('Error al agregar producto con imagen base64');
        return throwError(() => new Error('Error al agregar producto'));
      })
    );
  }

  // Editar producto (opcionalmente actualiza imagen si viene un File)
  public editarProducto(producto: product): Observable<void> {
    const productoDoc = doc(this.firestore, `products/${producto.id}`);
    const productoActualizado = { ...producto };
    const file = producto.strImage as File;

    if (!(file instanceof File)) {
      return from(updateDoc(productoDoc, productoActualizado)).pipe(
        map(() => void 0),
        tap(() => this.alertService.success('Producto actualizado con éxito.')),
        catchError(error => {
          this.alertService.error('Error al editar producto sin imagen');
          return throwError(() => new Error('Error al editar producto'));
        })
      );
    }

    return from(this.convertFileToBase64(file)).pipe(
      switchMap((base64: string) => {
        productoActualizado.strImage = base64;
        return from(updateDoc(productoDoc, productoActualizado));
      }),
      map(() => void 0),
      tap(() => this.alertService.success('Producto actualizado con éxito.')),
      catchError(error => {
        this.alertService.error('Error al editar producto con imagen');
        return throwError(() => new Error('Error al editar producto'));
      })
    );
  }

  // Eliminar producto
  public eliminarProducto(id: number): Observable<void> {
    const productoDoc = doc(this.firestore, `products/${id}`);
    return from(deleteDoc(productoDoc)).pipe(
      map(() => void 0),
      tap(() => this.alertService.success('Producto eliminado con éxito.')),
      catchError(error => {
        this.alertService.error('Error al eliminar producto');
        return throwError(() => new Error('Error al eliminar producto'));
      })
    );
  }

  // Convertir File a base64
  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  
}
