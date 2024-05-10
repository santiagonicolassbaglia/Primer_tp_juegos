import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginaErrorComponent } from '../pagina-error/pagina-error.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule   , PaginaErrorComponent, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  nombre: string = '';
  mail: string = '';
  clave: string = '';
  mensajeError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    // Verificar que los campos no estén vacíos
    if (!this.nombre || !this.mail || !this.clave) {
      this.mensajeError = 'Por favor, completa todos los campos.';
      return;
    }

    // Crear un nuevo objeto de usuario con los datos del formulario
    const nuevoUsuario = new Usuario(this.nombre, this.mail, this.clave, '');

    // Llamar al método de registro del servicio AuthService
    this.authService.registrar(nuevoUsuario).then(() => {
      // Redirigir al usuario al componente de inicio de sesión después del registro exitoso
      this.router.navigateByUrl('/login');
    }).catch((error) => {
      // Manejar errores de registro
      this.mensajeError = 'Hubo un problema al registrar el usuario. Inténtalo de nuevo.';
      console.error('Error al registrar usuario:', error);
    });
  }
}
