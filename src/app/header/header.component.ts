import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private toast: ToastrService,
    private userService: UserService
  ) {}
  logOut() {
    const user = this.userService.getUserFromLocalStorage();
    if (user) {
      localStorage.removeItem('user');
      this.toast.success('Logged Out');
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 1500);
    } else {
      this.toast.error('You are not logged in');
    }
  }
}
