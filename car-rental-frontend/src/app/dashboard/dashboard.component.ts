import { Component, OnInit } from '@angular/core';
import { Location } from '../core/location';
import { Rental } from '../core/rental';
import { RentalService } from '../core/rental.service';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rentals = [] as Rental[];
  selectedLocation = {} as Location;
  isVisible = false;

  constructor(
    public rentalService: RentalService,
    public userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    this.rentals = await this.rentalService.getRentals();
    console.log(this.rentals)
  }

  onSelectLocation(location: Location) {
    this.selectedLocation = location;
    this.isVisible = true;
  }

  onCloseModal() {
    this.isVisible = false;
  }
}
