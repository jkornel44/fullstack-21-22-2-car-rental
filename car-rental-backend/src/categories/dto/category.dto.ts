import { Category } from "../entities/category";

export class CategoryDto {
  id?: number;
  name?: string;
  description?: string;
  
  constructor(category: Category) {
    if (category) {
      this.id = category.id;
      this.name = category.name;
      this.description = category.description;
    } 
  }
}
