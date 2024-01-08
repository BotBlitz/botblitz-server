import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/service/authService';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)

  console.log('is authenticated =', authService.isAuthenticated())
  if (!authService.isAuthenticated()){
    return inject(Router).createUrlTree(['/auth/login']);
  }

  return true;
};
