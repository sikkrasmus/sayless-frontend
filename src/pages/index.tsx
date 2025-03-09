import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { searchQuery, updateSearchQuery, performSearch } from '@/state';
import { countryName } from '@/state/location';

const HomePage: NextPage = () => {
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
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-primary text-white">
                <div className="container-custom py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">SAY LESS.</div>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm">
                            SHIP TO: <span className="font-medium">{countryName.value}</span>
                        </div>
                        <Link href="/chat" className="btn-secondary text-sm">
                            Request a store
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-grow bg-primary text-white py-16 md:py-24">
                <div className="container-custom flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            The new way to shop.
                            <br />
                            Just a lot <span className="text-accent">less</span> work.
                        </h1>
                        <p className="text-lg mb-8">
                            Describe the item or upload a photo to find your perfect match.
                        </p>

                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="input pr-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white/20"
                                    placeholder="I'm looking for a top that's hot enough to get my crush's attention without pissing off my mother..."
                                    value={searchQuery.value}
                                    onChange={(e) => updateSearchQuery(e.target.value)}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                        />
                                        <span className="text-white">📷</span>
                                    </label>
                                    <button
                                        type="submit"
                                        className="text-white"
                                        disabled={!searchQuery.value.trim() && !isUploading}
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="flex space-x-2">
                            <button className="btn-sm bg-white/10 text-white border border-white/20 rounded-full">
                                Under 30€ dresses for...
                            </button>
                            <button className="btn-sm bg-white/10 text-white border border-white/20 rounded-full">
                                Outfits ideas for...
                            </button>
                        </div>
                    </div>

                    <div className="md:w-1/2 md:pl-8">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img
                                src="/images/black-viral-jacket.jpg"
                                alt="Black viral jacket from TikTok"
                                className="w-full h-auto rounded"
                            />
                            <p className="text-center text-gray-800 font-medium mt-2">
                                black viral jacket from tiktok
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="py-12 bg-secondary">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold mb-8 text-center">SHOP 200+ BRANDS</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-8">
                        {/* Brand logos would go here */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-center">
                                <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center">
                                    Brand
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">TRENDING NOW</h2>
                        <Link href="/trending" className="text-primary">
                            →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Trending items would go here */}
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="card">
                                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                                    <div className="w-full h-64 bg-gray-200"></div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium">Trending Item {i + 1}</h3>
                                    <p className="text-sm text-gray-600">Description goes here</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mood Board Section */}
            <section className="py-12 bg-gray-900 text-white">
                <div className="container-custom">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">OUR SOCIALS</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Mood board items would go here */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="aspect-w-1 aspect-h-1 bg-gray-800 rounded">
                                <div className="w-full h-40 bg-gray-800"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Didn't find what you're looking for? Say less.
                    </h2>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-8">
                <div className="container-custom">
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-600">This is only our first release. We're just getting started.</p>
                        <h3 className="text-2xl font-bold mt-2">LET'S STAY IN TOUCH</h3>
                    </div>

                    <div className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="input rounded-r-none flex-grow"
                        />
                        <button className="btn-primary rounded-l-none">→</button>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <div className="text-sm text-gray-600">
                            <Link href="/privacy" className="mr-4">
                                Privacy Policy
                            </Link>
                            <Link href="/contact" className="mr-4">
                                Request a store
                            </Link>
                        </div>
                        <div className="text-sm text-gray-600">2023 SAY LESS OÜ</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage; 