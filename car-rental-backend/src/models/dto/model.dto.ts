import { CarDto } from "../../cars/dto/car.dto";
import { Brand } from "../../brands/entities/brand";
import { Model } from "../entities/model";

export class ModelDto {
  id?: number;
  name?: string;
  brand?: Brand;
  cars?: CarDto[];

  constructor(model: Model) {
      this.id = model.id;
      this.name = model.name;
      this.brand = model.brand;

      if (model.cars.isInitialized(true)) {
        this.cars = model.cars.getItems().map((car) => new CarDto(car));
      }    
  }
}
