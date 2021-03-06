import { Collection, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user';
import { Location } from '../../locations/entities/location';
import { Car } from '../../cars/entities/car';

@Entity()
export class Rental {
  @PrimaryKey()
  id!: number;

  @Property()
  pick_up_date!: Date;

  @Property({ nullable: true })
  return_date!: Date;

  @Property({ nullable: true })
  total_cost!: number;

  @ManyToOne(() => Location, "rental")
  pick_up_location!: Location;

  @ManyToOne(() => Location, "rental")
  return_location!: Location;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Car, "rentals")
  car!: Car;
}