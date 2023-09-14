import {
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryKey,
    Property,
    Ref,
    Unique,
} from '@mikro-orm/core';
import { ProductModel } from './product.entities';
import { ProductDetail } from '../../types';

@Entity({ tableName: 'product_details' })
export class ProductDetailModel implements ProductDetail {
    @PrimaryKey({ autoincrement: true })
    readonly id!: number;

    @OneToOne(() => ProductModel, {
        owner: true,
		ref: true,
		onDelete: 'cascade',
    })
    product!: Ref<ProductModel>;

    @Property({ nullable: true })
    description!: string;

    @Property({ fieldName: 'buy_price', default: 0 })
    buyPrice!: number;

    @Property({ fieldName: 'sell_price', default: 0 })
    sellPrice!: number;

    @Property({ nullable: false, default: 0 })
    stock!: number;

    @Property({ nullable: false, columnType: 'double precision' })
    rating!: number;

    @Property({ nullable: true, fieldName: 'url_image' })
    urlImage!: string;

    @Property({
        defaultRaw: 'CURRENT_TIMESTAMP',
        columnType: 'timestamp with time zone',
        fieldName: 'created_at',
    })
    readonly createdAt!: Date;

    @Property({
        defaultRaw: 'CURRENT_TIMESTAMP',
        columnType: 'timestamp with time zone',
        fieldName: 'updated_at',
    })
    updatedAt!: Date;
}
