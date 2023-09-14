import { Migration } from '@mikro-orm/migrations';

export class Migration20230913233108 extends Migration {

  async up(): Promise<void> {
    this.addSql('create schema if not exists "inventory";');

    this.addSql('create table "inventory"."products" ("id" serial primary key, "name" varchar(255) not null, "sku" varchar(255) not null, "category" varchar(255) null, "is_active" boolean not null, "created_at" timestamp with time zone not null default CURRENT_TIMESTAMP, "updated_at" timestamp with time zone not null default CURRENT_TIMESTAMP);');
    this.addSql('alter table "inventory"."products" add constraint "products_sku_unique" unique ("sku");');

    this.addSql('create table "inventory"."product_details" ("id" serial primary key, "product_id" int not null, "description" varchar(255) null, "buy_price" int not null default 0, "sell_price" int not null default 0, "url_image" varchar(255) null, "created_at" timestamp with time zone not null default CURRENT_TIMESTAMP, "updated_at" timestamp with time zone not null default CURRENT_TIMESTAMP);');
    this.addSql('alter table "inventory"."product_details" add constraint "product_details_product_id_unique" unique ("product_id");');

    this.addSql('alter table "inventory"."product_details" add constraint "product_details_product_id_foreign" foreign key ("product_id") references "inventory"."products" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "inventory"."product_details" drop constraint "product_details_product_id_foreign";');
  }

}
