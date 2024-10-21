"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import toast from 'react-hot-toast';

interface OpenGraphData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  type: string
}

const initialOpenGraphData: OpenGraphData = {
  title: '',
  description: '',
  image: '',
  url: '',
  siteName: '',
  type: 'website'
}

export default function RealtimeOpenGraph() {
  const [ogData, setOgData] = useState<OpenGraphData>(initialOpenGraphData)
  const [generatedMetaTags, setGeneratedMetaTags] = useState<string>('')

  useEffect(() => {
    generateMetaTags()
  }, [ogData])



  const generateMetaTags = () => {
    const metaTags = `
  <meta property="og:title" content="${ogData.title}" />
  <meta property="og:description" content="${ogData.description}" />
  <meta property="og:image" content="${ogData.image}" />
  <meta property="og:url" content="${ogData.url}" />
  <meta property="og:site_name" content="${ogData.siteName}" />
  <meta property="og:type" content="${ogData.type}" />
    `.trim()
    setGeneratedMetaTags(metaTags)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;


    setOgData(prev => ({ ...prev, [name]: value }));
  }
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMetaTags)
    toast.success('Copied to clipboard.', {
      position: "bottom-right"
    })
  }

  return (
<div className=' bg-gradient-to-br from-blue-100 to-purple-100'>
<HeaderComp/>
<div className="min-h-screen p-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Realtime OpenGraph Generator</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className="w-2/3 bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">OpenGraph Properties</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={ogData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={ogData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter page description"
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={ogData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Page URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={ogData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter page URL"
                />
              </div>
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={ogData.siteName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter site name"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  id="type"
                  name="type"
                  value={ogData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="product">Product</option>
                  <option value="profile">Profile</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
  className="w-1/3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
>
  <h2 className="text-xl font-semibold mb-2 text-primary">Preview</h2>
  <div className="border border-gray-200 rounded-md p-4">
    <div className="max-w-[500px] mx-auto">
      {ogData.image && ( 
        <img 
          width={100} 
          height={100} 
          src={ogData.image} 
          alt="OpenGraph preview" 
          className="w-full h-[200px] object-cover rounded-md" 
        />
      )}
      <div className="bg-white p-4">
        <h3 className="text-lg font-semibold text-primary mb-1">
          {ogData.title || 'Your Page Title'}
        </h3>
        <p className="text-gray-800 mb-2">{ogData.description || 'Your page description will appear here.'}</p>
        <p className="text-primary text-sm mb-2">{ogData.url || 'https://example.com'}</p>
      </div>
    </div>
  </div>
</motion.div>

        </div>
        <motion.div
            className="w-full mt-8 bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">Generated Meta Tags</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              {generatedMetaTags}
            </pre>
            <button
              onClick={copyToClipboard}
              className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Copy to Clipboard
            </button>
          </motion.div>
      </div>
    </div>
   <FooterFour/>
</div>
  )
}