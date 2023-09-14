import {
    Entity,
    LoadStrategy,
    OneToOne,
    PrimaryKey,
    Property,
    Ref,
    Unique,
} from '@mikro-orm/core';
import { ProductDetailModel } from './product_detail.entities';
import { Product } from '../../types';

@Entity({ tableName: 'products' })
export class ProductModel implements Product {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @OneToOne(() => ProductDetailModel, (detail) => detail.product, {
		nullable: false,
		onDelete: 'cascade',
		strategy: LoadStrategy.JOINED
	})
	productDetail: ProductDetailModel = new ProductDetailModel();

    @Property({ nullable: false })
    name!: string;

    @Property({ nullable: false })
    @Unique()
    sku!: string;

    @Property({ nullable: true })
    category!: string;

    @Property({ nullable: false, fieldName: 'is_active' })
    isActive!: boolean;

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
