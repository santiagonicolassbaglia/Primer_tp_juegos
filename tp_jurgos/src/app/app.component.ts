import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { PaginaErrorComponent } from '../app/componentes/pagina-error/pagina-error.component';
import { LoginComponent } from '../app/componentes/login/login.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink, LoginComponent, HomeComponent,  PaginaErrorComponent, PresentacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp_jurgos';
}
