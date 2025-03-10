import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SocialPost {
    id: string;
    type: 'image' | 'moodboard';
    imageUrl: string;
    caption?: string;
    link: string;
}

const socialPosts: SocialPost[] = [
    {
        id: '1',
        type: 'image',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        caption: "This sweater is so soft! Not only is it cozy, but it's also super cute. I can't wait to style it with my favorite jeans!",
        link: '/product/sweater-1'
    },
    {
        id: '2',
        type: 'moodboard',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        caption: 'mood board',
        link: '/moodboard/winter-style'
    },
    {
        id: '3',
        type: 'image',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        caption: "This sweater is so soft! Not only is it cozy, but it's also super cute. I can't wait to style it with my favorite jeans!",
        link: '/product/sweater-2'
    },
    {
        id: '4',
        type: 'moodboard',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        caption: 'mood board',
        link: '/moodboard/spring-style'
    },
    {
        id: '5',
        type: 'image',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        caption: "This sweater is so soft! Not only is it cozy, but it's also super cute. I can't wait to style it with my favorite jeans!",
        link: '/product/sweater-3'
    },
    {
        id: '6',
        type: 'moodboard',
        imageUrl: '/design_assets/main_section_product_card_image.jpeg',
        caption: 'mood board',
        link: '/moodboard/summer-style'
    }
];

const SocialsSection: React.FC = () => {
    return (
        <div className="relative">
            {/* Our Socials Label */}
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 rotate-90 origin-left">
                <div className="flex items-center space-x-2">
                    <div className="w-16 h-px bg-white"></div>
                    <span className="font-goldman text-lg font-bold tracking-wider text-white">OUR SOCIALS</span>
                </div>
            </div>

            {/* Social Posts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pr-12">
                {socialPosts.map((post) => (
                    <Link
                        href={post.link}
                        key={post.id}
                        className="group"
                    >
                        <div className="card-hover bg-burgundy-dark rounded-lg overflow-hidden">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.caption || 'Social media post'}
                                    fill
                                    className="object-cover"
                                />

                                {/* Caption Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                    <p className="text-white text-xs line-clamp-3">
                                        {post.caption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-8">
                <Link
                    href="/moodboard"
                    className="btn-beige"
                >
                    View all mood boards
                </Link>
            </div>
        </div>
    );
};

export default SocialsSection; 