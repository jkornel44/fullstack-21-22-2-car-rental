import { Component, OnInit, ViewChild } from '@angular/core';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocationService } from '../core/locarion.service';
import { Location } from '../core/location';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations?: Location[];
  selectedLocation: Location;

  faCirclePlus = faCirclePlus;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  isVisible = false;
  error: any;

  constructor(private locationService: LocationService, public userService: UserService, private router: Router) {
    this.locations = [] as Location[];
    this.selectedLocation = {} as Location;
  }

  async ngOnInit(): Promise<void> {
    this.locations = await this.locationService.getLocations();
  }

  onCreateBrand() {
    this.router.navigateByUrl('/locations/create');
  }

  onDeleteBrand(id: any) {
    this.error = null;
    this.locationService.deleteLocation(id).then(() => {
      this.locations = this.locations?.filter(location =>location.id != id);
    }).catch((resp) => {
      this.error = resp.error.message;
    });
  }

  onEditLocation(location: Location) {
    this.router.navigateByUrl(`/locations/create/${location.id}`);
  }

  onSelectLocation(location: Location) {
    this.selectedLocation = location;
    this.isVisible = true;
  }

  onCloseModal() {
    this.isVisible = false;
  }
}
