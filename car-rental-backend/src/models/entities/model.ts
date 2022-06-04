import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Brand } from '../../brands/entities/brand';
import { Car } from '../../cars/entities/car';

@Entity()
export class Model {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @OneToMany(() => Car, 'model')
  cars = new Collection<Car>(this);

  @ManyToOne(() => Brand, 'models')
  brand!: Brand;

}
