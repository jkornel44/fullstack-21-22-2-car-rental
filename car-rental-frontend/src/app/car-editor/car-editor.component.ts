import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCirclePlus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { CarService } from '../core/car.service';
import { Car } from '../core/car';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Brand } from '../core/brand';
import { BrandService } from '../core/brand.service';
import { Model } from '../core/model';
import { Category } from '../core/category';
import { CategoryService } from '../core/category.service';

@Component({
  selector: 'app-car-editor',
  templateUrl: './car-editor.component.html',
  styleUrls: ['./car-editor.component.css']
})
export class CarEditorComponent implements OnInit {
  carForm: FormGroup = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    registration_plate: ['', Validators.required],
    color: ['', Validators.required],
    price: ['', Validators.required],
    image: ['', Validators.required],
    purchase_date: ['', Validators.required],
    category: '',
    categories: '',
  });

  isCreateMode = true;
  id: string;
  faCirclePlus = faCirclePlus;
  faPlus = faPlus;
  car: Car;
  brands: Brand[];
  models: Model[];
  categories: Category[];
  selectedCategories: Category[];
  error: any;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.error = null;
    this.id = '0';
    this.car = {} as Car;
    this.brands = [] as Brand[];
    this.models = [] as Model[];
    this.categories = [] as Category[];
    this.selectedCategories = [] as Category[];
  }

  get brand(): FormControl {
    return this.carForm.get('brand') as FormControl;
  }

  get model(): FormControl {
    return this.carForm.get('model') as FormControl;
  }

  get registration_plate(): FormControl {
    return this.carForm.get('registration_plate') as FormControl;
  }

  get color(): FormControl {
    return this.carForm.get('color') as FormControl;
  }

  get price(): FormControl {
    return this.carForm.get('price') as FormControl;
  }

  get image(): FormControl {
    return this.carForm.get('image') as FormControl;
  }

  get purchase_date(): FormControl {
    return this.carForm.get('purchase_date') as FormControl;
  }

  get category(): FormControl {
    return this.carForm.get('category') as FormControl;
  }

  async ngOnInit(): Promise<void> {
    this.brands = await this.brandService.getBrands();
    this.categories = await this.categoryService.getCategories();

    this.id = this.route.snapshot.params['id'];
    this.isCreateMode = !this.id;

    if (!this.isCreateMode) {
      this.carService.getCar(+this.id)
        .then((res) => {
          this.carForm.patchValue(res);
          this.selectedCategories = res.categories;
        });
    }
  }

  onBrandChange(brand: FormControl): void {
      console.log(brand.value.models)
      this.models = brand.value.models;
  }

  onCategoryClick(category: Category) {
    this.selectedCategories.push(category);
    this.removeSelectedItemFromArray(category, this.categories);
  }

  onSelectedCategoryClick(category: Category) {
    this.categories.push(category);
    this.removeSelectedItemFromArray(category, this.selectedCategories);
  }

  removeSelectedItemFromArray(item: any, arr: any[]) {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  onAddNewCategory(event: any) {
    event.preventDefault();
    const newCategory = this.carForm.value.category;
    this.categoryService.createCategory({
      name: newCategory
    }).then((res) => {
      this.carForm.value.category = '';
      this.categories.push(res);
    });
  }

  async submit() {
    if (!this.carForm.valid) {
      return;
    }

    this.carForm.patchValue({
      categories: this.selectedCategories,
    });

    if (this.isCreateMode) {
      this.createCar();
    } else {
      this.updateCar();
    }
  }

  async createCar() {
    await this.carService.createCar(this.carForm.value as Car).then(() => {
      this.router.navigateByUrl('/cars');
    }).catch((resp) => {
      this.error = resp.error.message;
    });
  }

  async updateCar() {
    await this.carService.updateCar(this.id, this.carForm.value as Car).then(() => {
      this.router.navigateByUrl('/cars');
    }).catch((resp) => {
      this.error = resp.error.message;
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/cars');
  }
}
