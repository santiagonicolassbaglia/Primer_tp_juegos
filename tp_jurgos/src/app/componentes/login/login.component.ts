import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { Usuario } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { PaginaErrorComponent } from '../pagina-error/pagina-error.component';
import { NgIf } from '@angular/common';
 
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule   , PaginaErrorComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  nombre: string = '';
  mail: string = '';
  clave: string = '';
  resultado: boolean = false;
  registro = false;
  mensajeError: string = '';
  private items$: Observable<Usuario[]>;

 
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    
   } 

   ngOnInit(): void {
    this.getItems();
   }

    getItems() {
      this.items$ = this.authService.getAll();
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
  
  submitForm() {
    const usuario = new Usuario(this.nombre, this.mail, this.clave, '');
    this.authService.registrar(usuario);
  }

  async agregarUsuario() {
    if (!this.mail || !this.clave || !this.nombre) {
      this.mensajeError = 'Por favor, completa todos los campos.';
      return;
    }
  
    try {
  
      const nuevoUsuario = new Usuario(this.nombre, this.mail, this.clave, '');
  
      await this.authService.registrar(nuevoUsuario);
  
      this.router.navigateByUrl('/home');

      this.nombre = '';
      this.mail = '';
      this.clave = '';
      this.mensajeError = '';
    } catch (error) {
     
      this.mensajeError = 'Hubo un problema al registrar el usuario. Inténtalo de nuevo.';
      console.error('Error al registrar usuario:', error);
    }
  }

  usuarioPorDefecto()
  {
    this.nombre = 'Usuario';
    this.mail = 'santiii@gmail.com';
    this.clave = '123456';
  }
  
 
   
  @Input() usuarioNombreInput: string | undefined = this.nombre;
  @Output() agregarEvent = new EventEmitter


}