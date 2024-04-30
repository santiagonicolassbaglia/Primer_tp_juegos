import { Injectable, inject } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


auth = inject(AngularFireAuth);
firestore = inject(AngularFirestore);
router = inject(Router);



constructor(private authF: AngularFireAuth) { }
getAuth() {
  return getAuth();
}

async register(mail: string, pass: string) {
  return await createUserWithEmailAndPassword(this.getAuth(), mail, pass)
}

async login(mail: string, pass: string) {
  return await signInWithEmailAndPassword(this.getAuth(), mail, pass)
}

async logout() {
  return await this.auth.signOut()
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

  
  




}
