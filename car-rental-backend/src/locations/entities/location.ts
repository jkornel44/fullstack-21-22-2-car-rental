import { Collection, Entity, Enum, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Rental } from '../../rentals/entities/rental';

@Entity()
export class Location {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @Property()
  postal_code!: string;

  @Property()
  city!: string;

  @Property()
  street!: string;

  @Enum()
  street_type!: StreetType;

  @Property()
  house_no!: number;

  @OneToMany(() => Rental, (rental) => rental.pick_up_location)
  rentals_pickup = new Collection<Rental>(this);

  @OneToMany(() => Rental, (rental) => rental.return_location)
  rentals_return = new Collection<Rental>(this);
}

export enum StreetType {
  Street = 'STREET',
  Road = 'ROAD',
  Square = 'SQUARE'
}
