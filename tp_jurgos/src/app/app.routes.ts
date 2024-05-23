import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
import { JuegoAhorcadoComponent } from './componentes/juego-ahorcado/juego-ahorcado.component';
 import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import { HomeComponent } from './componentes/home/home.component';
import { adminGuard } from './guards/admin.guard';
import { logueadoGuard } from './guards/logueado.guard';


export const routes: Routes = [

   {path: 'login', loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)},
    {path: 'paginaError', loadComponent: () => import('./componentes/pagina-error/pagina-error.component').then(m => m.PaginaErrorComponent)},
    {path: 'presentacion', loadComponent: () => import('./componentes/presentacion/presentacion.component').then(m => m.PresentacionComponent)},
    {path: 'home', loadComponent: () => import('./componentes/home/home.component').then(m => m.HomeComponent)},
    {path: 'juego-ahorcado', loadComponent: () => import('./componentes/juego-ahorcado/juego-ahorcado.component').then(m => m.JuegoAhorcadoComponent)},
    {path: 'mayor-menor', loadComponent: () => import('./componentes/mayor-menor/mayor-menor.component').then(m => m.MayorMenorComponent)},
    {path: 'registro', loadComponent: () => import('./componentes/registro/registro.component').then(m => m.RegistroComponent)},
    {path: 'preguntados', loadComponent: () => import('./componentes/preguntados/preguntados.component').then(m => m.PreguntadosComponent)},
    {path: 'trivia', loadComponent: () => import('./componentes/trivia/trivia.component').then(m => m.TriviaComponent)},
    {path: 'santiDice', loadComponent: () => import('./componentes/santi-dice/santi-dice.component').then(m => m.SantiDiceComponent)},
    {path: 'chat', loadComponent: () => import('./componentes/chat/chat.component').then(m => m.ChatComponent)},
    {path: 'homeAdmin', loadComponent: () => import('./componentes/homeadmin/homeadmin.component').then(m => m.HomeadminComponent),canActivate: [adminGuard]},
    
  
      
    { path: '', redirectTo: 'login', pathMatch: 'full' },

        {  path: '**', redirectTo: 'PaginaErrorComponent' },    

 

];
