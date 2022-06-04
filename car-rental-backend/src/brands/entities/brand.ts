import { Collection, Entity, LoadStrategy, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Model } from '../../models/entities/model';

@Entity()
export class Brand {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @OneToMany({
    entity: () => Model,
    mappedBy: m => m.brand,
  })
  models = new Collection<Model>(this);
}


