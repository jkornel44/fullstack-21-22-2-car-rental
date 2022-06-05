import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Model } from '../../models/entities/model';
import { Category } from '../../categories/entities/category';
import { Rental } from '../../rentals/entities/rental';

@Entity()
export class Car {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  registration_plate!: string;

  @Property()
  color!: string;

  @Property()
  price!: number;

  @Property()
  purchase_date!: Date;

  @ManyToMany(() => Category, (category) => category.cars)
  categories = new Collection<Category>(this);

  @ManyToOne(() => Model)
  model!: Model;

  @OneToMany(() => Rental, (rental) => rental.car)
  rentals = new Collection<Car>(this);

}
