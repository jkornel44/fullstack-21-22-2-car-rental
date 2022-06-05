import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import mikroOrmConfig from '../mikro-orm.config';
import { BrandsModule } from './brands/brand.module';
import { CarsModule } from './cars/cars.module';
import { CategoriesModule } from './categories/categories.module';
import { ModelsModule } from './models/model.module';
import { LocationsModule } from './Locations/locations.module';
import { RentalsModule } from './rentals/rentals.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), CarsModule, CategoriesModule, ModelsModule, BrandsModule, LocationsModule, RentalsModule, UsersModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
