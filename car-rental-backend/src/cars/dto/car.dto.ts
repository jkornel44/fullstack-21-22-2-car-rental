import { CategoryDto } from "../../categories/dto/category.dto";
import { Model } from "../../models/entities/model";
import { Car } from "../entities/car";

export class CarDto {
  id?: number;
  registration_plate?: string;
  color?: string;
  price?: number;
  purchase_date?: Date;
  model?: Model;
  
  categories?: CategoryDto[];

  constructor(car: Car) {
    this.id = car.id;
    this.registration_plate = car.registration_plate;
    this.color = car.color;
    this.price = car.price;
    this.purchase_date = car.purchase_date;
    this.model = car.model;

    if (car.categories.isInitialized(true)) {
      this.categories = car.categories.getItems().map((category) => new CategoryDto(category));
    }
  }
}
