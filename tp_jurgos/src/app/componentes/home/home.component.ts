import { Component,Input,OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink, RouterOutlet } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../clases/usuario';
 
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  nombreUsuario: string = '';
private gitSrv = inject(GithubService);

  constructor(private router: Router, private authService: AuthService) { } // Inject Router service
 
  ngOnInit(): void {

    this.authService.usuarioActual().then((usuario: Usuario) => {
      if (usuario) {
        this.nombreUsuario = usuario.nombre;
      } 
    }).catch(error => {
      console.error('Error al obtener el usuario actual:', error);
    });


  }

  Ahorcado() {
    this.router.navigate(['/juego-ahorcado']);  
  }
  MayorMenor() {
    this.router.navigate(['/mayor-menor']);  
}


cerrarSesion() {
  this.authService.logout()
    .then(() => {
      console.log('Sesión cerrada correctamente');
      this.router.navigateByUrl('/login');
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
}
}
