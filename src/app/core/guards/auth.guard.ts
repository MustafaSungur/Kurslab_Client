import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await firstValueFrom(authService.user$);

  if (user) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
