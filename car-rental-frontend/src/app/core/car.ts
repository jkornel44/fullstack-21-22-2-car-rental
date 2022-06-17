import { Category } from "./category";
import { Location } from "./location";
import { Model } from "./model";

export interface Car {
  id?: number;
  name: string;
  registration_plate: string;
  color: string;
  image?: string;
  purchase_date?: Date;
  price: number;
  model?: Model;
  status: CarStatus;
  categories: Category[];
}

export enum CarStatus {
  InUse = 'IN_USE',
  Ready = 'READY_TO_USE'
}
