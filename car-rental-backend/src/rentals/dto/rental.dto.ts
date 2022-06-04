import { User } from "../../users/entities/user";
import { Location } from "../../locations/entities/location";
import { Rental } from "../entities/rental";
import { UserDto } from "../../users/dto/user.dto";

export class RentalDto {
  id?: number;
  pick_up_date?: Date;
  return_date?: Date;
  total_cost?: number;

  pick_up_location?: Location;
  return_location?: Location;

  user?: UserDto;

  constructor(rental: Rental) {
    this.id = rental.id;
    this.pick_up_date = rental.pick_up_date;
    this.return_date = rental.return_date;
    this.total_cost = rental.total_cost;
    this.pick_up_location = rental.pick_up_location;
    this.return_location = rental.return_location;

    if (rental.user && rental.user instanceof User) {
      this.user = {
        id: rental.user.id,
        name: rental.user.name,
        role: rental.user.role
      }
    }
  }
}
