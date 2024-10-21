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
                        <h3 className="text-4xl font-bold mb-6 text-left text-primary">Keyword Suggestion</h3>

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
                                </div>
                            </div>
                            <div className="">
                                <h3 className="text-lg font-medium text-gray-900">Fetch Suggested Keywords</h3>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={seedKeywords}
                                        onChange={(e) => setSeedKeywords(e.target.value)}
                                        placeholder="Enter seed keywords, separated by commas"
                                        className="focus:ring-primary outline-none border focus:border-primary block w-full pl-4 pr-12 sm:text-sm py-2 border-gray-300 rounded-md"
                                    />
                                </div>
                                <button
                                    onClick={handleFetchSuggestedKeywords}
                                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Get Suggested Keywords
                                </button>
                            </div>

                            {loading && (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                                </div>
                            )}

                            {suggestedKeywords.length > 0 && (
    <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Suggested Keywords</h3>
        <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-white   rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Keyword</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">Avg. Monthly Searches</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">Competition</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">Low Bid</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">High Bid</th>
                    </tr>
                </thead>
                <tbody>
                    {suggestedKeywords.map((keywordData, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-2 text-sm text-gray-700 font-medium text-lwft">{keywordData.keyword}</td>
                            <td className="px-4 py-2 text-sm text-center">{keywordData.avg_monthly_searches}</td>
                            <td className="px-4 py-2 text-sm text-center">{keywordData.competition}</td>
                            <td className="px-4 py-2 text-sm text-center">${keywordData.low_top_of_page_bid.toFixed(2)}</td>
                            <td className="px-4 py-2 text-sm text-center">${keywordData.high_top_of_page_bid.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
