import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
    currentLocation?: string;
    onLocationChange?: (location: string) => void;
}

/**
 * Header component for the Sayless application
 * 
 * @param currentLocation - Current delivery location
 * @param onLocationChange - Callback when location is changed
 */
const Header: React.FC<HeaderProps> = ({
    currentLocation = 'Estonia',
    onLocationChange,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header sticky top-0 z-50">
            {/* Announcement banner */}
            <div className="hidden md:block bg-beige text-burgundy py-2 px-4 text-center text-sm">
                New In! The 2025 Valentino Spring Line. Search for 1000+ Milan Fashion Week Inspired Items
            </div>

            <div className="container-custom py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/design_assets/logo.svg"
                            alt="SAY LESS."
                            width={143}
                            height={16}
                            className="h-7 w-auto"
                        />
                    </Link>

                    {/* Right side elements */}
                    <div className="flex items-center">
                        {/* Location Selector */}
                        <div className="hidden md:flex items-center">
                            <div className="relative group">
                                <button className="flex items-center text-white hover:text-beige transition-colors py-1">
                                    <span className="text-sm font-medium mr-1">SHIP TO</span>
                                    <span className="font-semibold">{currentLocation}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown (visible on hover) */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    <div className="py-2">
                                        {['Estonia', 'Finland', 'Latvia', 'Lithuania', 'Sweden'].map((location) => (
                                            <button
                                                key={location}
                                                className={`block w-full text-left px-4 py-2 text-sm ${location === currentLocation
                                                    ? 'bg-burgundy/5 text-burgundy font-medium'
                                                    : 'text-text-primary hover:bg-gray-100'
                                                    }`}
                                                onClick={() => onLocationChange && onLocationChange(location)}
                                            >
                                                {location}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Request a store button */}
                        <Link href="/request-store" className="hidden md:block text-sm text-white hover:text-beige transition-colors ml-4 py-1">
                            Request a store
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden header-nav-item ml-4 py-1"
                            onClick={toggleMobileMenu}
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-burgundy-dark animate-slide-down">
                    <div className="container-custom py-4 space-y-4">
                        {/* Mobile Navigation */}
                        <nav className="flex flex-col space-y-3">
                            <Link
                                href="/trending"
                                className="header-nav-item py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Trending
                            </Link>
                            <Link
                                href="/brands"
                                className="header-nav-item py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Brands
                            </Link>
                            <Link
                                href="/moodboard"
                                className="header-nav-item py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Mood Board
                            </Link>
                            <Link
                                href="/request-store"
                                className="header-nav-item py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Request a store
                            </Link>
                        </nav>

                        {/* Mobile Location Selector */}
                        <div className="pt-2 border-t border-white/10">
                            <p className="text-white/70 text-sm mb-2">Ship to:</p>
                            <div className="grid grid-cols-2 gap-2">
                                {['Estonia', 'Finland', 'Latvia', 'Lithuania', 'Sweden'].map((location) => (
                                    <button
                                        key={location}
                                        className={`py-2 px-3 text-sm rounded-lg ${location === currentLocation
                                            ? 'bg-white text-burgundy font-semibold'
                                            : 'bg-burgundy-light/50 text-white hover:bg-burgundy-light'
                                            }`}
                                        onClick={() => {
                                            onLocationChange && onLocationChange(location);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {location}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header; 