import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    currentConversation,
    currentMessages,
    pendingMessage,
    updatePendingMessage,
    sendMessage,
    addAttachment,
    clearAttachments,
} from '@/state';
import { countryName } from '@/state/location';
import { searchQuery, updateSearchQuery } from '@/state/search';

const ChatPage: NextPage = () => {
    const router = useRouter();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Handle initial query from URL
    useEffect(() => {
        const { q, image } = router.query;
        if (q && typeof q === 'string') {
            // Set search query and send initial message
            updateSearchQuery(q);
            updatePendingMessage(q);
            sendMessage();
        } else if (image === 'true') {
            // Handle image search
            // This would normally upload the image and add it as an attachment
            addAttachment('image', 'https://example.com/placeholder-image.jpg');
            sendMessage();
        }
    }, [router.query]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage();
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-primary text-white">
                <div className="container-custom py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        SAY LESS.
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm">
                            SHIP TO: <span className="font-medium">{countryName.value}</span>
                        </div>
                        <Link href="/contact" className="btn-secondary text-sm">
                            Request a store
                        </Link>
                    </div>
                </div>
            </header>

            {/* Chat Container */}
            <div className="flex-grow bg-secondary">
                <div className="container-custom py-8">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Chat Messages */}
                        <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
                            {currentMessages.value.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">
                                    <p className="text-lg font-medium">TODAY</p>
                                    <p className="mt-4">Start a conversation by typing a message below.</p>
                                </div>
                            ) : (
                                currentMessages.value.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`max-w-[80%] ${message.sender === 'user'
                                                ? 'ml-auto bg-primary text-white rounded-l-lg rounded-tr-lg'
                                                : 'mr-auto bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg'
                                            } p-4 shadow-sm`}
                                    >
                                        <p>{message.content}</p>
                                        {message.attachments?.length > 0 && (
                                            <div className="mt-2 grid grid-cols-2 gap-2">
                                                {message.attachments.map((attachment) => (
                                                    <div key={attachment.id} className="rounded overflow-hidden">
                                                        {attachment.type === 'image' && (
                                                            <img
                                                                src={attachment.url || ''}
                                                                alt="Attachment"
                                                                className="w-full h-auto"
                                                            />
                                                        )}
                                                        {attachment.type === 'product' && (
                                                            <div className="bg-white border rounded p-2">
                                                                <img
                                                                    src={attachment.previewUrl || ''}
                                                                    alt={attachment.title || 'Product'}
                                                                    className="w-full h-auto mb-1"
                                                                />
                                                                <p className="text-sm font-medium truncate">{attachment.title}</p>
                                                                <p className="text-xs text-gray-600 truncate">
                                                                    {attachment.description}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Search Results (if any) */}
                        {currentConversation.value && (
                            <div className="border-t border-gray-200 p-4">
                                <div className="text-sm text-gray-600 mb-2">Over 200+ items found</div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex space-x-2">
                                        <button className="btn-sm bg-gray-100 text-gray-800 rounded-full">
                                            Dark colors only
                                        </button>
                                        <button className="btn-sm bg-gray-100 text-gray-800 rounded-full">
                                            Something colorful
                                        </button>
                                        <button className="btn-sm bg-gray-100 text-gray-800 rounded-full">
                                            Leather Boots
                                        </button>
                                        <button className="btn-sm bg-gray-100 text-gray-800 rounded-full">
                                            In this style...
                                        </button>
                                    </div>
                                    <div>
                                        <select className="input py-1 px-2 text-sm">
                                            <option>Popularity</option>
                                            <option>Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                            <option>Newest</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Product Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="border rounded overflow-hidden">
                                            <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                                                <div className="w-full h-40 bg-gray-200"></div>
                                            </div>
                                            <div className="p-2">
                                                <p className="text-xs font-medium">REVOLVE</p>
                                                <p className="text-xs text-gray-600 truncate">Blue asymmetric dress</p>
                                                <p className="text-xs font-bold">345€</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center mt-4">
                                    <button className="btn-secondary">LOAD MORE</button>
                                </div>
                            </div>
                        )}

                        {/* Chat Input */}
                        <div className="border-t border-gray-200 p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="input pr-12"
                                        placeholder="Be more specific..."
                                        value={pendingMessage.value}
                                        onChange={(e) => updatePendingMessage(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setIsSearchFocused(false)}
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        // This would normally upload the file and get a URL
                                                        addAttachment('image', 'https://example.com/placeholder-image.jpg');
                                                    }
                                                }}
                                            />
                                            <span className="text-gray-500 hover:text-primary">📷</span>
                                        </label>
                                        <button
                                            type="submit"
                                            className="text-primary"
                                            disabled={!pendingMessage.value.trim()}
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-100 py-4">
                <div className="container-custom">
                    <div className="text-center text-sm text-gray-600">
                        2023 SAY LESS OÜ | <Link href="/privacy">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage; 