import { inject, Injectable } from '@angular/core';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../../core/models/user';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, deleteDoc, updateDoc, query, where, CollectionReference } from '@angular/fire/firestore';
import { getDocs, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { AlertService } from '../../../core/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection = collection(this.firestore, 'users') as CollectionReference<User>;
  private auth: Auth = inject(Auth); // o usa el constructor si prefieres


  constructor(private firestore: Firestore, private alertService: AlertService) {}

  // Función para obtener todos los usuarios
  public obtenerDatosUsuario(): Observable<User[]> {
    return collectionData(this.usersCollection, { idField: 'id' }).pipe(
      catchError(error => {
        this.alertService.error('Error al obtener usuarios');
        return throwError(() => new Error('Error al obtener usuarios'));
      })
    );
  }

  // Función para eliminar un usuario por su id
  public eliminarUsuario(id: string): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return from(deleteDoc(userDocRef)).pipe(
      tap(() => this.alertService.success('El usuario ha sido eliminado.')),
      map(() => void 0),
      catchError(error => {
        this.alertService.error('Error al eliminar usuario de Firestore');
        return throwError(() => new Error('Error al eliminar usuario'));
      })
    );
  }

  // Función para actualizar un usuario
  public updateUsuario(usuario: User): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${usuario.id}`);
    return from(updateDoc(userDocRef, { ...usuario })).pipe(
      tap(() => this.alertService.success('El usuario ha sido actualizado.')),
      map(() => void 0),
      catchError(error => {
        this.alertService.error('Error al actualizar usuario en Firestore');
        return throwError(() => new Error('Error al actualizar usuario'));
      })
    );
  }

  // Función para crear un nuevo usuario
  public crearUsuario(user: User): Observable<void> {
    return from(

      createUserWithEmailAndPassword(this.auth, user.email, user.strPassword!)
        .then(cred => {
          const newUser: User = {
            id: cred.user.uid,
            email: user.email,
            idUsuCatEstadoFK: '1',
            idUsuCatTipoUsuario: user.idUsuCatTipoUsuario
          };

          const userDocRef = doc(this.firestore, `users/${cred.user.uid}`);
          return setDoc(userDocRef, newUser);
        })
    ).pipe(
      tap(() => this.alertService.success('Usuario creado exitosamente.')),
      catchError(error => {
        return throwError(() => new Error('Error al crear usuario: ' + error));
      })
    );
  }

  // Función de ejemplo para obtener tipos de usuario
  public tipos(): Observable<{ id: string; strName: string }[]> {
    return of([{ id: '1', strName: 'Administrador' }, { id: '2', strName: 'Cajero' }]);
  }

  // Función de ejemplo para obtener estados de usuario
  public estados(): Observable<{ id: string; strName: string }[]> {
    return of([{ id: '1', strName: 'Activo' }, { id: '2', strName: 'Inactivo' }]);
  }
}
