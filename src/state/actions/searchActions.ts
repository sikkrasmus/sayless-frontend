/**
 * Search-related actions for state management
 */

import { batch } from '@preact/signals-react';
import {
    searchQuery,
    searchImage,
    searchResults,
    searchFilters,
    searchParams,
    isSearching,
    searchError,
    searchResultsTotal,
} from '../search';
import { SearchRequest, Product } from '@/types';
import { searchService } from '@/services/searchService';

/**
 * Perform a search with the current query and filters
 */
export async function performSearch() {
    try {
        // Set loading state
        isSearching.value = true;
        searchError.value = null;

        // Prepare search request
        const request: SearchRequest = {
            query: searchQuery.value,
            imageUrl: searchImage.value || undefined,
            filters: searchFilters.value,
            page: searchParams.value.pagination?.page,
            limit: searchParams.value.pagination?.limit,
            sort: searchParams.value.sort,
        };

        // Call search API
        const response = await searchService.search(request);

        // Update state with results
        batch(() => {
            searchResults.value = response.data.products;
            searchResultsTotal.value = response.data.total;
            isSearching.value = false;
        });

        return response.data;
    } catch (error) {
        // Handle error
        batch(() => {
            searchError.value = error instanceof Error ? error.message : 'An error occurred during search';
            isSearching.value = false;
        });
        return null;
    }
}

/**
 * Update search query
 */
export function updateSearchQuery(query: string) {
    searchQuery.value = query;
}

/**
 * Update search image
 */
export function updateSearchImage(imageUrl: string | null) {
    searchImage.value = imageUrl;
}

/**
 * Update search filters
 */
export function updateSearchFilters(filters: Record<string, any>) {
    searchFilters.value = filters;
}

/**
 * Update pagination
 */
export function updatePagination(page: number, limit?: number) {
    searchParams.value = {
        ...searchParams.value,
        pagination: {
            page,
            limit: limit || searchParams.value.pagination?.limit || 20,
        },
    };
}

/**
 * Clear search results
 */
export function clearSearchResults() {
    batch(() => {
        searchResults.value = [];
        searchResultsTotal.value = 0;
    });
}

/**
 * Reset search state
 */
export function resetSearch() {
    batch(() => {
        searchQuery.value = '';
        searchImage.value = null;
        searchResults.value = [];
        searchFilters.value = {};
        searchParams.value = {
            pagination: { page: 1, limit: 20 },
        };
        searchError.value = null;
        searchResultsTotal.value = 0;
    });
} 