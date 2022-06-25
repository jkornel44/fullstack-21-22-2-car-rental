import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCirclePlus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { CarService } from '../core/car.service';
import { Car } from '../core/car';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Brand } from '../core/brand';
import { BrandService } from '../core/brand.service';
import { Model } from '../core/model';


@Component({
  selector: 'app-brand-editor',
  templateUrl: './brand-editor.component.html',
  styleUrls: ['./brand-editor.component.css']
})
export class BrandEditorComponent implements OnInit {
  brandForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  faCirclePlus = faCirclePlus;
  faPlus = faPlus;
  brand: Brand;
  error: any;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router
  ) {
    this.error = null;
    this.brand = {} as Brand;
  }

  get name(): FormControl {
    return this.brandForm.get('name') as FormControl;
  }

  async ngOnInit(): Promise<void> {
  }

  async submit() {
    if (!this.brandForm.valid) {
      return;
    }

    await this.brandService.createBrand(this.brandForm.value as Brand).then(() => {
      this.router.navigateByUrl('/brands');
    }).catch((resp) => {
      this.error = resp.error.message;
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/brands');
  }
}
