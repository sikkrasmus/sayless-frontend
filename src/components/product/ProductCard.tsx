import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    isNew?: boolean;
    isSale?: boolean;
    salePrice?: number;
    className?: string;
}

/**
 * ProductCard component for the Sayless application
 * 
 * @param id - Product ID
 * @param name - Product name
 * @param brand - Product brand
 * @param price - Product price
 * @param imageUrl - Product image URL
 * @param isNew - Whether the product is new
 * @param isSale - Whether the product is on sale
 * @param salePrice - Sale price (if on sale)
 * @param className - Additional CSS classes
 */
const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    brand,
    price,
    imageUrl,
    isNew = false,
    isSale = false,
    salePrice,
    className = '',
}) => {
    // Format price with currency
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate discount percentage if on sale
    const discountPercentage = isSale && salePrice
        ? Math.round(((price - salePrice) / price) * 100)
        : null;

    return (
        <Link href={`/product/${id}`}>
            <article className={`card-product group ${className}`}>
                {/* Product Image */}
                <div className="aspect-product relative overflow-hidden">
                    {/* Image */}
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {isNew && (
                            <span className="badge-primary">New</span>
                        )}

                        {isSale && discountPercentage && (
                            <span className="badge-secondary">-{discountPercentage}%</span>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-4">
                    {/* Brand */}
                    <p className="text-sm text-text-light font-inter uppercase tracking-wider">
                        {brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="font-inter text-base md:text-lg font-medium mt-1 line-clamp-1">
                        {name}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 flex items-center">
                        {isSale && salePrice ? (
                            <>
                                <span className="font-inter font-medium text-burgundy">
                                    {formatPrice(salePrice)}
                                </span>
                                <span className="ml-2 text-text-light text-sm line-through">
                                    {formatPrice(price)}
                                </span>
                            </>
                        ) : (
                            <span className="font-inter font-medium">
                                {formatPrice(price)}
                            </span>
                        )}
                    </div>

                    {/* Quick Action Button (visible on hover/touch) */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="btn-primary w-full text-sm py-1.5">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProductCard; 