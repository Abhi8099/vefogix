'use client';

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from '@/components/Footer';
import axios from 'axios';

export default function KeywordDensityChecker() {
    const [websiteURL, setWebsiteURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [oneWordPhrases, setOneWordPhrases] = useState([]);
    const [twoWordPhrases, setTwoWordPhrases] = useState([]);
    const [threeWordPhrases, setThreeWordPhrases] = useState([]);
    const [seedKeywords, setSeedKeywords] = useState('');
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);

    const handleFetchKeywordDensity = async () => {
        if (!websiteURL) {
            console.error('No URL provided');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://onpageinsights.com/api/keyworddensity/', { url: websiteURL });
            setOneWordPhrases(response.data.one_word_phrases || []);
            setTwoWordPhrases(response.data.two_word_phrases || []);
            setThreeWordPhrases(response.data.three_word_phrases || []);
        } catch (error) {
            console.error('Error fetching keyword density:', error);
        } finally {
            setLoading(false);
        }
    };


const handleFetchSuggestedKeywords = async () => {
    // Ensure seedKeywords is defined
    if (!seedKeywords) {
        console.error('No seed keywords provided');
        return;
    }

    setLoading(true); // Set loading state
    try {
        // Make the POST request
        const response = await axios.post('https://onpageinsights.com/api/keyword-suggestions/', {
            website_url: websiteURL, // Make sure to include the website URL here
            seed_keywords: seedKeywords
        });

        // Update state with the suggested keywords
        console.log(response.data);
        
        setSuggestedKeywords(response.data || []); 
    } catch (error) {
        console.error('Error fetching suggested keywords:', error);
        // Optionally: set an error state to show an error message to the user
    } finally {
        setLoading(false); // Reset loading state
    }
};


return (
    <div className='bg-gradient-to-br from-blue-100 to-purple-100'>
        <HeaderComp />
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 mt-10">
            <main>
                <div className="w-full mx-auto py-6 sm:px-6 lg:px-8 lg:px-25 md:px-12.5 xl:px-50">
                    <div className="px-4 py-6 sm:px-0">
                        <h3 className="text-4xl font-bold mb-6 text-left text-primary">Keyword Density Report</h3>

                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="mb-6">
                                <label htmlFor="website-url" className="block text-lg font-medium text-gray-700">
                                    Website URL
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="website-url"
                                        id="website-url"
                                        className="focus:ring-primary border focus:border-primary block w-full pl-4 pr-12 sm:text-sm outline-none border-gray-300 rounded-md py-2"
                                        placeholder="https://example.com"
                                        value={websiteURL}
                                        onChange={(e) => setWebsiteURL(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <button
                                            onClick={handleFetchKeywordDensity}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Search className="h-5 w-5 mr-2" />}
                                            Check
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {loading && (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                                </div>
                            )}

                            {!loading && (oneWordPhrases.length > 0 || twoWordPhrases.length > 0 || threeWordPhrases.length > 0) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ResultsTable title="One-Word Phrases" data={oneWordPhrases} />
                                    <ResultsTable title="Two-Word Phrases" data={twoWordPhrases} />
                                    <ResultsTable title="Three-Word Phrases" data={threeWordPhrases} />
                                </div>
                            )}



                        </div>
                    </div>
                </div>
            </main>
        </div>
        <FooterFour />
    </div>
);
}

function ResultsTable({ title, data }) {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phrase
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Frequency
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Density (%)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.phrase}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{item.frequency}</td>
                                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{item['density(%)']}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
