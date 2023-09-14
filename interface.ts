import { CreateProductParams, Product } from "./types";

export interface ProductCrudService {
    create(params: CreateProductParams): Promise<Product>
    createQueryContext(): ProductQueryContext;
    findAndCount(ctx: ProductQueryContext): Promise<{
        data: Iterable<Product>;
        count: number;
    }>;
    delete(productId: number): Promise<boolean>;
}

export interface ProductQueryContext {
    or(ctxList: ProductQueryContext[]): ProductQueryContext;
    and(ctxList: ProductQueryContext[]): ProductQueryContext;
    offset(value: number): ProductQueryContext;
    limit(value: number): ProductQueryContext;
    orderBy(value: {
        by: keyof Product;
        order: 'asc' | 'desc';
    }): ProductQueryContext;
    name(value: string): ProductQueryContext;
    isActive(value: boolean): ProductQueryContext
}