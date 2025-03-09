/**
 * Base API service for making HTTP requests
 */

import { ApiResponse, ApiError, ApiRequestOptions } from '@/types/api';

// Default API options
const DEFAULT_OPTIONS: ApiRequestOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
};

// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Make a GET request
 */
export async function get<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
    return request<T>('GET', endpoint, undefined, options);
}

/**
 * Make a POST request
 */
export async function post<T>(
    endpoint: string,
    data?: any,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
    return request<T>('POST', endpoint, data, options);
}

/**
 * Make a PUT request
 */
export async function put<T>(
    endpoint: string,
    data?: any,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
    return request<T>('PUT', endpoint, data, options);
}

/**
 * Make a DELETE request
 */
export async function del<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
    return request<T>('DELETE', endpoint, undefined, options);
}

/**
 * Make a request to the API
 */
async function request<T>(
    method: string,
    endpoint: string,
    data?: any,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
    try {
        // Prepare URL
        const url = endpoint.startsWith('http')
            ? endpoint
            : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

        // Prepare request options
        const requestOptions: RequestInit = {
            method,
            headers: {
                ...DEFAULT_OPTIONS.headers,
                ...options.headers,
            },
            cache: options.cache,
        };

        // Add body for non-GET requests
        if (method !== 'GET' && data) {
            requestOptions.body = JSON.stringify(data);
        }

        // Add query parameters for GET requests
        const queryParams = method === 'GET' && options.params ? new URLSearchParams() : null;
        if (queryParams && options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });
        }

        // Make request
        const response = await fetch(
            queryParams ? `${url}?${queryParams.toString()}` : url,
            requestOptions
        );

        // Parse response
        const responseData = await response.json();

        // Check for error response
        if (!response.ok) {
            const error: ApiError = {
                code: responseData.code || String(response.status),
                message: responseData.message || response.statusText,
                details: responseData.details,
            };

            return {
                data: null as unknown as T,
                success: false,
                error,
            };
        }

        // Return success response
        return {
            data: responseData.data || responseData,
            success: true,
            meta: responseData.meta,
        };
    } catch (error) {
        // Handle network errors
        const apiError: ApiError = {
            code: 'NETWORK_ERROR',
            message: error instanceof Error ? error.message : 'Network error',
        };

        return {
            data: null as unknown as T,
            success: false,
            error: apiError,
        };
    }
}

// Export API functions
export const api = {
    get,
    post,
    put,
    delete: del,
}; 