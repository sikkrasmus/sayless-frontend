/**
 * User-related state management with signals
 */

import { signal, computed } from '@preact/signals-react';
import { User, UserPreferences } from '@/types';

// User state
export const currentUser = signal<User | null>(null);
export const isAuthenticated = signal<boolean>(false);
export const userPreferences = signal<UserPreferences>({
    location: '',
    currency: 'USD',
    language: 'en',
});
export const authError = signal<string | null>(null);
export const isLoadingUser = signal<boolean>(false);

// Computed values
export const userLocation = computed(() => userPreferences.value.location || '');
export const userCurrency = computed(() => userPreferences.value.currency || 'USD');
export const userName = computed(() => currentUser.value?.name || 'Guest');
export const hasUserPreferences = computed(() => !!userPreferences.value.location);

// Initial user state
export const initialUserState = {
    currentUser: null,
    isAuthenticated: false,
    userPreferences: {
        location: '',
        currency: 'USD',
        language: 'en',
    },
    authError: null,
    isLoadingUser: false,
}; 