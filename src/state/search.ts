/**
 * Search-related state management with signals
 */

import { signal, computed } from '@preact/signals-react';
import { Product, ProductSearchResult, SearchParams } from '@/types';

// Search state
export const searchQuery = signal<string>('');
export const searchImage = signal<string | null>(null);
export const searchResults = signal<Product[]>([]);
export const searchFilters = signal<Record<string, any>>({});
export const searchParams = signal<SearchParams>({
    pagination: { page: 1, limit: 20 },
});
export const isSearching = signal<boolean>(false);
export const searchError = signal<string | null>(null);
export const searchResultsTotal = signal<number>(0);

// Computed values
export const hasSearchResults = computed(() => searchResults.value.length > 0);
export const currentPage = computed(() => searchParams.value.pagination?.page || 1);
export const totalPages = computed(() =>
    Math.ceil(searchResultsTotal.value / (searchParams.value.pagination?.limit || 20))
);
export const hasNextPage = computed(() => currentPage.value < totalPages.value);
export const hasPreviousPage = computed(() => currentPage.value > 1);

// Initial search state
export const initialSearchState = {
    searchQuery: '',
    searchImage: null,
    searchResults: [],
    searchFilters: {},
    searchParams: {
        pagination: { page: 1, limit: 20 },
    },
    isSearching: false,
    searchError: null,
    searchResultsTotal: 0,
}; 