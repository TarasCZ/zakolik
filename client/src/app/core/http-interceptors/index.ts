/* "Barrel" of Http Interceptors; see HttpClient docs and sample code for more info */
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HttpErrorInterceptor} from './http-error.interceptor';
import {JwtInterceptor} from '@app/core/http-interceptors/jwt.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];
