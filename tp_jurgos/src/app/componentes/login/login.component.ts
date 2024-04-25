import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  clave: string = '';
resultado: boolean = false;
  submitForm() {
 
    const usuario = new Usuario(this.nombre, this.clave);
  }

  login() {
    if (this.nombre === 'santi' && this.clave === '123') {
      this.resultado = true;
    } else {
      this.resultado = false;
    }
  }

  @Input() usuarioNombreInput: string | undefined = this.nombre;
  @Output() agregarEvent = new EventEmitter<Usuario>();

  agregarUsuario() {
    this.agregarEvent.emit(new Usuario(this.nombre, this.clave));
  }
}
