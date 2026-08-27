import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const payload = authService.getPayloadFromToken();

  if (!payload) {
    return router.createUrlTree(['/auth/login']);
  }

  const expectedRole = route.data['role'];

  if (payload.role === expectedRole) {
    return true;
  }

  return payload.role === 'admin'
    ? router.createUrlTree(['/admin'])
    : router.createUrlTree(['/']);
};