import { RentalDto } from 'src/rentals/dto/rental.dto';
import { User, UserRole } from '../entities/user';

export class UserDto {
  id?: number;
  name?: string;
  role?: UserRole;

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.role = user.role;
    }
  }
}