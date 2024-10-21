"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import toast from 'react-hot-toast';
import Image from 'next/image';

// Replace these with your own API keys
const DIFFBOT_API_TOKEN = 'd14b1a743a164eedb13685e715b403b9';
const IMAGGA_API_KEY = 'acc_623019daf1a57ab';
const IMAGGA_API_SECRET = 'f5977b00aa8de6c7769fee8cbbedbf08';
const APIFLASH_ACCESS_KEY = '05fd8c021f124d298bd3c4577d0e48aa';

const dummyContentPatterns = [
    /lorem\s+ipsum/i,
    /dummy\s+text/i,
    /placeholder/i,
];

export default function DummyContentChecker() {
    const [url, setUrl] = useState('');
    const [results, setResults] = useState<any>();
    const [screenshotUrl, setScreenshotUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const checkDummyContent = async () => {
        if (!url) {
            toast.error('Please enter a valid URL.', { position: "bottom-right" });
            return;
        }

        setLoading(true);
        try {
            // 1. Diffbot API - Extract text, sentiment, and images
            const diffbotResponse = await fetch(`https://api.diffbot.com/v3/article?token=${DIFFBOT_API_TOKEN}&url=${url}`);
            if (!diffbotResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const diffbotData = await diffbotResponse.json();
            const article = diffbotData.objects?.[0];
            if (!article) {
                throw new Error('No content found for this URL.');
            }

            const text = article?.text || '';
            const sentiment = article?.sentiment || 'neutral';
            const images = article?.images || [];

            let foundCount = 0;
            for (const pattern of dummyContentPatterns) {
                const matches = text.match(pattern);
                if (matches) {
                    foundCount += matches.length;
                }
            }

            // 2. Imagga API - Check alt text for images
// New part for image metadata and handling more tags
const imageAltTexts = await Promise.all(
    images.map(async (img: any) => {
        const altResponse = await fetch(`https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(img.url)}`, {
            headers: {
                'Authorization': `Basic ${btoa(`${IMAGGA_API_KEY}:${IMAGGA_API_SECRET}`)}`,
            },
        });

        const altData = await altResponse.json();
        
        const tags = altData.result?.tags || [];
        const altText = tags.length > 0 ? tags[0].tag.en : 'No alt text provided';
        const allTags = tags.map((tag: any) => tag.tag.en).join(', '); // Displaying all tags

        return {
            url: img.url,
            alt: altText,
            tags: allTags,  // Include all tags
            width: img.width || 'N/A',
            height: img.height || 'N/A',
            size: img.bytes ? `${(img.bytes / 1024).toFixed(2)} KB` : 'N/A', // Show file size if available
        };
    })
);

// Extend results object
setResults({
    found: foundCount > 0,
    count: foundCount,
    sentiment,
    sentimentScore: article?.sentimentScore,  // Adding sentiment score
    summary: article?.summary || 'No summary available',  // Adding article summary
    author: article?.author || 'Unknown author', // Add author
    images: images.map((img: any, index: number) => ({
        ...img,
        alt: imageAltTexts[index]?.alt || 'No alt text',
        tags: imageAltTexts[index]?.tags,  // Include all tags in the response
        width: imageAltTexts[index]?.width,
        height: imageAltTexts[index]?.height,
        size: imageAltTexts[index]?.size,
    })),
});


            // 3. APIFLASH API - Generate screenshot
            const screenshotResponse = await fetch(
                `https://api.apiflash.com/v1/urltoimage?access_key=${APIFLASH_ACCESS_KEY}&url=${encodeURIComponent(url)}&full_page=true&format=jpeg`
            );
            const screenshotBlob = await screenshotResponse.blob();
            const screenshotUrl = URL.createObjectURL(screenshotBlob);
            setScreenshotUrl(screenshotUrl);

            setResults({
                found: foundCount > 0,
                count: foundCount,
                sentiment,
                images: images.map((img: any, index: number) => ({
                    ...img,
                    alt: imageAltTexts[index]?.alt || 'No alt text',
                })),
            });

            toast.success(`Dummy content check completed. Found: ${foundCount} instances.`, { position: "bottom-right" });
        } catch (error: any) {
            console.error('Error fetching URL:', error);
            toast.error(`Error: ${error.message}`, { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" text-white bg-gradient-to-br from-blue-100 to-purple-100">
            <HeaderComp />
            <div className=" min-h-screen container mx-auto p-8 mt-10 lg:px-25 md:px-12.5 xl:px-50">
                <motion.h1 
                    className="text-4xl font-bold mb-8 text-center text-[#344C92]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Dummy Content & Alt Text Checker
                </motion.h1>
                <motion.div 
                    className="bg-white rounded-lg shadow-lg p-6 mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <input 
                        type="text" 
                        value={url} 
                        onChange={handleInputChange} 
                        placeholder="http://example.com" 
                        className="w-full p-3 rounded border text-gray-800 mb-4" 
                    />
                    <motion.button 
                        className={`bg-[#344C92] text-white py-2 px-6 rounded-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2a3d7a] transition-colors'}`}
                        onClick={checkDummyContent} 
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {loading ? (
                            <motion.div 
                                className="inline-block"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                ⟳
                            </motion.div>
                        ) : 'Check Content'}
                    </motion.button>
                </motion.div>

                {results && (
    <motion.div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-[#344C92]">Results</h2>
        
        {/* Dummy content info */}
        <p className="mb-4">
            {results.found 
                ? `Found ${results.count} instances of dummy content!` 
                : "No dummy content found."}
        </p>

        {/* Display Sentiment Score */}
        <p className="mb-4">
            <strong>Sentiment:</strong> {results.sentiment} (Score: {results.sentimentScore})
        </p>

        {/* Show article summary */}
        <p className="mb-4">
            <strong>Summary:</strong> {results.summary}
        </p>

        {/* Show article author */}
        <p className="mb-4">
            <strong>Author:</strong> {results.author}
        </p>

        {/* Image Information */}
        <h3 className="text-xl font-semibold mb-2">Images and Alt Texts:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.images.map((img: any, index: number) => (
                <motion.div key={index} className="border p-2 rounded">
                    <img src={img.url} alt={img.alt} className="w-full h-auto" />
                    <p className="mt-2"><strong>Alt Text:</strong> {img.alt}</p>
                    <p className="mt-1"><strong>Tags:</strong> {img.tags}</p>
                    <p className="mt-1"><strong>Dimensions:</strong> {img.width}x{img.height}</p>
                    <p className="mt-1"><strong>File Size:</strong> {img.size}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
)}


                {screenshotUrl && (
                    <motion.div 
                        className="bg-white rounded-lg shadow-lg p-6 mb-8 text-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-4 text-[#344C92]">Website Screenshot:</h3>
                        <img src={screenshotUrl} alt="Screenshot" width={800} height={600} className="w-full h-auto border rounded" />
                    </motion.div>
                )}
            </div>
            <FooterFour />
        </div>
    );
}