import type { NextPage } from 'next';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { searchQuery } from '@/state';
import Header from '@/components/layout/Header';
import { SearchBar } from '@/components/search';
import { TrendingSection } from '@/components/trending';
import { BrandsSection } from '@/components/brands';
import { SocialsSection } from '@/components/moodboard';

const Home: NextPage = () => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (query: string) => {
        if (query.trim()) {
            searchQuery.value = query;
            router.push(`/chat?q=${encodeURIComponent(query)}`);
        }
    };

    const handleImageUpload = (file: File) => {
        if (file) {
            setIsUploading(true);
            // TODO: Implement image upload
            // For now, just simulate a delay
            setTimeout(() => {
                setIsUploading(false);
                router.push('/chat?image=true');
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header currentLocation="Estonia" />

            {/* Hero Section */}
            <section className="relative bg-burgundy text-white">
                {/* Desktop Background with Dusty Overlay */}
                <div className="hidden md:block absolute inset-0 z-0">
                    <Image
                        src="/design_assets/dusty_overlay_main_section.jpeg"
                        alt="Background Texture"
                        fill
                        className="object-cover opacity-40 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-burgundy mix-blend-multiply" />
                </div>

                {/* Mobile Background */}
                <div className="md:hidden absolute inset-0 z-0">
                    <Image
                        src="/design_assets/main_section_product_card_image.jpeg"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-burgundy/40 mix-blend-multiply" />
                </div>

                <div className="container-custom relative z-10 py-16 md:py-24 flex flex-col md:flex-row items-center">
                    {/* Left Content */}
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                        <h1 className="font-goldman text-4xl md:text-5xl lg:text-6xl font-medium mb-4 text-left">
                            New way to shop,<br />
                            Just a lot <span className="text-beige font-bold">less</span><br /> work.
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-left">
                            Describe the item or upload a photo to find your perfect match.
                        </p>

                        {/* Search Bar Component */}
                        <div className="mb-4">
                            <SearchBar
                                variant="hero"
                                placeholder="I'm looking for a top that's hot enough to get my crush's attention..."
                                onSearch={handleSearch}
                                onImageUpload={handleImageUpload}
                            />
                        </div>
                    </div>

                    {/* Right Content - Product Card Image (Desktop Only) */}
                    <div className="hidden md:block w-full md:w-1/2 md:pl-8">
                        <div className="relative max-w-md mx-auto">
                            <div className="bg-white p-4 rounded-xl shadow-medium">
                                <div className="relative aspect-square mb-4">
                                    <Image
                                        src="/design_assets/main_section_product_card_image.jpeg"
                                        alt="Black viral jacket from TikTok"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div className="text-center text-text-primary">
                                    <h3 className="font-goldman text-lg font-bold">black viral jacket from tiktok</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="py-12 bg-background-light">
                <div className="container-custom">
                    <div className="text-center mb-8">
                        <h2 className="font-goldman text-2xl md:text-3xl font-bold mb-2">WE KNOW WHAT YOU WANT</h2>
                        <p className="text-text-secondary">Over 200+ brands trust us</p>
                    </div>

                    <BrandsSection />
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-12">
                <div className="container-custom">
                    <TrendingSection />
                </div>
            </section>

            {/* Socials Section */}
            <section className="py-12 bg-burgundy text-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/4 mb-6 md:mb-0">
                            <h2 className="font-goldman text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">OUR SOCIALS</h2>
                        </div>
                        <div className="w-full md:w-3/4">
                            <SocialsSection />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 bg-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/design_assets/dusty_overlay_main_section.jpeg"
                        alt="Background"
                        fill
                        className="object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply" />
                </div>

                <div className="container-custom relative z-10 text-center">
                    <h2 className="font-goldman text-3xl md:text-4xl font-bold mb-6">
                        Didn't find what you're looking for? <span className="text-gradient bg-gradient-to-r from-white to-beige">Say less.</span>
                    </h2>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-12 bg-background-light">
                <div className="container-custom text-center">
                    <p className="text-text-secondary text-sm mb-2">This is only our first release. We're just getting started.</p>
                    <h2 className="font-goldman text-2xl md:text-3xl font-bold mb-6">LET'S STAY IN TOUCH</h2>

                    <div className="max-w-md mx-auto flex">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="input flex-grow rounded-r-none"
                        />
                        <button className="btn-primary rounded-l-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex justify-center space-x-4 mt-8">
                        <a href="#" className="text-text-secondary hover:text-burgundy">TikTok</a>
                        <a href="#" className="text-text-secondary hover:text-burgundy">Instagram</a>
                    </div>

                    <div className="mt-12 text-text-secondary text-sm">
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="hover:text-burgundy">Privacy Policy</a>
                            <a href="#" className="hover:text-burgundy">Request a store</a>
                        </div>
                        <p className="mt-4">© 2024 SAY LESS OÜ</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 