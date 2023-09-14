import { Migration } from '@mikro-orm/migrations';

export class Migration20230913235709 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" drop constraint "product_details_product_id_foreign";');

    this.addSql('alter table "inventory"."product_details" add column "stock" int not null default 0;');
    this.addSql('alter table "inventory"."product_details" drop constraint "product_details_pkey";');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_product_id_foreign" foreign key ("product_id") references "inventory"."products" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_pkey" primary key ("id", "product_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" drop constraint "product_details_product_id_foreign";');

    this.addSql('alter table "inventory"."product_details" drop constraint "product_details_pkey";');
    this.addSql('alter table "inventory"."product_details" drop column "stock";');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_product_id_foreign" foreign key ("product_id") references "inventory"."products" ("id") on update cascade;');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_pkey" primary key ("id");');
  }

}
