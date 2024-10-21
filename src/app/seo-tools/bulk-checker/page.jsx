"use client"

import React, { useState, useTransition } from 'react';
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from '@/components/Footer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/utils/api';
import { Loader2 } from 'lucide-react';

export default function Bulk() {
    const [urls, setUrls] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleUrlChange = (value) => {
        setUrls(value);
    };


    const handleSubmit = async () => {
        startTransition(async () => {
            const token = Cookies.get("login_access_token");
    
            // Split and filter the URLs
            const urlArray = urls.split('\n').map(url => url.trim()).filter(url => url);
    
            // Check if the user has a token and is submitting more than 20 URLs
            if (!token) {
                toast.error("You need to be logged in to search more than 20 URLs.");
                return;
            }
    
            const urlString = urlArray.join(',');
    
            try {
                const response = await axios.post(`${BASE_URL}bulk-da-checker/`, { urls: urlString });
                setResponseData(Object.values(response.data));
                toast.success("Check completed successfully!");
            } catch (error) {
                console.error('Error in bulk check:', error);
                toast.error("An error occurred during the bulk check.");
            }
        });
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <HeaderComp />
            <main className="container mx-auto px-4 py-8 mt-10">
                <section className="mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-6 text-center">DA, PA, Spam Score Checker</h1>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <textarea
                                className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter URLs (one per line)"
                                value={urls}
                                onChange={(e) => handleUrlChange(e.target.value)}
                            />
                        </motion.div>
                        <button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 flex items-center justify-center"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Checking...
                                </>
                            ) : (
                                'Check URLs'
                            )}
                        </button>
                    </div>
                </section>

                {responseData.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-primary">Response Data</h2>
                        <table className="w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    {['URL', 'DA', 'PA', 'Spam Score'].map((header) => (
                                        <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {responseData.map((data, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <td className="px-4 py-2 whitespace-nowrap">{data.url}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{data.DA}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{data.PA}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{data.spam_score}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.section>
                )}
            </main>
            <FooterFour />
        </div>
    );
}