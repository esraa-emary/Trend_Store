import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    router.navigate(['/signup']);
    return false;
  }

  if (state.url.startsWith('/admin') && userRole !== 'admin') {
    router.navigate(['/profile']);
    return false;
  }

  return true;
};
