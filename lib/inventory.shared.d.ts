import { ProductCrudService } from "./interface";
export declare const API: {
    ProductCrudService: any;
};
export type APIInstance = ProductCrudService;
export interface MikroOrmDriver {
    init(): Promise<void>;
    destroy(): Promise<void>;
    get(api: Symbol): APIInstance;
}
//# sourceMappingURL=inventory.shared.d.ts.map