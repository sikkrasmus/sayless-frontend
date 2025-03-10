import React from 'react';
import Image from 'next/image';
import { HeroContent } from './HeroContent';
import { HeroImageCard } from './HeroImageCard';

interface HeroSectionProps {
    onSearch: (query: string) => void;
    onImageUpload: (file: File) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onImageUpload }) => {
    return (
        <section className="relative bg-burgundy text-white min-h-[60vh]">
            {/* Background with Dusty Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/design_assets/dusty_overlay_main_section.jpeg"
                    alt="Background Texture"
                    fill
                    className="object-cover opacity-10 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-burgundy mix-blend-multiply" />
            </div>

            <div className="flex flex-col md:flex-row h-full min-h-[60vh] relative z-10">
                {/* Left Content */}
                <div className="flex md:w-1/2 relative z-10 justify-center items-center">
                    <div className="px-6">
                        <HeroContent
                            onSearch={onSearch}
                            onImageUpload={onImageUpload}
                        />
                    </div>
                </div>

                {/* Right Content - Full width background image */}
                <div className="hidden md:block w-full md:w-1/2 relative">
                    <div className="absolute inset-0">
                        <Image
                            src="/design_assets/main_page_image.jpeg"
                            alt="Background"
                            fill
                            className="object-cover"
                            sizes="50vw"
                            priority
                        />
                    </div>
                    <div className="relative z-10 h-full flex items-center justify-center py-16 md:py-24">
                        <HeroImageCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;