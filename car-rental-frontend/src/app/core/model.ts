import { Brand } from "./brand";
import { Car } from "./car";

export interface Model {
  id?: number;
  name: string;
  brand?: Brand;
  cars?: Car[];
}
