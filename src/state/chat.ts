/**
 * Chat-related state management with signals
 */

import { signal, computed } from '@preact/signals-react';
import { ChatMessage, ChatConversation, ChatSearchQuery } from '@/types';

// Chat state
export const currentConversation = signal<ChatConversation | null>(null);
export const conversations = signal<ChatConversation[]>([]);
export const isTyping = signal<boolean>(false);
export const chatError = signal<string | null>(null);
export const pendingMessage = signal<string>('');
export const pendingAttachments = signal<{ type: 'image' | 'product'; content: string }[]>([]);

// Computed values
export const hasConversations = computed(() => conversations.value.length > 0);
export const currentMessages = computed(() => currentConversation.value?.messages || []);
export const lastMessage = computed(() => {
    const messages = currentMessages.value;
    return messages.length > 0 ? messages[messages.length - 1] : null;
});
export const conversationTitle = computed(() =>
    currentConversation.value?.title || 'New Conversation'
);

// Initial chat state
export const initialChatState = {
    currentConversation: null,
    conversations: [],
    isTyping: false,
    chatError: null,
    pendingMessage: '',
    pendingAttachments: [],
}; 