
import React, { useState, useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { sampleImages, sampleSounds, ImageAsset, SoundAsset } from '../data/assetLibrary';
import { PhotoIcon, MusicalNoteIcon, CheckIcon, XMarkIcon } from '../components/Icons';
import GcsImage from '../components/GcsImage';

type AssetType = 'images' | 'sounds';

const AssetCard: React.FC<{
    asset: ImageAsset | SoundAsset;
    type: AssetType;
}> = ({ asset, type }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleInsert = () => {
        let embedCode = '';
        if (type === 'images') {
            const imageAsset = asset as ImageAsset;
            embedCode = `[GCS_IMAGE: seed=${imageAsset.imageSeed}]`;
        } else {
            const soundAsset = asset as SoundAsset;
            embedCode = `[GCS_AUDIO: src=${soundAsset.src}]`;
        }

        navigator.clipboard.writeText(embedCode).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="card-base bg-white border border-gray-200 flex flex-col text-center transition-shadow hover:shadow-lg">
            <div className="aspect-square bg-gray-100 flex items-center justify-center p-4 rounded-t-2xl">
                {type === 'images' ? (
                    <GcsImage imageSeed={(asset as ImageAsset).imageSeed} examType="asset" altText={asset.name} />
                ) : (
                    <MusicalNoteIcon className="w-20 h-20 text-gray-400" />
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <p className="font-semibold text-gray-800 flex-grow">{asset.name}</p>
                <button 
                    onClick={handleInsert} 
                    className={`mt-3 btn w-full !rounded-md text-sm ${isCopied ? '!bg-green-600' : 'btn-secondary'}`}
                    disabled={isCopied}
                >
                    {isCopied ? <CheckIcon className="w-5 h-5"/> : 'Insert'}
                </button>
            </div>
        </div>
    );
};

const AssetBrowserPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AssetType>('images');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredImages = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return sampleImages;
        return sampleImages.filter(img => 
            img.name.toLowerCase().includes(query) || 
            img.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    const filteredSounds = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return sampleSounds;
        return sampleSounds.filter(snd => 
            snd.name.toLowerCase().includes(query) || 
            snd.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }, [searchQuery]);
    
    return (
        <div className="max-w-7xl mx-auto pt-12 px-4">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
                    Asset Browser
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Browse and find media assets to insert into your lessons.
                </p>
            </header>

            <div className="sticky top-[90px] bg-gray-50/80 backdrop-blur-md z-40 py-4 mb-8 rounded-lg">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center bg-white p-1 rounded-full border">
                        <button onClick={() => setActiveTab('images')} className={`w-1/2 flex items-center justify-center gap-2 p-2 rounded-full text-base font-semibold transition-colors ${activeTab === 'images' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <PhotoIcon className="w-5 h-5" /> Images
                        </button>
                         <button onClick={() => setActiveTab('sounds')} className={`w-1/2 flex items-center justify-center gap-2 p-2 rounded-full text-base font-semibold transition-colors ${activeTab === 'sounds' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <MusicalNoteIcon className="w-5 h-5" /> Sounds
                        </button>
                    </div>
                    <div className="md:col-span-2 relative">
                         <input
                            type="search"
                            placeholder="Search by name or tag (e.g., 'work', 'kids', 'positive')..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="form-input text-base pl-10 w-full h-full"
                            aria-label="Search assets"
                        />
                         <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <main>
                {activeTab === 'images' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredImages.map(asset => (
                            <AssetCard key={asset.id} asset={asset} type="images" />
                        ))}
                    </div>
                )}
                 {activeTab === 'sounds' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredSounds.map(asset => (
                            <AssetCard key={asset.id} asset={asset} type="sounds" />
                        ))}
                    </div>
                )}

                {(activeTab === 'images' && filteredImages.length === 0) && (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-xl font-semibold">No images found.</p>
                        <p>Try a different search term.</p>
                    </div>
                )}
                 {(activeTab === 'sounds' && filteredSounds.length === 0) && (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-xl font-semibold">No sounds found.</p>
                        <p>Try a different search term.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AssetBrowserPage;
