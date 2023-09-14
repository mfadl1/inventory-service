import { Migration } from '@mikro-orm/migrations';

export class Migration20230914004633 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" add column "rating" double precision not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" drop column "rating";');
  }

}
