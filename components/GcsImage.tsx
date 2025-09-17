import React from 'react';
import { PictureIcon } from './Icons';

interface GcsImageProps {
    imageSeed: string;
    examType: string;
    altText: string;
    base64Image?: string | null;
}

const GcsImage: React.FC<GcsImageProps> = ({ imageSeed, examType, altText, base64Image }) => {
    if (base64Image) {
        return (
            <img 
                src={`data:image/png;base64,${base64Image}`} 
                alt={altText} 
                className="w-full h-full object-contain rounded-lg" 
            />
        );
    }

    return (
        <div className="w-full aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 p-4">
            <PictureIcon className="w-12 h-12 mb-2" />
            <span className="font-semibold text-center text-sm">Image Placeholder</span>
            <span className="text-xs text-center text-gray-400 mt-1">({altText})</span>
        </div>
    );
};

export default GcsImage;