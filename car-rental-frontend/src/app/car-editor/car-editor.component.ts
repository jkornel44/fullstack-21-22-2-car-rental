import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus, faPen} from '@fortawesome/free-solid-svg-icons';
import { CarService } from '../core/car.service';
import { Car } from '../core/car';


@Component({
  selector: 'app-car-editor',
  templateUrl: './car-editor.component.html',
  styleUrls: ['./car-editor.component.css']
})
export class CarEditorComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  car: Car;

  constructor(
    private carService: CarService,
    private router: Router
  ) {

    this.car = {} as Car;
  }

  ngOnInit(): void {
  }

  saveProduct(): void {

  }

  goBack(): void {
    this.router.navigateByUrl('/cars');
  }
}
