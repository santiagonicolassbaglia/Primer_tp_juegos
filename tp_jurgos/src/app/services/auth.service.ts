import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'; // Modificado
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private PATH = 'Usuarios';
  private items$: Observable<Usuario[]>;
 

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.items$ = this.db.list(this.PATH).valueChanges() as Observable<Usuario[]>;
  }

   public getAll() {
    return this.items$;
  }


 


  async registrar(objeto: Usuario) {
    try {console.log('entroooo');
      objeto.code = this.db.createPushId().substring(0, 10);
      console.log('entroooo2');
      const path = `${this.PATH}/${objeto.code}`;
      console.log('Registrando usuario en Firebase...');
await this.db.object(path).set(objeto);
      console.log('entroooo3');
      console.log('Usuario registrado correctamente');
    } catch (error) {
      console.error('Error al registrar usuario en Firebase:', error);
      throw error; // Lanzar el error para manejarlo en el componente
    }
  }

  async login(mail: string, pass: string) {
    try {
      await this.auth.signInWithEmailAndPassword(mail, pass);
    } catch (error) {
      throw error;
    }
  }

  private async guardarUsuarioFirestore(uid: string, nombre: string, email: string) {
    await this.firestore.collection('usuarios').doc(uid).set({
      nombre,
      email
    });
  }
}

//   constructor(private authF: AngularFireAuth) { }

//  async register(mail: string, pass: string) {
//     return await this.authF.createUserWithEmailAndPassword(mail, pass)
//   }

//   async login(mail: string, pass: string) {
//     return await this.authF.signInWithEmailAndPassword(mail, pass)
//   }

//   async logout() {
//     return await this.authF.signOut()
//   }

  
  



 