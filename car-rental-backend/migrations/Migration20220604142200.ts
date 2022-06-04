import { Migration } from '@mikro-orm/migrations';

export class Migration20220604142200 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `name` varchar not null, `user_name` varchar not null, `password` varchar not null, `role` varchar not null);');
    this.addSql('create unique index `user_user_name_unique` on `user` (`user_name`);');

    this.addSql('alter table `rental` add column `user_id` integer null;');
    this.addSql('create index `rental_user_id_index` on `rental` (`user_id`);');
  }

}
