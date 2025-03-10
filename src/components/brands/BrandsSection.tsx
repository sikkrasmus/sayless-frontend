import React from 'react';

interface Brand {
    id: string;
    name: string;
}

const brands: Brand[] = [
    { id: '1', name: 'Coinbase' },
    { id: '2', name: 'Spotify' },
    { id: '3', name: 'Slack' },
    { id: '4', name: 'Dropbox' },
    { id: '5', name: 'YouTube' },
    { id: '6', name: 'Zoom' },
    { id: '7', name: 'WhatsApp' },
    { id: '8', name: 'Himalayas' },
    { id: '9', name: 'Adobe' },
    { id: '10', name: 'Sonos' },
    { id: '11', name: 'Twitch' },
    { id: '12', name: 'Ghost' },
    { id: '13', name: 'Zapier' },
    { id: '14', name: 'WealthSimple' },
    { id: '15', name: 'Tesla' },
    { id: '16', name: 'Upwork' },
];

const BrandsSection: React.FC = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-8 items-center justify-items-center">
            {brands.map((brand) => (
                <div key={brand.id} className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                    {/* 
            In a real implementation, we would use actual brand logos.
            For this example, we're using text placeholders.
          */}
                    <div className="h-8 flex items-center justify-center">
                        <span className="font-goldman text-sm font-medium text-text-primary">{brand.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BrandsSection; 