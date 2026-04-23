import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable, from, map, tap, catchError, throwError } from 'rxjs';
import { AlertService } from '../../alert.service';

export interface Categoria {
  id?: string;
  strName: string;
  strDescription?: string;
}

export interface Subcategoria {
  id?: string;
  strName: string;
  strDescription: string;
  idCatCategoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriasCollection: CollectionReference;
  private subcategoriasCollection: CollectionReference;

  constructor(private firestore: Firestore, private alertService: AlertService) {
    this.categoriasCollection = collection(this.firestore, 'categorias');
    this.subcategoriasCollection = collection(this.firestore, 'subcategorias');
  }

  // ▶ Crear categoría
  crearCategoria(categoria: Categoria): Observable<any> {
    return from(addDoc(this.categoriasCollection, categoria)).pipe(
      tap(() => this.alertService.success('Categoría creada con éxito.')),
      catchError((error) => {
        this.alertService.error('Error al crear categoría.');
        return throwError(() => new Error('Error al crear categoría'));
      })
    );
  }

  // ▶ Crear subcategoría
  crearSubcategoria(subcategoria: Subcategoria): Observable<any> {
    return from(addDoc(this.subcategoriasCollection, subcategoria)).pipe(
      tap(() => this.alertService.success('Subcategoría creada con éxito.')),
      catchError((error) => {
        this.alertService.error('Error al crear subcategoría.');
        return throwError(() => new Error('Error al crear subcategoría'));
      })
    );
  }

  // ▶ Obtener todas las categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return from(getDocs(this.categoriasCollection)).pipe(
      map((snapshot: { docs: any[]; }) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Categoria))),
      catchError((error) => {
        this.alertService.error('Error al obtener categorías.');
        return throwError(() => new Error('Error al obtener categorías'));
      })
    );
  }

  // ▶ Obtener todas las categorías
  obtenerTodasSubCategorias(): Observable<Subcategoria[]> {
    return from(getDocs(this.subcategoriasCollection)).pipe(
      map((snapshot: { docs: any[]; }) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subcategoria))),
      catchError((error) => {
        this.alertService.error('Error al obtener subcategorías.');
        return throwError(() => new Error('Error al obtener subcategorías'));
      })
    );
  }

  // ▶ Obtener todas las subcategorías de la categoria id 
  obtenerSubcategorias(categoriaId: string): Observable<Subcategoria[]> {
    return from(getDocs(this.subcategoriasCollection)).pipe(
      map((snapshot: { docs: any[]; }) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subcategoria))),
      map((subcategorias: Subcategoria[]) => subcategorias.filter(subcategoria => subcategoria.idCatCategoria === categoriaId))
    );
  }

  // ▶ Eliminar categoría
  eliminarCategoria(id: string): Observable<void> {
    const categoriaDoc = doc(this.firestore, `categorias/${id}`);
    return from(deleteDoc(categoriaDoc)).pipe(
      tap(() => this.alertService.success('Categoría eliminada con éxito.')),
      catchError((error) => {
        this.alertService.error('Error al eliminar categoría.');
        return throwError(() => new Error('Error al eliminar categoría'));
      })
    );
  }

  // ▶ Eliminar subcategoría
  eliminarSubcategoria(id: string): Observable<void> {
    const subcategoriaDoc = doc(this.firestore, `subcategorias/${id}`);
    return from(deleteDoc(subcategoriaDoc)).pipe(
      tap(() => this.alertService.success('Subcategoría eliminada con éxito.')),
      catchError((error) => {
        this.alertService.error('Error al eliminar subcategoría.');
        return throwError(() => new Error('Error al eliminar subcategoría'));
      })
    );
  }

  // ▶ Editar categoría
  editarCategoria(id: string, categoria: Categoria): Observable<void> {
    const categoriaDoc = doc(this.firestore, `categorias/${id}`);
    return from(updateDoc(categoriaDoc, { ...categoria })).pipe(
      tap(() => this.alertService.success('Categoría actualizada con éxito.')),
      catchError((error) => {
        this.alertService.error('Error al editar categoría.');
        return throwError(() => new Error('Error al editar categoría'));
      })
    );
  }

  // ▶ Editar subcategoría
  editarSubcategoria(id: string, subcategoria: Subcategoria): Observable<void> {
    const subcategoriaDoc = doc(this.firestore, `subcategorias/${id}`);
    return from(updateDoc(subcategoriaDoc, { ...subcategoria })).pipe(
      tap(() => this.alertService.success('Subcategoría actualizada con éxito.')),
      catchError((error) => {
        this.alertService.error('Error al editar subcategoría.');
        return throwError(() => new Error('Error al editar subcategoría'));
      })
    );
  }
}
