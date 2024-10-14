import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  login(data: any) {
    const url = `${this.serverUrl}/users`;
    this.http.get(url).subscribe(
      (res: any) => {
        const user = res.find(
          (val: any) =>
            val.email === data.email && val.password === data.password
        );
        if (user) {
          this.router.navigateByUrl('/tasks');
          localStorage.setItem('user', JSON.stringify(user));
          this.toast.success('Login Successful');
          return user;
        } else {
          this.toast.error('Invalid Email & Password');
          return null;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserFromLocalStorage() {
    const res = localStorage.getItem('user');
    const user = res ? JSON.parse(res) : {};
    return user.id;
  }
  getUserRoleFromLocalStorage() {
    const res = localStorage.getItem('user');
    const user = res ? JSON.parse(res) : {};
    return user.role;
  }
}
