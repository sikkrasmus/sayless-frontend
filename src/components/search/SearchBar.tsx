import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface SearchBarProps {
    placeholder?: string;
    initialQuery?: string;
    onSearch?: (query: string) => void;
    onImageUpload?: (file: File) => void;
    variant?: 'default' | 'large' | 'hero';
    className?: string;
    suggestions?: string[];
}

/**
 * SearchBar component for the Sayless application
 * 
 * @param placeholder - Placeholder text for the search input
 * @param initialQuery - Initial search query
 * @param onSearch - Callback function when search is submitted
 * @param onImageUpload - Callback function when an image is uploaded
 * @param variant - Visual variant of the search bar (default, large, or hero)
 * @param className - Additional CSS classes
 * @param suggestions - Search suggestions to display as pills
 */
const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search for products...',
    initialQuery = '',
    onSearch,
    onImageUpload,
    variant = 'default',
    className = '',
    suggestions = ['OOTD ideas for...', 'From brand...', 'Price under...', 'In style...'],
}) => {
    const [query, setQuery] = useState(initialQuery);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    // Determine classes based on variant
    const getInputClasses = () => {
        const baseClasses = 'input-search w-full';

        switch (variant) {
            case 'large':
                return `${baseClasses} py-3 text-lg`;
            case 'hero':
                return `${baseClasses} py-3 pl-12 pr-12 text-text-primary rounded-xl`;
            default:
                return `${baseClasses} bg-white text-text-primary`;
        }
    };

    const getContainerClasses = () => {
        const baseClasses = 'relative';

        switch (variant) {
            case 'large':
                return `${baseClasses} max-w-2xl mx-auto`;
            case 'hero':
                return `${baseClasses} max-w-xl mx-auto`;
            default:
                return baseClasses;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (query.trim()) {
            if (onSearch) {
                onSearch(query);
            } else {
                // Default behavior: navigate to search page
                router.push(`/chat?q=${encodeURIComponent(query)}`);
            }
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);

            if (onImageUpload) {
                onImageUpload(file);
            } else {
                // Default behavior: simulate upload and navigate
                setTimeout(() => {
                    setIsUploading(false);
                    router.push('/chat?image=true');
                }, 1000);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`${getContainerClasses()} ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    {/* Left Icon - Search on desktop, Upload on mobile for hero variant */}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none md:pointer-events-auto">
                        {variant === 'hero' ? (
                            <>
                                {/* Mobile: Camera Icon */}
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="md:hidden flex items-center text-gray-400 hover:text-burgundy transition-colors"
                                    aria-label="Upload photo"
                                >
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
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </button>

                                {/* Desktop: Search Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="hidden md:block h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        )}
                        <span className="sr-only">
                            {variant === 'hero' ? (
                                <>
                                    <span className="md:hidden">Upload photo</span>
                                    <span className="hidden md:inline">Search</span>
                                </>
                            ) : (
                                "Search"
                            )}
                        </span>
                    </span>

                    {/* Search Input */}
                    <input
                        type="text"
                        className={getInputClasses()}
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search"
                    />

                    {/* Submit Button (for large variant) */}
                    {variant === 'large' && (
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-0 flex items-center px-4 bg-burgundy text-white rounded-r-full hover:bg-burgundy-hover transition-colors"
                            aria-label="Submit search"
                        >
                            <span className="hidden sm:block">Search</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 sm:ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Arrow Button (for hero variant) */}
                    {variant === 'hero' && (
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-3 flex items-center justify-center"
                            aria-label="Search"
                        >
                            {/* Circular button with curved return arrow for mobile */}
                            <div className="md:hidden flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shadow-sm">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-black"
                                >
                                    <path
                                        d="M7 16L3 12L7 8"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3 12H16C18 12 19 10 19 8V4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            {/* Regular arrow for desktop */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hidden md:block text-burgundy"
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
                    )}

                    {/* Upload Photo Button (for hero variant on desktop only) */}
                    {variant === 'hero' && (
                        <div className="absolute inset-y-0 right-12 hidden md:flex items-center">
                            <div className="h-full w-px bg-gray-300 mx-2"></div>
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="flex items-center text-gray-500 hover:text-burgundy transition-colors mr-8"
                                aria-label="Upload photo"
                            >
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
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Hidden file input for image upload */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                    />

                    {/* Clear button (shows when there's input) */}
                    {query && !variant.includes('hero') && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                        >
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </form>

            {/* Search Suggestions */}
            {variant === 'hero' && suggestions && suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            className="bg-white/10 hover:bg-white/20 text-white text-sm py-1.5 px-3 rounded-full transition-colors"
                            onClick={() => setQuery(suggestion)}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 