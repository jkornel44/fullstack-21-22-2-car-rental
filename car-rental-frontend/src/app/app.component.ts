import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass, faCar, faUser, faListUl } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faListUl = faListUl
  faCar = faCar;
  faUser = faUser;

  title = 'car-rental-frontend';

  constructor(public authService: AuthService, public userService: UserService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/', 'login']);
  }
}
