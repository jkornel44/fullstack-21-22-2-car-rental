import { Car } from "./car";
import { Location } from "./location";
import { User } from "./user";

export interface Rental {
  id: number;
  pick_up_date: Date;
  return_date: Date;
  total_cost: number;

  pick_up_location: Location;
  return_location: Location;
  car: Car;

  user?: User;
}
