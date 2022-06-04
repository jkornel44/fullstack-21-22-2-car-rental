import { CategoryDto } from "src/categories/dto/category.dto";
import { ModelDto } from "../../models/dto/model.dto";
import { Model } from "../../models/entities/model";
import { Brand } from "../entities/brand";

export class BrandDto {
  id?: number;
  name?: string;

  models?: ModelDto[];
  
  constructor(brand: Brand) {
    this.id = brand.id;
    this.name = brand.name;

    if (brand.models.isInitialized(true)) {
      this.models = brand.models.getItems().map((model) => new ModelDto(model));
    }
  }
}
