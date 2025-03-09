/**
 * Location service for handling location-related API calls
 */

import { api } from './api';
import { ApiEndpoints } from '@/types/api';
import { LocationResponse, ApiResponse } from '@/types';

/**
 * Detect user's location based on IP
 */
async function detectLocation(): Promise<ApiResponse<LocationResponse>> {
    return api.get<LocationResponse>(ApiEndpoints.LOCATION);
}

/**
 * Get available countries
 */
async function getAvailableCountries(): Promise<ApiResponse<{ code: string; name: string }[]>> {
    return api.get<{ code: string; name: string }[]>(`${ApiEndpoints.LOCATION}/countries`);
}

/**
 * Set user's location manually
 */
async function setLocation(countryCode: string): Promise<ApiResponse<LocationResponse>> {
    return api.post<LocationResponse>(ApiEndpoints.LOCATION, { countryCode });
}

// Export location service
export const locationService = {
    detectLocation,
    getAvailableCountries,
    setLocation,
}; 