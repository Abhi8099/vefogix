'use server';

import { JSDOM } from 'jsdom';
import { BASE_URL } from "@/utils/api";
import he from 'he';

export const fetchMeta = async (slug: string) => {
  try {
    // Remove leading and trailing slashes, but keep internal slashes
    const formattedSlug = slug.replace(/^\/+|\/+$/g, '') || 'home';
    
    // console.log('Fetching metadata for slug:', formattedSlug); 

    const res = await fetch(`${BASE_URL}auth/page-details/?slug=${formattedSlug}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      // console.log('Received JSON data:', data); // Debug log
      return data;
    } else {
      const htmlText = await res.text();
      // console.log('Received HTML content:', htmlText); // Debug log
      const dom = new JSDOM(htmlText);
      const document = dom.window.document;

      const responseInfo = document.querySelector('.response-info pre');
      if (responseInfo) {
        const rawText = responseInfo.textContent;
        const decodedText = he.decode(rawText || '');
        const jsonString = decodedText.match(/\{[\s\S]*?\}/)?.[0];

        if (jsonString) {
          const jsonData = JSON.parse(jsonString);
          // console.log('Parsed JSON data:', jsonData); // Debug log
          return {
            metaTitle: jsonData.meta_title || 'No Title',
            metaDescription: jsonData.meta_description || 'No Description',
            metaKeywords: jsonData.meta_keyword || 'No Keywords',
            index: jsonData.index || false,
          };
        }
      }

      // console.log('Returning default metadata'); // Debug log
      return { 
        metaTitle: 'No Title', 
        metaDescription: 'No Description', 
        metaKeywords: 'No Keywords',
        index: false
      };
    }
  } catch (error) {
    console.error("Error fetching meta:", error);
    throw error;
  }
};