import { importProvidersFrom, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {showToastWarning} from 'src/app/toast-message/toastr';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  const authService = inject(AuthService);
  const toast = inject(ToastrService);
  const isLogin = authService.getTokenCookie();
  if(isLogin) {
    return true;
  } else {
    router.navigate(['/login']);
    showToastWarning(toast, 'You are not logged in!');
    return false;
  }
};
