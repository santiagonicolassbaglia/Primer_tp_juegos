import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-homeadmin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homeadmin.component.html',
  styleUrl: './homeadmin.component.css'
})
export class HomeadminComponent implements OnInit {
  nombreUsuario: string = '';
  constructor(private router: Router, private auths: AuthService) { }
  ngOnInit(): void {

    this.auths.usuarioActual().then((usuario: Usuario) => {
      if (usuario) {
        this.nombreUsuario = usuario.nombre;
      } 
    }).catch(error => {
      console.error('Error al obtener el usuario actual:', error);
    });
  }

  logout() {
    this.auths.logout();

  }

  esAdmin() {
     this.auths.esAdmin = true;
  }
  cerrarSesion() {
    this.auths.logout()
      .then(() => {
        console.log('Sesión cerrada correctamente');
        this.router.navigateByUrl('/login');
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
  }
  

 
