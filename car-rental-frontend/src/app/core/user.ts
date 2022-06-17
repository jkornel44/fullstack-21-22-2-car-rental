import { Category } from "./category";
import { Location } from "./location";
import { Model } from "./model";

export interface User {
  id?: number;
  name: string;
  role: UserRole;
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}
