import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const logueadoGuard: CanActivateFn = (route, state) => {

 const authS = inject(AuthService);

  if (!authS.estaLogueado()) {
    console.log('No estás logueado');
    return false;
  }
 
  return true;

};
