import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

export interface Categoria {
  id?: string;
  strName: string;
  strDescription: string;
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

  constructor(private firestore: Firestore) {
    this.categoriasCollection = collection(this.firestore, 'categorias');
    this.subcategoriasCollection = collection(this.firestore, 'subcategorias');
  }

  // ▶ Crear categoría
  crearCategoria(categoria: Categoria): Observable<any> {
    return from(addDoc(this.categoriasCollection, categoria));
  }

  // ▶ Crear subcategoría
  crearSubcategoria(subcategoria: Subcategoria): Observable<any> {
    console.log('Subcategoría a crear:', subcategoria);
    return from(addDoc(this.subcategoriasCollection, subcategoria));
  }

  // ▶ Obtener todas las categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return from(getDocs(this.categoriasCollection)).pipe(
      // Transformar los documentos a objetos con ID incluido
      map((snapshot: { docs: any[]; }) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Categoria)))
    );
  }

    // ▶ Obtener todas las categorías
    obtenerTodasSubCategorias(): Observable<Subcategoria[]> {
      return from(getDocs(this.subcategoriasCollection)).pipe(
        // Transformar los documentos a objetos con ID incluido
        map((snapshot: { docs: any[]; }) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subcategoria)))
      );
    }

  // ▶ Obtener todas las subcategorías de la categoria id 
  obtenerSubcategorias(categoriaId: string ): Observable<Subcategoria[]> {
    return from(getDocs(this.subcategoriasCollection)).pipe(
      map((snapshot: { docs: any[]; }) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subcategoria))),
      map((subcategorias: Subcategoria[]) => subcategorias.filter(subcategoria => subcategoria.idCatCategoria === categoriaId))
    );
  }

  // ▶ Eliminar categoría
  eliminarCategoria(id: string): Observable<void> {
    const categoriaDoc = doc(this.firestore, `categorias/${id}`);
    return from(deleteDoc(categoriaDoc));
  }

  // ▶ Eliminar subcategoría
  eliminarSubcategoria(id: string): Observable<void> {
    const subcategoriaDoc = doc(this.firestore, `subcategorias/${id}`);
    return from(deleteDoc(subcategoriaDoc));
  }

  // ▶ Editar categoría
  editarCategoria(id: string, categoria: Categoria): Observable<void> {
    const categoriaDoc = doc(this.firestore, `categorias/${id}`);
    return from(updateDoc(categoriaDoc, { ...categoria }));
  }

  // ▶ Editar subcategoría
  editarSubcategoria(id: string, subcategoria: Subcategoria): Observable<void> {
    const subcategoriaDoc = doc(this.firestore, `subcategorias/${id}`);
    return from(updateDoc(subcategoriaDoc, { ...subcategoria }));
  }
}
