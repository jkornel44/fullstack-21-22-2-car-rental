import { CategoryDto } from "../../categories/dto/category.dto";
import { Model } from "../../models/entities/model";
import { Car, CarStatus } from "../entities/car";

export class CarDto {
  id?: number;
  name?: string;
  registration_plate?: string;
  color?: string;
  price?: number;
  purchase_date?: Date;
  model?: Model;
  status?: CarStatus;
  image?: string;
  
  categories?: CategoryDto[];

  constructor(car: Car) {
    this.id = car.id;
    if (car.model && car.model.brand) {
      this.name = car.model.brand.name + ' ' + car.model.name;
    }
    this.registration_plate = car.registration_plate;
    this.color = car.color;
    this.price = car.price;
    this.purchase_date = car.purchase_date;
    this.model = car.model;
    this.status = car.status;
    this.image = car.image;

    if (car.categories.isInitialized(true)) {
      this.categories = car.categories.getItems().map((category) => new CategoryDto(category));
    }
  }
}
