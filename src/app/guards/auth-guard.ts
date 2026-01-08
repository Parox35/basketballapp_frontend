import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authenticateState().pipe(
    map(isAuth => {
      if (!isAuth) router.navigate(['/login']);
      return isAuth;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
