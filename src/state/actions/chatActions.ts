/**
 * Chat-related actions for state management
 */

import { batch } from '@preact/signals-react';
import {
    currentConversation,
    conversations,
    isTyping,
    chatError,
    pendingMessage,
    pendingAttachments,
} from '../chat';
import { ChatMessage, ChatConversation, ChatRequest } from '@/types';
import { chatService } from '@/services/chatService';

/**
 * Send a message in the current conversation
 */
export async function sendMessage() {
    try {
        // Set typing state
        isTyping.value = true;
        chatError.value = null;

        // Get message content
        const messageContent = pendingMessage.value.trim();
        if (!messageContent && pendingAttachments.value.length === 0) {
            isTyping.value = false;
            return null;
        }

        // Create a new conversation if none exists
        if (!currentConversation.value) {
            createNewConversation();
        }

        // Create user message
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            content: messageContent,
            sender: 'user',
            timestamp: Date.now(),
            attachments: pendingAttachments.value.map(attachment => ({
                id: `attachment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                type: attachment.type,
                url: attachment.content,
            })),
        };

        // Add user message to conversation
        addMessageToConversation(userMessage);

        // Clear pending message and attachments
        batch(() => {
            pendingMessage.value = '';
            pendingAttachments.value = [];
        });

        // Prepare chat request
        const request: ChatRequest = {
            message: messageContent,
            conversationId: currentConversation.value?.id,
            attachments: userMessage.attachments?.map(attachment => ({
                type: attachment.type as 'image' | 'product',
                content: attachment.url || '',
            })),
        };

        // Call chat API
        const response = await chatService.sendMessage(request);

        // Create system message from response
        const systemMessage: ChatMessage = {
            id: response.data.id || `system-${Date.now()}`,
            content: response.data.message,
            sender: 'system',
            timestamp: Date.now(),
            attachments: response.data.attachments?.map(attachment => ({
                id: attachment.id,
                type: attachment.type,
                url: attachment.url,
                productId: attachment.productId,
                previewUrl: attachment.previewUrl,
                title: attachment.title,
                description: attachment.description,
            })),
            metadata: response.data.metadata,
        };

        // Add system message to conversation
        addMessageToConversation(systemMessage);

        // Update typing state
        isTyping.value = false;

        return systemMessage;
    } catch (error) {
        // Handle error
        batch(() => {
            chatError.value = error instanceof Error ? error.message : 'An error occurred while sending message';
            isTyping.value = false;
        });
        return null;
    }
}

/**
 * Create a new conversation
 */
export function createNewConversation() {
    const newConversation: ChatConversation = {
        id: `conversation-${Date.now()}`,
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };

    batch(() => {
        currentConversation.value = newConversation;
        conversations.value = [newConversation, ...conversations.value];
    });

    return newConversation;
}

/**
 * Add a message to the current conversation
 */
export function addMessageToConversation(message: ChatMessage) {
    if (!currentConversation.value) {
        return;
    }

    const updatedConversation = {
        ...currentConversation.value,
        messages: [...currentConversation.value.messages, message],
        updatedAt: Date.now(),
    };

    batch(() => {
        currentConversation.value = updatedConversation;
        conversations.value = conversations.value.map(conv =>
            conv.id === updatedConversation.id ? updatedConversation : conv
        );
    });
}

/**
 * Switch to a different conversation
 */
export function switchConversation(conversationId: string) {
    const conversation = conversations.value.find(conv => conv.id === conversationId);
    if (conversation) {
        currentConversation.value = conversation;
    }
}

/**
 * Update pending message
 */
export function updatePendingMessage(message: string) {
    pendingMessage.value = message;
}

/**
 * Add attachment to pending message
 */
export function addAttachment(type: 'image' | 'product', content: string) {
    pendingAttachments.value = [...pendingAttachments.value, { type, content }];
}

/**
 * Remove attachment from pending message
 */
export function removeAttachment(index: number) {
    pendingAttachments.value = pendingAttachments.value.filter((_, i) => i !== index);
}

/**
 * Clear all attachments
 */
export function clearAttachments() {
    pendingAttachments.value = [];
} 