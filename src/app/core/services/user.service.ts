import { inject, Injectable } from '@angular/core';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { getDocs, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection = collection(this.firestore, 'users');
  private auth: Auth = inject(Auth); // o usa el constructor si prefieres


  constructor(private firestore: Firestore) {}

  // Función para obtener todos los usuarios
  public obtenerDatosUsuario(): Observable<User[]> {
    return collectionData(this.usersCollection, { idField: 'id' }).pipe(
      map((usuarios: any[]) => {
        return usuarios.map(usuario => {
          // Asegúrate de que los datos de Firestore se transformen en un objeto User.
          return {
            id: usuario.id, // Esto es necesario para que el campo 'id' se mapee correctamente.
            email: usuario.email,
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
    return from(

      createUserWithEmailAndPassword(this.auth, user.email, user.strPassword!)
        .then(cred => {
          const newUser: User = {
            id: cred.user.uid,
            email: user.email,
            idUsuCatEstadoFK: 1,
            idUsuCatTipoUsuario: user.idUsuCatTipoUsuario
          };

          const userDocRef = doc(this.firestore, `users/${cred.user.uid}`);
          return setDoc(userDocRef, newUser);
        })
    ).pipe(
      catchError(error => {
        return throwError(() => new Error('Error al crear usuario: ' + error));
      })
    );
  }

  // Función de ejemplo para obtener tipos de usuario
  public tipos(): Observable<any> {
    return of([{ id: 1, strName: 'Administrador' }, { id: 2, strName: 'Cajero' }]);
  }

  // Función de ejemplo para obtener estados de usuario
  public estados(): Observable<any> {
    return of([{ id: 1, strName: 'Activo' }, { id: 2, strName: 'Inactivo' }]);
  }
}
