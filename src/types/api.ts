/**
 * API-related type definitions
 */

// Generic API response structure
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    error?: ApiError;
    meta?: ApiMeta;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}

export interface ApiMeta {
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    timestamp?: number;
}

// API endpoints
export enum ApiEndpoints {
    SEARCH = '/api/search',
    CHAT = '/api/chat',
    PRODUCTS = '/api/products',
    LOCATION = '/api/location',
    TRENDING = '/api/trending',
    BRANDS = '/api/brands',
}

// API request options
export interface ApiRequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean | undefined>;
    timeout?: number;
    cache?: RequestCache;
}

// Location API
export interface LocationResponse {
    country: string;
    countryCode: string;
    city?: string;
    region?: string;
    currency?: string;
    timezone?: string;
}

// Search API
export interface SearchRequest {
    query?: string;
    imageUrl?: string;
    filters?: Record<string, any>;
    page?: number;
    limit?: number;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
}

// Chat API
export interface ChatRequest {
    message: string;
    conversationId?: string;
    attachments?: {
        type: 'image' | 'product';
        content: string; // Base64 for images, product ID for products
    }[];
} 