import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,UserCredential, GoogleAuthProvider, User} from 'firebase/auth'; // Modificado
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/compat/database';
 
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private PATH = 'Usuarios';
  private items$: Observable<Usuario[]>;
 public loguado: boolean = false;
 public esAdmin: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    public db: AngularFireDatabase
  ) {
    this.items$ = this.db.list(this.PATH).valueChanges() as Observable<Usuario[]>;
  }

   public getAll() {
    return this.items$;
  }

 
 
async registrar(objeto: Usuario) {
  try {
    // @ts-ignore
    const userCredential: UserCredential = await this.auth.createUserWithEmailAndPassword(objeto.mail, objeto.contraseña);
    const uid = userCredential.user.uid;
 
    await this.guardarUsuarioFirestore(uid, objeto.nombre, objeto.mail);
    console.log('Usuario registrado correctamente');
  } catch (error) {
    console.error('Error al registrar usuario en Firebase:', error);
    throw error;  
  }
}

  async login(mail: string, pass: string) {
    try {
      await this.auth.signInWithEmailAndPassword(mail, pass);
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      throw error;
    }
  }

  public async guardarUsuarioFirestore(uid: string, nombre: string, email: string) {
    await this.firestore.collection('Usuarios').doc(uid).set({
      nombre,
      email
    });
  }

async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
 
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await this.auth.signInWithPopup(provider);
    } catch (error) {
      console.error('Error de inicio de sesión con Google:', error);
      throw error;
    }
  }


  estaLogueado() {
    return this.auth.currentUser !== null;
 
  } 

 usuarioActual(): Promise<Usuario> {

    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.firestore.collection('Usuarios').doc(user.uid).valueChanges().subscribe((usuario: Usuario) => {
            resolve(usuario);
          });
        } else {
          reject('No hay un usuario logueado');
        }
      });
    });
  }
}

 
// import { Injectable } from '@angular/core';


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

  
  



 