import { IDatabaseDriver, Options } from '@mikro-orm/core';
import { Category } from './src/categories/entities/category';
import { Car } from './src/cars/entities/car';
import { Model } from './src/models/entities/model';
import { Brand } from './src/brands/entities/brand';
import { Rental } from './src/rentals/entities/rental';
import { Location } from './src/locations/entities/location';
import { User } from './src/users/entities/user';

export default {
  entities: [Car, Category, Model, Brand, Location, Rental, User],
  dbName: (process.env.seed ? './dist/' : '') + process.env.dbName,
  type: 'sqlite',
  migrations: {
    path: 'migrations',
    pattern: /^[\w-]+\d+\.(ts|js)$/,
  },
} as Options<IDatabaseDriver>;
