import { Injectable } from '@angular/core';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection = collection(this.firestore, 'users');

  constructor(private firestore: Firestore) {}

  // Función para obtener todos los usuarios
  public obtenerDatosUsuario(): Observable<User[]> {
    return collectionData(this.usersCollection, { idField: 'id' }).pipe(
      map((usuarios: any[]) => {
        return usuarios.map(usuario => {
          // Asegúrate de que los datos de Firestore se transformen en un objeto User.
          return {
            id: usuario.id, // Esto es necesario para que el campo 'id' se mapee correctamente.
            strName: usuario.strName,
            idUsuCatEstadoFK: usuario.idUsuCatEstadoFK,
            idUsuCatTipoUsuario: usuario.idUsuCatTipoUsuario,
            strPassword: usuario.strPassword, // Esta propiedad es opcional según lo que tengas en Firestore
          } as User;
        });
      }),
      catchError(error => {
        console.error('Error al obtener usuarios: ', error);
        return throwError(() => new Error('Error al obtener usuarios'));
      })
    );
  }

  // Función para obtener un usuario por su id
  public usuarioEnSesion(id: string): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return from(getDoc(userDocRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() } as unknown as User;
        } else {
          throw new Error('Usuario no encontrado');
        }
      }),
      catchError(error => {
        console.error('Error al obtener datos de usuario desde Firestore: ', error);
        return throwError(() => new Error('Error al obtener datos de usuario'));
      })
    );
  }

  // Función para eliminar un usuario por su id
  public eliminarUsuario(id: string): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return from(deleteDoc(userDocRef)).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Error al eliminar usuario de Firestore: ', error);
        return throwError(() => new Error('Error al eliminar usuario'));
      })
    );
  }

  // Función para actualizar un usuario
  public updateUsuario(usuario: User): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${usuario.id}`);
    return from(updateDoc(userDocRef, { ...usuario })).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Error al actualizar usuario en Firestore: ', error);
        return throwError(() => new Error('Error al actualizar usuario'));
      })
    );
  }

  // Función para crear un nuevo usuario
  public crearUsuario(user: User): Observable<any> {
    return from(addDoc(this.usersCollection, user)).pipe(
      catchError(error => {
        console.error('Error al crear usuario: ', error);
        return throwError(() => new Error('Error al crear usuario'));
      })
    );
  }

  // Función de ejemplo para obtener tipos de usuario
  public tipos(): Observable<any> {
    return of([{ id: 1, strName: 'Admin' }, { id: 2, strName: 'User' }]);
  }

  // Función de ejemplo para obtener estados de usuario
  public estados(): Observable<any> {
    return of([{ id: 1, strName: 'Active' }, { id: 2, strName: 'Inactive' }]);
  }
}
