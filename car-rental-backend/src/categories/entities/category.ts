import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Car } from '../../cars/entities/car';

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToMany(() => Car)
  cars = new Collection<Car>(this);
}
