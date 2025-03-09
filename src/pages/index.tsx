import type { NextPage } from 'next';
import { useState } from 'react';
import { searchQuery } from '@/state';
import Layout from '@/components/layout/Layout';

const Home: NextPage = () => {
    const [isUploading, setIsUploading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.value.trim()) {
            // Navigate to chat page with search query
            window.location.href = `/chat?q=${encodeURIComponent(searchQuery.value)}`;
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            // TODO: Implement image upload
            // For now, just simulate a delay
            setTimeout(() => {
                setIsUploading(false);
                // Navigate to chat page with image search
                window.location.href = '/chat?image=true';
            }, 1000);
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-primary mb-4">
                    SAY LESS.
                </h1>
                <p className="text-xl text-gray-600">
                    The new way to shop. Just a lot <span className="text-accent font-bold">less</span> work.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mb-12">
                <h2 className="text-2xl font-bold mb-4">
                    Find your perfect match
                </h2>

                <p className="mb-6">
                    Describe the item or upload a photo to find your perfect match.
                </p>

                <form onSubmit={handleSearch} className="relative mb-4">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="I'm looking for a top that's hot enough to get my crush's attention..."
                        value={searchQuery.value}
                        onChange={(e) => searchQuery.value = e.target.value}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                    >
                        →
                    </button>
                </form>

                <div className="text-center">
                    <label className="inline-block cursor-pointer text-primary hover:text-primary-light">
                        <span>Or upload an image</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                        />
                    </label>
                    {isUploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
                </div>
            </div>
        </Layout>
    );
};

export default Home; 