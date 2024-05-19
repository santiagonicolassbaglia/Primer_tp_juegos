import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const authS = inject(AuthService);

  if (!authS.esAdmin) {
    console.log('No eres admin');
    return false;
  }

  
  return true;
};
