import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { Usuario } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { PaginaErrorComponent } from '../pagina-error/pagina-error.component';
import { NgIf } from '@angular/common';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HomeComponent, PaginaErrorComponent, NgIf],
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
  // Inyecta el enrutador en el constructor
  constructor(private router: Router) {}

  submitForm() {
    const usuario = new Usuario(this.nombre, this.email, this.clave);
  }
  login() {
    if (this.email === 'santi' && this.clave === '123') {
      this.resultado = true;
 
      this.router.navigateByUrl('/componente/home');
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