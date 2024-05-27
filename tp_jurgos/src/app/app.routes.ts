import { Routes } from '@angular/router';
import { logueadoGuard } from './guards/logueado.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent) },
    { path: 'paginaError', loadComponent: () => import('./componentes/pagina-error/pagina-error.component').then(m => m.PaginaErrorComponent),canActivate: [logueadoGuard]  },
    { path: 'presentacion', loadComponent: () => import('./componentes/presentacion/presentacion.component').then(m => m.PresentacionComponent),canActivate: [logueadoGuard]  },
    { path: 'home', loadComponent: () => import('./componentes/home/home.component').then(m => m.HomeComponent), canActivate: [logueadoGuard] },
    { path: 'juego-ahorcado', loadComponent: () => import('./componentes/juego-ahorcado/juego-ahorcado.component').then(m => m.JuegoAhorcadoComponent), canActivate: [logueadoGuard] },
    { path: 'mayor-menor', loadComponent: () => import('./componentes/mayor-menor/mayor-menor.component').then(m => m.MayorMenorComponent), canActivate: [logueadoGuard] },
    { path: 'registro', loadComponent: () => import('./componentes/registro/registro.component').then(m => m.RegistroComponent) },
    { path: 'preguntados', loadComponent: () => import('./componentes/preguntados/preguntados.component').then(m => m.PreguntadosComponent), canActivate: [logueadoGuard] },
    { path: 'trivia', loadComponent: () => import('./componentes/trivia/trivia.component').then(m => m.TriviaComponent), canActivate: [logueadoGuard] },
    { path: 'santiDice', loadComponent: () => import('./componentes/santi-dice/santi-dice.component').then(m => m.SantiDiceComponent), canActivate: [logueadoGuard] },
    { path: 'chat', loadComponent: () => import('./componentes/chat/chat.component').then(m => m.ChatComponent), canActivate: [logueadoGuard] },
    { path: 'homeAdmin', loadComponent: () => import('./componentes/homeadmin/homeadmin.component').then(m => m.HomeadminComponent), canActivate: [adminGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'paginaError' }
];
