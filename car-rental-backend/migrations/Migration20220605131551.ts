import { Migration } from '@mikro-orm/migrations';

export class Migration20220605131551 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `rental` add column `car_id` integer null;');
    this.addSql('create index `rental_car_id_index` on `rental` (`car_id`);');
  }

}
