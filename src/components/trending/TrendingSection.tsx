import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TrendingItem {
    id: string;
    title: string;
    imageUrl: string;
    link: string;
}

const trendingItems: TrendingItem[] = [
    {
        id: '1',
        title: 'floral pattern outfit for italian mountain villages size 38',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        link: '/search?q=floral+pattern+outfit+italian+mountain'
    },
    {
        id: '2',
        title: 'minimal blue jean jacket for spring in size M',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        link: '/search?q=minimal+blue+jean+jacket+spring'
    },
    {
        id: '3',
        title: 'beach outfit for my upcoming photoshoot in Marbella',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        link: '/search?q=beach+outfit+photoshoot+marbella'
    }
];

const TrendingSection: React.FC = () => {
    return (
        <div className="relative">
            {/* Trending Now Label */}
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 -rotate-90 origin-right">
                <div className="flex items-center space-x-2">
                    <span className="font-goldman text-lg font-bold tracking-wider text-burgundy">TRENDING NOW</span>
                    <div className="w-16 h-px bg-burgundy"></div>
                </div>
            </div>

            {/* Trending Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-12">
                {trendingItems.map((item) => (
                    <Link
                        href={item.link}
                        key={item.id}
                        className="group"
                    >
                        <div className="card-product h-full flex flex-col">
                            <div className="relative aspect-[4/5] w-full">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 bg-white flex-grow">
                                <h3 className="font-inter text-base font-medium text-text-primary line-clamp-2 group-hover:text-burgundy transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            <div className="text-right mt-6">
                <Link
                    href="/trending"
                    className="inline-flex items-center text-burgundy hover:text-burgundy-hover transition-colors"
                >
                    <span className="mr-2">View all trending items</span>
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
                </Link>
            </div>
        </div>
    );
};

export default TrendingSection; 