import { User } from "../../users/entities/user";
import { Location } from "../../locations/entities/location";
import { Rental } from "../entities/rental";
import { UserDto } from "../../users/dto/user.dto";
import { LocationDto } from "../../Locations/dto/location.dto";
import { Car } from "../../cars/entities/car";

export class RentalDto {
  id?: number;
  pick_up_date?: Date;
  return_date?: Date;
  total_cost?: number;

  pick_up_location?: Location;
  return_location?: Location;
  car?: Car;
  
  user?: UserDto;
  

  constructor(rental: Rental) {
    this.id = rental.id;
    this.pick_up_date = rental.pick_up_date;
    this.return_date = rental.return_date;
    this.total_cost = rental.total_cost;
    this.pick_up_location = rental.pick_up_location;
    this.return_location = rental.return_location;
    this.car = rental.car;

    if (rental.user && rental.user instanceof User) {
      this.user = new UserDto(rental.user);
    }
  }
}
