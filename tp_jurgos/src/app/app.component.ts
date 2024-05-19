import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
 
import { PaginaErrorComponent } from '../app/componentes/pagina-error/pagina-error.component';
import { LoginComponent } from '../app/componentes/login/login.component';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
import { HomeComponent } from './componentes/home/home.component';
import { JuegoAhorcadoComponent } from './componentes/juego-ahorcado/juego-ahorcado.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { TriviaComponent } from './componentes/trivia/trivia.component';
import { HomeadminComponent } from './componentes/homeadmin/homeadmin.component';
import { SantiDiceComponent } from './componentes/santi-dice/santi-dice.component';
 
 





 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink, LoginComponent ,PaginaErrorComponent, PresentacionComponent,HomeComponent ,  AppComponent, JuegoAhorcadoComponent, MayorMenorComponent,RegistroComponent,PreguntadosComponent,TriviaComponent,HomeadminComponent, SantiDiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-juegos';
 
}
