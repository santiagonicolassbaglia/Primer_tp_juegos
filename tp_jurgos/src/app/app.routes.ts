import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PaginaErrorComponent } from './componentes/pagina-error/pagina-error.component';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
export const routes: Routes = [

   {path: 'login', loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)},
    {path: 'paginaError', loadComponent: () => import('./componentes/pagina-error/pagina-error.component').then(m => m.PaginaErrorComponent)},
    {path: 'presentacion', loadComponent: () => import('./componentes/presentacion/presentacion.component').then(m => m.PresentacionComponent)},
   { path: 'home', loadComponent: () => import('./componentes/home/home.component').then(m => m.HomeComponent) },
     
 

        {  path: '**', redirectTo: 'PaginaErrorComponent' }
        

    
];
