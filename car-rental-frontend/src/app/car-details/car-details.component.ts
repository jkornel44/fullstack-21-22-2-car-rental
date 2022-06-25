import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, CarStatus } from '../core/car';
import { CarService } from '../core/car.service';
import { faFlagCheckered, faMapPin, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../core/location';
import { LocationService } from '../core/locarion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RentalService } from '../core/rental.service';
import { UserService } from '../core/user.service';
import { Rental } from '../core/rental';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car?: Car;
  price?: number;
  total = 0;
  rentInterval?: number;
  locations = [] as Location[];
  faFlagChecked = faFlagCheckered;
  faCalendar = faCalendar
  faMapPin = faMapPin;
  error?: any;

  rentalForm: FormGroup = this.fb.group({
    pick_up_date: ['', Validators.required],
    return_date: ['', Validators.required],
    pick_up_location: ['', Validators.required],
    return_location: ['', Validators.required],
  });

  constructor(
    private rentalService: RentalService,
    private userService: UserService,
    private locationService: LocationService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  get pick_up_date(): FormControl {
    return this.rentalForm.get('pick_up_date') as FormControl;
  }

  get return_date(): FormControl {
    return this.rentalForm.get('return_date') as FormControl;
  }

  get pick_up_location(): FormControl {
    return this.rentalForm.get('pick_up_location') as FormControl;
  }

  get return_location(): FormControl {
    return this.rentalForm.get('return_location') as FormControl;
  }

  async ngOnInit(): Promise<void> {
    this.locations = await this.locationService.getLocations();
    const carId = this.route.snapshot.paramMap.get('carId');
    if (carId) {
      this.car = await this.carService.getCar(parseInt(carId));
    }

    this.price = this.car?.price;
  }

  onLocationChange(location: any): void {
    console.log(this.locations)
  }

  async submit() {
    console.log(this.rentalForm.value);
    if (!this.rentalForm.valid) {
      return;
    }

    let rentalFromForm = {
      pick_up_date: this.rentalForm.value.pick_up_date,
      return_date: this.rentalForm.value.return_date,
      pick_up_location: this.rentalForm.value.pick_up_location,
      return_location: this.rentalForm.value.return_location,
      total_cost: this.total,
      car: this.car,
      user: this.userService.user
    };

    if(this.car?.status === CarStatus.InUse) {
      this.error = 'Az kiválasztott járműhöz már tartozik aktív bérlés.'
      return;
    }
    await this.rentalService.createRental(rentalFromForm as Rental).then(() => {
      this.router.navigateByUrl('/cars');
      if(this.car) {
        this.carService.lockCar(this.car);
      }
    }).catch((resp) => {
      console.log(resp)
    });


  }

  setPickupDate(newValue : any) {
    this.rentalForm.patchValue({
      pick_up_date: newValue,
    });

    this.setDaysBetweenDates();
  }

  setReturnDate(newValue : any) {
    this.rentalForm.patchValue({
      return_date: newValue,
    });

    this.setDaysBetweenDates();
  }

  setDaysBetweenDates() {
    let date_1 = new Date(this.rentalForm.value.pick_up_date);
    let date_2 = new Date(this.rentalForm.value.return_date);
    let difference = date_2.getTime() - date_1.getTime();

    this.rentInterval = Math.ceil(difference / (1000 * 3600 * 24));
    if(this.price) this.total = this.price * this.rentInterval;
  }
}
