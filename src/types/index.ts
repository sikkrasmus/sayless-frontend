/**
 * Common types used throughout the application
 */

// Re-export all types from domain-specific files
export * from './product';
export * from './chat';
export * from './api';

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// Common application types
export interface User {
    id: string;
    name?: string;
    email?: string;
    preferences?: UserPreferences;
}

export interface UserPreferences {
    location?: string;
    currency?: string;
    language?: string;
}

// Common UI types
export interface SelectOption {
    value: string;
    label: string;
}

export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
    page: number;
    limit: number;
    total?: number;
}

export interface SortParams {
    field: string;
    order: SortOrder;
}

export interface FilterParams {
    [key: string]: string | number | boolean | string[] | number[];
}

export interface SearchParams {
    query?: string;
    filters?: FilterParams;
    sort?: SortParams;
    pagination?: PaginationParams;
} 