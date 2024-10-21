"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchMeta } from '@/app/action'
import Head from 'next/head';

const MetaTags = () => {
  const [index, setIndex] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [isInsideBlog, setIsInsideBlog] = useState(false);

  const pathname = usePathname();
  const desiredSegment = pathname.replace(/^\/+|\/+$/g, '') || 'home';

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        // Call the server-side fetchMeta function and pass the slug
        const metaData = await fetchMeta(desiredSegment);

        // Set state based on the fetched metadata
        setMetaTitle(metaData.metaTitle || 'Premium Guest Posting Services for SEO Success');
        setMetaDescription(metaData.metaDescription || 'Elevate your search engine rankings with our top-tier guest posting services. Quality placements for enhanced visibility and traffic.');
        setMetaKeyword(metaData.metaKeywords || '');
        setIndex(metaData.index);
      } catch (error) {
        console.error('Error fetching meta data:', error);
      }
    };

    // Check if the desired segment is a blog detail page
    if (desiredSegment.startsWith('blogs/') && desiredSegment.split('/').length > 2) {
      setIsInsideBlog(true);
    } else {
      setIsInsideBlog(false);
      fetchMetaData();
    }
  }, [desiredSegment]);

  // Don't return meta tags on the blog detail pages
  if (isInsideBlog) {
    return null;
  }

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeyword} />
      <meta name="robots" content={index ? 'index, follow' : 'noindex, nofollow'} />
    </Head>
  );
};

export default MetaTags;
