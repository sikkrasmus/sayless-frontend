/**
 * Search service for handling search-related API calls
 */

import { api } from './api';
import { ApiEndpoints } from '@/types/api';
import { SearchRequest, ProductSearchResult, ApiResponse } from '@/types';

/**
 * Search for products
 */
async function search(request: SearchRequest): Promise<ApiResponse<ProductSearchResult>> {
    return api.post<ProductSearchResult>(ApiEndpoints.SEARCH, request);
}

/**
 * Get trending products
 */
async function getTrending(limit: number = 10): Promise<ApiResponse<ProductSearchResult>> {
    return api.get<ProductSearchResult>(ApiEndpoints.TRENDING, {
        params: { limit },
    });
}

/**
 * Get product recommendations based on a product ID
 */
async function getRecommendations(
    productId: string,
    limit: number = 10
): Promise<ApiResponse<ProductSearchResult>> {
    return api.get<ProductSearchResult>(`${ApiEndpoints.PRODUCTS}/${productId}/recommendations`, {
        params: { limit },
    });
}

/**
 * Get product details by ID
 */
async function getProductById(productId: string): Promise<ApiResponse<any>> {
    return api.get<any>(`${ApiEndpoints.PRODUCTS}/${productId}`);
}

// Export search service
export const searchService = {
    search,
    getTrending,
    getRecommendations,
    getProductById,
}; 