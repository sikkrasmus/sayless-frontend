import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '@/styles/globals.css';
import { locationService } from '@/services/locationService';
import { currentLocation, isDetectingLocation, locationError } from '@/state/location';

export default function App({ Component, pageProps }: AppProps) {
    // Detect user location on app load
    useEffect(() => {
        async function detectUserLocation() {
            try {
                isDetectingLocation.value = true;
                const response = await locationService.detectLocation();
                if (response.success && response.data) {
                    currentLocation.value = response.data;
                }
            } catch (error) {
                locationError.value = 'Failed to detect location';
                console.error('Location detection error:', error);
            } finally {
                isDetectingLocation.value = false;
            }
        }

        detectUserLocation();
    }, []);

    return (
        <>
            <Head>
                <title>Sayless - Conversational Fashion Search</title>
                <meta name="description" content="Discover fashion with natural language and image search" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                {/* Add Google Fonts for Inter and Poppins */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
} 