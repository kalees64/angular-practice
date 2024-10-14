import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Auth Guard Live');

  const toastr = inject(ToastrService);
  const res = localStorage.getItem('user');
  if (res) {
    const user = JSON.parse(res);
    return true;
  } else {
    toastr.error('Please login to access this page');
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
    return false;
  }
};
