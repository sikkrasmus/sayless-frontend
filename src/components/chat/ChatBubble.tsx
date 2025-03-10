import React from 'react';

export type MessageSender = 'user' | 'system';

interface ChatBubbleProps {
    content: string | React.ReactNode;
    sender: MessageSender;
    timestamp?: Date;
    isLoading?: boolean;
    className?: string;
}

/**
 * ChatBubble component for the Sayless application
 * 
 * @param content - Message content (string or ReactNode)
 * @param sender - Who sent the message ('user' or 'system')
 * @param timestamp - When the message was sent
 * @param isLoading - Whether the message is in a loading state
 * @param className - Additional CSS classes
 */
const ChatBubble: React.FC<ChatBubbleProps> = ({
    content,
    sender,
    timestamp,
    isLoading = false,
    className = '',
}) => {
    // Determine bubble classes based on sender
    const bubbleClasses = sender === 'user'
        ? 'chat-bubble-user'
        : 'chat-bubble-system';

    // Format timestamp if provided
    const formattedTime = timestamp
        ? new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(timestamp)
        : null;

    return (
        <div className={`${bubbleClasses} ${className} ${isLoading ? 'opacity-70' : ''}`}>
            {/* Message content */}
            <div className="chat-content">
                {isLoading ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                ) : (
                    content
                )}
            </div>

            {/* Timestamp (if provided) */}
            {formattedTime && !isLoading && (
                <div className={`text-2xs mt-1 ${sender === 'user' ? 'text-white/70' : 'text-text-light'}`}>
                    {formattedTime}
                </div>
            )}
        </div>
    );
};

export default ChatBubble; 