/**
 * Product-related type definitions
 */

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    currency: string;
    description?: string;
    imageUrl: string;
    images?: string[];
    colors?: ProductColor[];
    sizes?: ProductSize[];
    categories?: string[];
    tags?: string[];
    rating?: number;
    reviewCount?: number;
    inStock: boolean;
    url: string; // URL to the product on the retailer's website
}

export interface ProductColor {
    name: string;
    value: string; // Hex code or color name
    imageUrl?: string;
}

export interface ProductSize {
    name: string;
    value: string;
    inStock: boolean;
}

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    parentId?: string;
}

export interface Brand {
    id: string;
    name: string;
    logo: string;
    description?: string;
    website?: string;
}

export interface ProductSearchResult {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    filters?: {
        brands?: Brand[];
        categories?: ProductCategory[];
        priceRange?: {
            min: number;
            max: number;
        };
        colors?: string[];
        sizes?: string[];
    };
} 