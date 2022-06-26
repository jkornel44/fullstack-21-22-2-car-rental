import { Component, OnInit } from '@angular/core';
import { Car, CarStatus } from '../core/car';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { BrandService } from '../core/brand.service';
import { Brand } from '../core/brand';
import { CarService } from '../core/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {
  brand?: Brand;

  faCirclePlus = faCirclePlus;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  error: any;

  constructor(private brandService: BrandService, private carService: CarService, public userService: UserService, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {

    const brandId = this.route.snapshot.paramMap.get('brandId');

    if (brandId) {
      this.brand = await this.brandService.getBrand(brandId);

      this.brand?.models?.forEach((model) => {
        Object.assign(model, {cars: this.getCarsByModel(model.id)});
      });
    }

    console.log(this.brand);
    console.log(this.getCarsByModel('MUSTANG'));
  }

  async getCarsByModel(id: any): Promise<Car[]> {
    return await this.carService.getCarsById(id);
  }
}
