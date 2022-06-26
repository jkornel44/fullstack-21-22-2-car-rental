import { Component, OnInit } from '@angular/core';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
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
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  error: any;

  constructor(private brandService: BrandService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.brands = await this.brandService.getBrands();
  }

  onCreateBrand() {
    this.router.navigateByUrl('/brands/create');
  }

  onDeleteBrand(id: any) {
    this.error = null;
    this.brandService.deleteBrand(id).then(() => {
      this.brands = this.brands?.filter(brand => brand.id != id);
    }).catch((resp) => {
      this.error = resp.error.message;
    });
  }

  onEditBrand() {
    this.router.navigateByUrl('/brands/create');
  }
}
