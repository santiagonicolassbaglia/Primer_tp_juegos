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
  email: string = '';
  clave: string = '';
  resultado: boolean = false;
  registro = false;
  mensajeError: string = '';
  private items$: Observable<Usuario[]>;

 
   
  constructor(private router: Router, private authService: AuthService) {

    
   } 

   ngOnInit(): void {
    this.getItems();
   }

    getItems() {
      this.items$ = this.authService.getAll();
    }


  submitForm() {
    const usuario = new Usuario(this.nombre, this.email, this.clave, '');
  }


  async login() {
    try {
      await this.authService.login(this.email, this.clave);
      this.router.navigateByUrl('home');
    } catch (error) {
      console.log('Error de inicio de sesión:', error);
      this.mensajeError = 'El correo electrónico o la contraseña son incorrectos';
    }
  }
  

  async agregarUsuario() {
    console.log('Método agregarUsuario() llamado');
    try {
      const usuario = new Usuario(this.nombre, this.email, this.clave, '');
      await this.authService.registrar(usuario);
  
      // Cerrar las opciones de registro
      this.registro = false;
  
      // Limpiar los campos del formulario
      this.nombre = '';
      this.email = '';
      this.clave = '';
  
      console.log('Usuario registrado:', usuario);
      console.log('Usuario registrado correctamente');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Manejo de errores de registro
    }
  }
  

  @Input() usuarioNombreInput: string | undefined = this.nombre;
  @Output() agregarEvent = new EventEmitter


}