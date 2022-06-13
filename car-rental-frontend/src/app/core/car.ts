import { Category } from "./category";
import { Model } from "./model";

export interface Car {
  id?: number;
  registration_plate: string;
  color: string;
  image?: string;
  purchase_date?: Date;
  price: number;
  model?: Model;
  categories: Category[];
}
