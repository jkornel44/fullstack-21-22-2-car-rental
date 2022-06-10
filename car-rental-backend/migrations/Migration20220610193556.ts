import { Migration } from '@mikro-orm/migrations';

export class Migration20220610193556 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `name` varchar not null, `user_name` varchar not null, `password` varchar not null, `role` varchar not null);');
    this.addSql('create unique index `user_user_name_unique` on `user` (`user_name`);');

    this.addSql('create table `location` (`id` integer not null primary key autoincrement, `name` varchar not null, `postal_code` varchar not null, `city` varchar not null, `street` varchar not null, `street_type` varchar not null, `house_no` integer not null);');
    this.addSql('create unique index `location_name_unique` on `location` (`name`);');

    this.addSql('create table `brand` (`id` integer not null primary key autoincrement, `name` varchar not null);');
    this.addSql('create unique index `brand_name_unique` on `brand` (`name`);');

    this.addSql('create table `model` (`id` integer not null primary key autoincrement, `name` varchar not null);');
    this.addSql('create unique index `model_name_unique` on `model` (`name`);');

    this.addSql('create table `category` (`id` integer not null primary key autoincrement, `name` varchar not null, `description` varchar not null);');
    this.addSql('create unique index `category_name_unique` on `category` (`name`);');

    this.addSql('create table `car` (`id` integer not null primary key autoincrement, `name` varchar not null, `registration_plate` varchar not null, `color` varchar not null, `price` integer not null, `purchase_date` datetime not null);');
    this.addSql('create unique index `car_registration_plate_unique` on `car` (`registration_plate`);');

    this.addSql('create table `rental` (`id` integer not null primary key autoincrement, `pick_up_date` datetime not null, `return_date` datetime not null, `total_cost` integer null);');

    this.addSql('create table `category_cars` (`category_id` integer not null, `car_id` integer not null, primary key (`category_id`, `car_id`));');
    this.addSql('create index `category_cars_category_id_index` on `category_cars` (`category_id`);');
    this.addSql('create index `category_cars_car_id_index` on `category_cars` (`car_id`);');

    this.addSql('alter table `model` add column `brand_id` integer null;');
    this.addSql('create index `model_brand_id_index` on `model` (`brand_id`);');

    this.addSql('alter table `car` add column `model_id` integer null;');
    this.addSql('create index `car_model_id_index` on `car` (`model_id`);');

    this.addSql('alter table `rental` add column `pick_up_location_id` integer null;');
    this.addSql('alter table `rental` add column `return_location_id` integer null;');
    this.addSql('alter table `rental` add column `user_id` integer null;');
    this.addSql('alter table `rental` add column `car_id` integer null;');
    this.addSql('create index `rental_pick_up_location_id_index` on `rental` (`pick_up_location_id`);');
    this.addSql('create index `rental_return_location_id_index` on `rental` (`return_location_id`);');
    this.addSql('create index `rental_user_id_index` on `rental` (`user_id`);');
    this.addSql('create index `rental_car_id_index` on `rental` (`car_id`);');
  }

}
