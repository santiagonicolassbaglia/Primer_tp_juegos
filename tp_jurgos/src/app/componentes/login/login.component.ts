import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Importa Router
import { Usuario } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { PaginaErrorComponent } from '../pagina-error/pagina-error.component';
import { NgIf } from '@angular/common';
 
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';

 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink  , PaginaErrorComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  mail: string = '';
  clave: string = '';
  mensajeError: string = '';
  recordarme: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioGuardado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.mail = usuario.mail;
      this.clave = usuario.clave;
      this.recordarme = true;
    }
  }

  async login() {
    try {
      await this.authService.login(this.mail, this.clave);
      this.router.navigateByUrl('home');
    } catch (error) {
      console.log('Error de inicio de sesión:', error);
      this.mensajeError = 'El correo electrónico o la contraseña son incorrectos';
    }
  }

  usuarioPorDefecto() {
    this.mail = 'santiii@gmail.com';
    this.clave = '123456';
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
 
      this.router.navigateByUrl('/home');
    } catch (error) {
      console.log('Error de inicio de sesión con Google:', error);
    }
  }
}
 