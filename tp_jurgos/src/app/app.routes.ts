import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
import { JuegoAhorcadoComponent } from './componentes/juego-ahorcado/juego-ahorcado.component';
 
import { HomeComponent } from './componentes/home/home.component';


export const routes: Routes = [

   {path: 'login', loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)},
    {path: 'paginaError', loadComponent: () => import('./componentes/pagina-error/pagina-error.component').then(m => m.PaginaErrorComponent)},
    {path: 'presentacion', loadComponent: () => import('./componentes/presentacion/presentacion.component').then(m => m.PresentacionComponent)},
    {path: 'home', loadComponent: () => import('./componentes/home/home.component').then(m => m.HomeComponent)},
    {path: 'juego-ahorcado', loadComponent: () => import('./componentes/juego-ahorcado/juego-ahorcado.component').then(m => m.JuegoAhorcadoComponent)},
  
      
    { path: '', redirectTo: 'login', pathMatch: 'full' },

        {  path: '**', redirectTo: 'PaginaErrorComponent' }
        

    
];
