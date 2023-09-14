import { Migration } from '@mikro-orm/migrations';

export class Migration20230913235823 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" drop constraint "product_details_pkey";');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" drop constraint "product_details_pkey";');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_pkey" primary key ("id", "product_id");');
  }

}
