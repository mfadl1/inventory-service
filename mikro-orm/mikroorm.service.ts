import { EntityManager, FilterQuery, FindOptions } from "@mikro-orm/core";
import { ProductCrudService, ProductQueryContext } from "../interface";
import { ProductModel } from "./entities/product.entities";
import { CreateProductParams, Product } from "../types";

export class ProductCrudServiceMikroOrm implements ProductCrudService {
  constructor(private entityManager: EntityManager) {}

  createQueryContext(): ProductQueryContextMikroOrm {
    return new ProductQueryContextMikroOrm();
  }

  public async findAndCount(
    ctx: ProductQueryContextMikroOrm
  ): Promise<{ data: Iterable<Product>; count: number }> {
    const em = this.entityManager.fork();
    const { where, options } = ctx.buildContext();
    const [result, count] = await em.findAndCount(ProductModel, where, {
      ...(options as any),
      populate: ["productDetail"],
    });

    return {
      data: result,
      count: count,
    };
  }

  public async delete(productId: number): Promise<boolean> {
    const em = this.entityManager.fork();

    const product = await em.findOne(ProductModel, {
      id: productId,
    });
    if (!product)
      throw new Error("Failed to delete product: check your parameter!");

    product.isActive = false;
    await em.flush();
    return true;
  }

  public async create(params: CreateProductParams): Promise<Product> {
    const em = this.entityManager.fork();
    const now = new Date();

    const product = em.create(ProductModel, {
        name: params.name,
        sku: params.sku,
        isActive: true,
        category: params.category,
        productDetail: params.detail,
        createdAt: now,
        updatedAt: now,
    });
    if (!product)
      throw new Error(
        "Failed to insert product: something wrong with your request body"
      );

    await em.flush();
    return product;
  }
}

export class ProductQueryContextMikroOrm implements ProductQueryContext {
  private ctx: {
    where: FilterQuery<ProductModel>;
    options: FindOptions<ProductModel, keyof ProductModel>;
  } = {
    where: {},
    options: {},
  };

  constructor(ctx?: {
    where: FilterQuery<ProductModel>;
    options: FindOptions<ProductModel, keyof ProductModel>;
  }) {
    this.ctx = ctx || {
      where: {},
      options: {},
    };
  }

  or(ctxList: ProductQueryContextMikroOrm[]): ProductQueryContext {
    const where = this.ctx.where;
    this.ctx.where = {
      $or: [where],
    };

    for (let idxCtx = 0; idxCtx < ctxList.length; idxCtx++) {
      const ctxData = ctxList[idxCtx];
      this.ctx.where.$or?.push(ctxData.ctx.where);
    }

    return this;
  }

  and(ctxList: ProductQueryContextMikroOrm[]): ProductQueryContext {
    const where = this.ctx.where;
    this.ctx.where = {
      $and: [where],
    };

    for (let idxCtx = 0; idxCtx < ctxList.length; idxCtx++) {
      const ctxData = ctxList[idxCtx];
      this.ctx.where.$and?.push(ctxData.ctx.where);
    }

    return this;
  }

  offset(value: number): ProductQueryContext {
    this.ctx.options.offset = value;
    return this;
  }

  limit(value: number): ProductQueryContext {
    this.ctx.options.limit = value;
    return this;
  }

  orderBy(value: {
    by: keyof Product;
    order: "asc" | "desc";
  }): ProductQueryContext {
    this.ctx.options.orderBy = {
      [value.by]: value.order,
    };

    return this;
  }

  name(value: string): ProductQueryContext {
    Object.assign(this.ctx.where, {
      reportNumber: {
        $like: `%${value}%`,
      },
    } as FilterQuery<ProductModel>);
    return this;
  }

  isActive(value: boolean): ProductQueryContext {
    Object.assign(this.ctx.where, {
      isActive: value,
    } as FilterQuery<ProductModel>);
    return this;
  }

  buildContext() {
    return this.ctx;
  }
}
