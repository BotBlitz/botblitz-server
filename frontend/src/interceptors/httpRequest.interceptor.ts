import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@environment';
import { AuthService } from 'src/service/authService';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService)

    const path = req.url.replace(environment.url, '')
    if (environment.listPathNoAuth.indexOf(path) != -1) {
        return next(req);
    }

    if (authService.currentUserValue.token) {
        const reqWithAuth = req.clone({
            headers: req.headers.set('authorization', "Bearer " + authService.currentUserValue.token)
        })
        return next(reqWithAuth)
    }

    return next(req);
}