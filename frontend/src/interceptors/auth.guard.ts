import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/service/authService';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)

  console.log('Autencado? ', authService.isAuthenticated())
  if (!authService.isAuthenticated()) {    
    return inject(Router).createUrlTree(['/login']);
  }

  return true;
};
