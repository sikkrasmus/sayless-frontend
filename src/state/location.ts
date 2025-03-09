/**
 * Location-related state management with signals
 */

import { signal, computed } from '@preact/signals-react';
import { LocationResponse } from '@/types';

// Location state
export const currentLocation = signal<LocationResponse | null>(null);
export const isDetectingLocation = signal<boolean>(false);
export const locationError = signal<string | null>(null);
export const availableCountries = signal<{ code: string; name: string }[]>([
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
]);

// Computed values
export const countryCode = computed(() => currentLocation.value?.countryCode || 'US');
export const countryName = computed(() => {
    const code = countryCode.value;
    const country = availableCountries.value.find(c => c.code === code);
    return country?.name || 'United States';
});
export const hasLocationData = computed(() => !!currentLocation.value);
export const locationCurrency = computed(() => currentLocation.value?.currency || 'USD');

// Initial location state
export const initialLocationState = {
    currentLocation: null,
    isDetectingLocation: false,
    locationError: null,
}; 