import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/authService';
import { catchError, map, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return next(req).pipe(
      catchError((error: HttpErrorResponse) => {

     if (error.status == 403){
        authService.logout()
        router.navigate(['/login'],{queryParams: {message: "Login do usuário expirou"}})
        
      }

      return throwError(error);
  }));
};
