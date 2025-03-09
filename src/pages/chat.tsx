import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { searchQuery } from '@/state';
import { countryName } from '@/state/location';

const ChatPage: NextPage = () => {
    const router = useRouter();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([]);
    const [pendingMessage, setPendingMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle initial query from URL
    useEffect(() => {
        const { q, image } = router.query;
        if (q && typeof q === 'string') {
            // Set search query and send initial message
            searchQuery.value = q;
            setPendingMessage(q);
            handleSendMessage(q);
        } else if (image === 'true') {
            // Handle image search
            handleSendMessage('I uploaded an image to search for similar items');
        }
    }, [router.query]);

    const handleSendMessage = (message: string) => {
        if (!message.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: message }]);
        setPendingMessage('');

        // Simulate bot response
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setMessages(prev => [
                ...prev,
                {
                    type: 'bot',
                    content: `I found some items based on "${message}". Here are some suggestions...`
                }
            ]);
        }, 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(pendingMessage);
    };

    return (
        <Layout title="Chat - Sayless" description="Chat with our AI to find the perfect fashion items">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Fashion Assistant</h1>
                    <div className="text-sm text-gray-500">
                        Shipping to: {countryName?.value || 'United States'}
                    </div>
                </div>

                <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            <p className="mb-2">Start a conversation to find your perfect fashion items</p>
                            <p className="text-sm">Try asking about specific styles, occasions, or trends</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg max-w-[80%] ${message.type === 'user'
                                            ? 'bg-primary text-white ml-auto'
                                            : 'bg-white border border-gray-200'
                                        }`}
                                >
                                    {message.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="p-3 rounded-lg max-w-[80%] bg-white border border-gray-200">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ask about fashion items..."
                            value={pendingMessage}
                            onChange={(e) => setPendingMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-primary text-white p-2 rounded-md hover:bg-primary-light transition-colors"
                            disabled={!pendingMessage.trim() || isLoading}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ChatPage; 