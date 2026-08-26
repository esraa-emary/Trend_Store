import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();


  // Add JWT token to request
  if (token) {

    req = req.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`

      }

    });

  }


  // Send request
  return next(req).pipe(

    catchError((error) => {

      // Token is invalid or expired
      if (
        error.status === 401 &&
        authService.isLoggedIn()
      ) {

        authService.logout();

        router.navigate(['/login']);

      }

      return throwError(() => error);

    })

  );

};