import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  console.log('Role Guard Live');

  const toastr = inject(ToastrService);
  const res = localStorage.getItem('user');
  if (res) {
    const userRole = JSON.parse(res).role;
    if (userRole === 'ADMIN') {
      return true;
    } else {
      toastr.error('Admin only view this page');
      return false;
    }
  } else {
    toastr.error('Please login to access this page');
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
    return false;
  }
};
