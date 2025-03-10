import React from 'react';
import { SearchBar } from '@/components/search';

interface HeroContentProps {
    onSearch: (query: string) => void;
    onImageUpload: (file: File) => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onSearch, onImageUpload }) => {
    return (
        <div className="w-full py-16 md:py-24">
            <h1 className="font-goldman text-4xl md:text-4xl lg:text-5xl font-medium leading-tight">
                The new way to shop.<br />
                Just a lot <span className="text-beige font-extrabold">less</span> work.
            </h1>
            <p className="text-sm md:text-md mb-8">
                Describe the item or upload a photo to find your perfect match.
            </p>

            {/* Search Bar Component - Mobile only */}
            <div className="md:hidden mb-4">
                <SearchBar
                    variant="hero"
                    placeholder="I'm looking for a top that's hot enough to get my crush's attention..."
                    onSearch={onSearch}
                    onImageUpload={onImageUpload}
                />
            </div>
        </div>
    );
}; 