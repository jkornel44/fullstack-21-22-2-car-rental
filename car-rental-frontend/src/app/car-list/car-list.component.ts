import { Component, OnInit } from '@angular/core';
import { CarService } from '../../app/core/car.service';
import { Car, CarStatus } from '../core/car';
import { faCirclePlus, faPen} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars?: Car[];
  currentCar = null;
  currentIndex = -1;
  faCirclePlus = faCirclePlus;
  faPen = faPen;

  constructor(private carService: CarService, public userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.cars = await this.carService.getCars();
  }

  status(status: string) {
    if(status === CarStatus.InUse) {
      return 'folyamatban lévő bérlés';
    } else {
      return 'szabadon foglalható';
    }
  }

  onCreateCar() {
    this.router.navigateByUrl('/cars/create');
  }
}
