import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
 
import { PaginaErrorComponent } from '../app/componentes/pagina-error/pagina-error.component';
import { LoginComponent } from '../app/componentes/login/login.component';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
import { HomeComponent } from './componentes/home/home.component';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink, LoginComponent,PaginaErrorComponent, PresentacionComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-juegos';
}
