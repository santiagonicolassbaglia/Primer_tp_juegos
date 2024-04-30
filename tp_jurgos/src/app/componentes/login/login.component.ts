import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { Usuario } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { PaginaErrorComponent } from '../pagina-error/pagina-error.component';
import { NgIf } from '@angular/common';
 
import { AuthService } from '../../services/auth.service';

 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule   , PaginaErrorComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombre: string = '';
  email: string = '';
  clave: string = '';
  resultado: boolean = false;
  registro = false;
  mensajeError: string = '';

private loginAuth = inject(AuthService);
  // Inyecta el enrutador en el constructor
  constructor(private router: Router, private authS: AuthService){ 
    authS.register('santi', '1234567').then((user) => {
      console.log('Usuario registrado', user);
    }).catch((error) => {
      console.log('Error al registrar usuario', error);
    });
      
  } 


  submitForm() {
    const usuario = new Usuario(this.nombre, this.email, this.clave);
  }


  login() {
    console.log("Email:", this.email, "Clave:", this.clave);
    if (this.email === 'santi' && this.clave === '123') {
      this.resultado = true;
      this.router.navigateByUrl('home');
    } else {
      this.resultado = false;
      this.mensajeError = 'El correo electrónico o la contraseña son incorrectos';
    }
  }
  

  agregarUsuario() {
    this.agregarEvent.emit(new Usuario(this.nombre, this.email, this.clave));
 
  } 

  @Input() usuarioNombreInput: string | undefined = this.nombre;
  @Output() agregarEvent = new EventEmitter


}