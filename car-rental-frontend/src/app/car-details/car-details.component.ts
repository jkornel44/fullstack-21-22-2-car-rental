import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, CarStatus } from '../core/car';
import { CarService } from '../core/car.service';
import { faFlagCheckered, faMapPin, faCalendar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../core/location';
import { LocationService } from '../core/locarion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RentalService } from '../core/rental.service';
import { UserService } from '../core/user.service';
import { Rental } from '../core/rental';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car: Car;
  price: number;
  total = 0;
  rentInterval?: number;
  locations = [] as Location[];
  faFlagChecked = faFlagCheckered;
  faCalendar = faCalendar;
  faTrashCan = faTrashCan;
  faMapPin = faMapPin;
  error?: any;

  rentalForm: FormGroup = this.fb.group({
    pick_up_date: '',
    return_date: '',
    pick_up_location: ['', Validators.required],
    return_location: ['', Validators.required],
    total_cost: '',
    car: '',
    user: '',
  });

  constructor(
    private rentalService: RentalService,
    private userService: UserService,
    private locationService: LocationService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.car = {} as Car;
    this.price = 0;
  }

  get pick_up_location(): FormControl {
    return this.rentalForm.get('pick_up_location') as FormControl;
  }

  get return_location(): FormControl {
    return this.rentalForm.get('return_location') as FormControl;
  }

  get today(): string{
    return new Date().toDateString();
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

    if (!this.rentalForm.valid) {
      return;
    }

    this.rentalForm.patchValue({
      pick_up_date: new Date(),
      return_date: null,
      car: this.car,
      user: this.userService.user
    });

    if (this.car?.status === CarStatus.InUse) {
      this.error = 'Az kiválasztott járműhöz már tartozik aktív bérlés.'
      return;
    }

    await this.rentalService.createRental(this.rentalForm.value as Rental).then(() => {
      this.router.navigateByUrl('/cars');
      if (this.car) {
        this.carService.lockCar(this.car);
      }
    });
  }

  deleteCar(car: Car) {
    if(car.id)
      this.carService.deleteCar(car.id)
        .then(() => this.router.navigateByUrl('/cars'))
        .catch((resp) => this.error = resp.error.message);
  }
}
