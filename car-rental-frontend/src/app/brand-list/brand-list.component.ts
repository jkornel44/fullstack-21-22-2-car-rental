import { Component, OnInit } from '@angular/core';
import { Car, CarStatus } from '../core/car';
import { faCirclePlus, faPen} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { BrandService } from '../core/brand.service';
import { Brand } from '../core/brand';

@Component({
  selector: 'app-car-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands?: Brand[];
  currentCar = null;
  currentIndex = -1;
  faCirclePlus = faCirclePlus;
  faPen = faPen;

  constructor(private brandService: BrandService, public userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.brands = await this.brandService.getBrands();
  }

  onCreateBrand() {
    this.router.navigateByUrl('/brands/create');
  }
}
