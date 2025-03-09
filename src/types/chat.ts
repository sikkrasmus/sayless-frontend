/**
 * Chat-related type definitions
 */

export type MessageSender = 'user' | 'system';

export interface ChatMessage {
    id: string;
    content: string;
    sender: MessageSender;
    timestamp: number;
    attachments?: ChatAttachment[];
    metadata?: Record<string, any>;
}

export interface ChatAttachment {
    id: string;
    type: 'image' | 'product' | 'link';
    url?: string;
    productId?: string;
    previewUrl?: string;
    title?: string;
    description?: string;
}

export interface ChatConversation {
    id: string;
    messages: ChatMessage[];
    createdAt: number;
    updatedAt: number;
    title?: string;
}

export interface ChatSearchQuery {
    text?: string;
    imageUrl?: string;
    filters?: {
        category?: string;
        priceRange?: {
            min?: number;
            max?: number;
        };
        colors?: string[];
        sizes?: string[];
        brands?: string[];
    };
}

export interface ChatSearchResponse {
    query: ChatSearchQuery;
    results: {
        products: any[]; // Will use Product type from product.ts
        total: number;
        suggestedFilters?: {
            categories?: { name: string; count: number }[];
            brands?: { name: string; count: number }[];
            priceRanges?: { min: number; max: number; count: number }[];
        };
    };
    relatedQueries?: string[];
} 