import { Rental } from "./rental";

export interface User {
  id?: number;
  name: string;
  role: UserRole;
  rentals?: Rental[];
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}
