import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function Layout({
    children,
    title = 'Sayless - Conversational Fashion Search',
    description = 'Discover fashion with natural language and image search',
}: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        SAY LESS.
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Link href="/chat" className="text-gray-600 hover:text-primary">
                            Chat
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Sayless. All rights reserved.
                </div>
            </footer>
        </div>
    );
} 