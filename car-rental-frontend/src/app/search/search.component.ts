import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass, faCar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Car } from '../core/car';
import { CarService } from '../core/car.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  cars: Car[];
  isModalOpen: Boolean;
  hasResult: Boolean;

  escapePattern = (s: any) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  ilikeToRegExp = (pattern: any) =>
    new RegExp(
    `^${this.escapePattern(pattern)}$`
      .replace(/(?<![\\])%/g, '.*')
      .replace(/(?<![\\])_/g, '.')
      .replace(/\\%/g, '%')
      .replace(/\\_/g, '_'),
    'i'
  );

  constructor(
    private carService: CarService,
    private router: Router
  ) {
    this.cars = [] as Car[];
    this.isModalOpen = false;
    this.hasResult = false;
  }

  async ngOnInit(): Promise<void> {
    this.cars = await this.carService.getCars();
    this.setResult();
  }

  setResult() {
    this.hasResult = this.cars.length > 0;
  }

  async onChange(event: any) {
    this.cars = await this.carService.getCars();
    this.cars = this.cars.filter(car => this.ilikeToRegExp(`%${event.target.value}%`).test(car.name));
    this.setResult()
  }

  onClick(event: any) {
    if(event.target.name === 'input') {
      this.isModalOpen = true;
    } else {
      this.isModalOpen = false
    }
  }
}
