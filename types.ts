export interface Product {
    id: number;
    name: string;
    sku: string;
    productDetail: ProductDetail;
    category: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductDetail {
    description: string;
    buyPrice: number;
    sellPrice: number;
    stock: number;
    rating: number;
    urlImage: string;
    createdAt: Date;
    updatedAt: Date;
}