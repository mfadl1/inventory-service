import { Migration } from '@mikro-orm/migrations';

export class Migration20230914070416 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" alter column "rating" type double precision using ("rating"::double precision);');
    this.addSql('alter table "inventory"."product_details" alter column "rating" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" alter column "rating" type double using ("rating"::double);');
    this.addSql('alter table "inventory"."product_details" alter column "rating" set not null;');
  }

}
