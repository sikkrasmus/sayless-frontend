/**
 * Chat service for handling chat-related API calls
 */

import { api } from './api';
import { ApiEndpoints } from '@/types/api';
import { ChatRequest, ChatConversation, ApiResponse } from '@/types';

/**
 * Send a message to the chat API
 */
async function sendMessage(request: ChatRequest): Promise<ApiResponse<any>> {
    return api.post<any>(ApiEndpoints.CHAT, request);
}

/**
 * Get conversation history
 */
async function getConversations(limit: number = 10): Promise<ApiResponse<ChatConversation[]>> {
    return api.get<ChatConversation[]>(ApiEndpoints.CHAT, {
        params: { limit },
    });
}

/**
 * Get a specific conversation by ID
 */
async function getConversationById(conversationId: string): Promise<ApiResponse<ChatConversation>> {
    return api.get<ChatConversation>(`${ApiEndpoints.CHAT}/${conversationId}`);
}

/**
 * Delete a conversation
 */
async function deleteConversation(conversationId: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`${ApiEndpoints.CHAT}/${conversationId}`);
}

// Export chat service
export const chatService = {
    sendMessage,
    getConversations,
    getConversationById,
    deleteConversation,
}; 