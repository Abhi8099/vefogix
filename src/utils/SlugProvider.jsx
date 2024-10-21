// SlugProvider.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MetaTags from '@/components/serverMeta'; // Adjust the import path accordingly
import { BASE_URL } from './api';
import axios from 'axios';

const SlugProvider = () => {
    const pathname = usePathname();
    const slug = pathname.replace(/^\/+|\/+$/g, '') || 'home';
    console.log('Fetching metadata for slug:', slug);
    
    const [metaData, setMetaData] = useState(null);

    useEffect(() => {
        const fetchMetaData = async () => {
            let metaTitle = 'Premium Guest Posting Services for SEO Success';
            let metaDescription = 'Elevate your search engine rankings with our top-tier guest posting services. Quality placements for enhanced visibility and traffic.';
            let metaKeyword = '';
            let index = true;

            try {
                const response = await axios.get(`${BASE_URL}auth/page-details/?slug=${slug}`);
                const data = response.data;
                

                metaTitle = data.meta_title || metaTitle;
                metaDescription = data.meta_description || metaDescription;
                metaKeyword = data.meta_keyword || '';
                index = data.index;
            } catch (error) {
                console.error('Error fetching meta data:', error.message);
            }

            setMetaData({
                metaTitle,
                metaDescription,
                metaKeyword,
                index,
            });
        };

        fetchMetaData();
    }, [slug]);

    // If metaData is not yet fetched, return null or a loading state
    if (!metaData) return null; // Optionally show a loading spinner

    // Render the MetaTags component with the fetched metadata
    return <MetaTags {...metaData} />;
};

export default SlugProvider;
