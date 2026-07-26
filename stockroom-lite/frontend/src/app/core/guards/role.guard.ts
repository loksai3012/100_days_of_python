import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);
  const requiredRoles = route.data['roles'] as string[];
  const role = sessionService.session()?.role;

  if (role && requiredRoles.includes(role)) {
    return true;
  }

  return router.parseUrl('/dashboard');
};
