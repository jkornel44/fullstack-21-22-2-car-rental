import { RentalDto } from "../../rentals/dto/rental.dto";
import { Location, StreetType } from "../entities/location";

export class LocationDto {
  id?: number;
  name?: string;
  postal_code?: string;
  city?: string;
  street?: string;
  street_type?: StreetType;
  house_no?: number;

  //rentals_pickup?: RentalDto[];
  //rentals_return?: RentalDto[];
  
  constructor(location: Location) {
    this.id = location.id;
    this.name = location.name;
    this.postal_code = location.postal_code;
    this.city = location.city;
    this.street = location.street;
    this.street_type = location.street_type;
    this.house_no = location.house_no;

    /*
    if (location.rentals_pickup.isInitialized(true)) {
      this.rentals_pickup = location.rentals_pickup.getItems().map((rental) => new RentalDto(rental));
    }

    if (location.rentals_return.isInitialized(true)) {
      this.rentals_return = location.rentals_return.getItems().map((rental) => new RentalDto(rental));
    }
    */
  }
}
