import { Component } from '@angular/core';
import { faMagnifyingGlass, faCar, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faCar = faCar;
  faUser = faUser;
  title = 'car-rental-frontend';
}
