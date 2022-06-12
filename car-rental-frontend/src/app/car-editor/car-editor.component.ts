import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { CarService } from '../core/car.service';
import { Car } from '../core/car';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-editor',
  templateUrl: './car-editor.component.html',
  styleUrls: ['./car-editor.component.css']
})
export class CarEditorComponent implements OnInit {
  carForm: FormGroup = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    plate: ['', Validators.required],
    color: ['', Validators.required],
    price: ['', Validators.required],
  });

  faCirclePlus = faCirclePlus;
  faPlus = faPlus;
  car: Car;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router
  ) {

    this.car = {} as Car;
  }

  get brand(): FormControl {
    return this.carForm.get('brand') as FormControl;
  }

  get model(): FormControl {
    return this.carForm.get('model') as FormControl;
  }

  get plate(): FormControl {
    return this.carForm.get('plate') as FormControl;
  }

  get color(): FormControl {
    return this.carForm.get('color') as FormControl;
  }

  get price(): FormControl {
    return this.carForm.get('price') as FormControl;
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.carForm.valid) {
      return;
    }

  }

  goBack(): void {
    this.router.navigateByUrl('/cars');
  }
}
