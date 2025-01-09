import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../Services/auth.service';

export const ifLoggedInGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await firstValueFrom(authService.user$);

  if (user) {
    // Eğer kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    router.navigate(['/']);
    return false;
  }

  return true;
};
