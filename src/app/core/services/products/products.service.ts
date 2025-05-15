import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCollection = collection(this.firestore, 'products');

  constructor(private firestore: Firestore) {}

  // Obtener todos los productos
  public obtenerProductos(): Observable<product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }).pipe(
      map(data => data as product[]),
      catchError(error => {
        console.error('Error al obtener productos: ', error);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  // Agregar producto (con imagen en base64)
  public agregarProducto(producto: product): Observable<any> {
    const productoSinImagen = { ...producto };

    const file = producto.strImage as File;

    if (!(file instanceof File)) {
      return from(addDoc(this.productsCollection, producto)).pipe(
        catchError(error => {
          console.error('Error al agregar producto sin imagen: ', error);
          return throwError(() => new Error('Error al agregar producto'));
        })
      );
    }

    return from(this.convertFileToBase64(file)).pipe(
      switchMap((base64: string) => {
        productoSinImagen.strImage = base64;
        return from(addDoc(this.productsCollection, productoSinImagen));
      }),
      catchError(error => {
        console.error('Error al agregar producto con imagen base64: ', error);
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
        catchError(error => {
          console.error('Error al editar producto sin imagen: ', error);
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
      catchError(error => {
        console.error('Error al editar producto con imagen: ', error);
        return throwError(() => new Error('Error al editar producto'));
      })
    );
  }

  // Eliminar producto
  public eliminarProducto(id: number): Observable<void> {
    const productoDoc = doc(this.firestore, `products/${id}`);
    return from(deleteDoc(productoDoc)).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Error al eliminar producto: ', error);
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
