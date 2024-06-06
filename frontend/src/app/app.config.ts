import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpRequestInterceptor } from 'src/interceptors/httpRequest.interceptor';
import { errorInterceptor } from '@interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideAnimations(),
    provideHttpClient(withInterceptors([httpRequestInterceptor, errorInterceptor]))]
};
