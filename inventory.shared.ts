import { ProductCrudService } from "./interface";
import { ProductCrudServiceSymbol } from "./inventory.symbol";

export const API = {
    ProductCrudService: ProductCrudServiceSymbol,
};

export type APIInstance =
    | ProductCrudService

export interface Driver {
    init(): Promise<void>;
    destroy(): Promise<void>;
    get(api: Symbol): APIInstance;
}
