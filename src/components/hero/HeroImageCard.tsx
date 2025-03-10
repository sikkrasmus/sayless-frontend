import React from 'react';
import Image from 'next/image';

export const HeroImageCard: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-medium max-w-md">
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
    );
}; 