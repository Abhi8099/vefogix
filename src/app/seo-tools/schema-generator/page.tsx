'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Copy, Download, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";

const schemaTypes = [
  'Article',
  'Book',
  'Course',
  'Event',
  'FAQPage',
  'JobPosting',
  'LocalBusiness',
  'Movie',
  'Organization',
  'Person',
  'Product',
  'Recipe',
  'Restaurant',
  'Review',
  'WebSite',
] as const

type SchemaType = typeof schemaTypes[number]

interface SchemaField {
  name: string
  type: 'text' | 'textarea' | 'array' | 'object'
  fields?: SchemaField[]
}

const schemaFields: Record<SchemaType, SchemaField[]> = {
  Article: [
    { name: 'headline', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'author', type: 'text' },
    { name: 'datePublished', type: 'text' },
    { name: 'image', type: 'text' },
  ],
  Book: [
    { name: 'name', type: 'text' },
    { name: 'author', type: 'text' },
    { name: 'isbn', type: 'text' },
    { name: 'datePublished', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
  Course: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'provider', type: 'text' },
  ],
  Event: [
    { name: 'name', type: 'text' },
    { name: 'startDate', type: 'text' },
    { name: 'endDate', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
  FAQPage: [
    {
      name: 'mainEntity',
      type: 'array',
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'textarea' },
      ],
    },
  ],
  JobPosting: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'hiringOrganization', type: 'text' },
    { name: 'datePosted', type: 'text' },
    { name: 'validThrough', type: 'text' },
    { name: 'jobLocation', type: 'text' },
  ],
  LocalBusiness: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'telephone', type: 'text' },
    { name: 'openingHours', type: 'array', fields: [{ name: 'hours', type: 'text' }] },
    {
      name: 'address',
      type: 'object',
      fields: [
        { name: 'streetAddress', type: 'text' },
        { name: 'addressLocality', type: 'text' },
        { name: 'addressRegion', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'addressCountry', type: 'text' },
      ],
    },
  ],
  Movie: [
    { name: 'name', type: 'text' },
    { name: 'director', type: 'text' },
    { name: 'datePublished', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
  Organization: [
    { name: 'name', type: 'text' },
    { name: 'url', type: 'text' },
    { name: 'logo', type: 'text' },
    {
      name: 'address',
      type: 'object',
      fields: [
        { name: 'streetAddress', type: 'text' },
        { name: 'addressLocality', type: 'text' },
        { name: 'addressRegion', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'addressCountry', type: 'text' },
      ],
    },
  ],
  Person: [
    { name: 'name', type: 'text' },
    { name: 'jobTitle', type: 'text' },
    { name: 'telephone', type: 'text' },
    { name: 'url', type: 'text' },
  ],
  Product: [
    { name: 'name', type: 'text' },
    { name: 'image', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'brand', type: 'text' },
    { name: 'sku', type: 'text' },
    { name: 'mpn', type: 'text' },
    { name: 'gtin', type: 'text' },
    { name: 'gtin8', type: 'text' },
    { name: 'gtin13', type: 'text' },
    { name: 'gtin14', type: 'text' },
    { name: 'isbn', type: 'text' },
    {
      name: 'review',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'reviewRating', type: 'text' },
        { name: 'datePublished', type: 'text' },
        { name: 'reviewBody', type: 'textarea' },
        { name: 'author', type: 'text' },
        { name: 'publisher', type: 'text' },
      ]
    },
    {
      name: 'aggregateRating',
      type: 'object',
      fields: [
        { name: 'ratingValue', type: 'text' },
        { name: 'reviewCount', type: 'text' },
        { name: 'bestRating', type: 'text' },
        { name: 'worstRating', type: 'text' },
      ]
    },

    {
      name: 'offers',
      type: 'object',
      fields: [
        { name: '@type', type: 'text' },
        { name: 'url', type: 'text' },
        { name: 'priceCurrency', type: 'text' },
        { name: 'price', type: 'text' },
        { name: 'priceValidUntil', type: 'text' },
        { name: 'availability', type: 'text' },
      ]
    },
  ],
  Recipe: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'author', type: 'text' },
    { name: 'ingredients', type: 'array', fields: [{ name: 'ingredient', type: 'text' }] },
    { name: 'instructions', type: 'textarea' },
  ],
  Restaurant: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'servesCuisine', type: 'text' },
    { name: 'telephone', type: 'text' },

    {
      name: 'address',
      type: 'object',
      fields: [
        { name: 'streetAddress', type: 'text' },
        { name: 'addressLocality', type: 'text' },
        { name: 'addressRegion', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'addressCountry', type: 'text' },
      ],
    },
  ],
  Review: [
    { name: 'itemReviewed', type: 'text' },
    { name: 'reviewRating', type: 'object', fields: [
      { name: 'ratingValue', type: 'text' },
    ]},
    { name: 'author', type: 'text' },
    { name: 'reviewBody', type: 'textarea' },
  ],
  WebSite: [
    { name: 'name', type: 'text' },
    { name: 'url', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
}

export default function Component() {
  const [schemaType, setSchemaType] = useState<SchemaType>('FAQPage')
  const [schemaData, setSchemaData] = useState<Record<string, any>>({})
  const [generatedSchema, setGeneratedSchema] = useState('')
  const [openFields, setOpenFields] = useState(true)

  useEffect(() => {
    generateSchema()
  }, [schemaType, schemaData])

  const handleInputChange = (name: string, value: string) => {
    setSchemaData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (name: string, index: number, field: string, value: string) => {
    setSchemaData((prev) => ({
      ...prev,
      [name]: prev[name]
        ? prev[name].map((item: any, i: number) => (i === index ? { ...item, [field]: value } : item))
        : [{ [field]: value }],
    }))
  }

  const handleObjectInputChange = (objectName: string, fieldName: string, value: string) => {
    setSchemaData((prev) => ({
      ...prev,
      [objectName]: { ...prev[objectName], [fieldName]: value },
    }))
  }

  const addArrayItem = (name: string) => {
    setSchemaData((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), {}],
    }))
  }

  const removeArrayItem = (name: string, index: number) => {
    setSchemaData((prev) => ({
      ...prev,
      [name]: prev[name].filter((_: any, i: number) => i !== index),
    }))
  }

  const generateSchema = () => {
    let schema: any = {
      '@context': 'https://schema.org',
      '@type': schemaType,
    }

    const processData:any = (data: any) => {
      if (Array.isArray(data)) {
        return data.map(processData)
      } else if (typeof data === 'object' && data !== null) {
        const processed: any = {}
        for (const [key, value] of Object.entries(data)) {
          if (value !== '' && value !== null && value !== undefined) {
            processed[key] = processData(value)
          }
        }
        return processed
      }
      return data
    }

    schema = { ...schema, ...processData(schemaData) }

    if (schemaType === 'FAQPage') {
      schema.mainEntity = (schemaData.mainEntity || []).map((item: any) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }))
    }

    const scriptSchema = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
    setGeneratedSchema(scriptSchema)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSchema)
    toast.success('Copied to clipboard')
  }

  const downloadSchema = () => {
    const blob = new Blob([generatedSchema], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${schemaType.toLowerCase()}-schema.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderField = (field: SchemaField, parentName = '') => {
    const fieldName = parentName ? `${parentName}.${field.name}` : field.name
    const value = parentName ? (schemaData[parentName] && schemaData[parentName][field.name]) : schemaData[field.name]

    switch (field.type) {
      case 'text':
      case 'textarea':
        return (
          <motion.div
            className="mb-4"
            key={fieldName}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm font-semibold mb-1">{field.name}</label>
            {field.type === 'text' ? (
              <input
                type="text"
                placeholder={field.name}
                value={value || ''}
                onChange={(e) => 
                  parentName 
                    ? handleObjectInputChange(parentName, field.name, e.target.value)
                    : handleInputChange(field.name, e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <textarea
                placeholder={field.name}
                value={value || ''}
                onChange={(e) => 
                  parentName
                    ? handleObjectInputChange(parentName, field.name, e.target.value)
                    : handleInputChange(field.name, e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none"
              />
            )}
          </motion.div>
        )
      case 'array':
        return (
          <motion.div
            key={fieldName}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm font-semibold mb-1">{field.name}</label>
            <AnimatePresence>
              {(value || []).map((item: any, index: number) => (
                <motion.div
                  key={`${fieldName}-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2 p-2 border border-gray-200 rounded"
                >
                  {field.fields?.map((subField) => (
                    <div key={`${fieldName}-${index}-${subField.name}`} className="mb-2">
                      <label className="block text-xs font-semibold mb-1">{subField.name}</label>
                      <input
                        type="text"
                        placeholder={subField.name}
                        value={item[subField.name] || ''}
                        onChange={(e) => handleArrayInputChange(field.name, index, subField.name, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded transition-colors focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  ))}
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                    onClick={() => removeArrayItem(field.name, index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              onClick={() => addArrayItem(field.name)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors mt-2"
            >
              Add {field.name}
            </button>
          </motion.div>
        )
      case 'object':
        return (
          <motion.div
            key={fieldName}
            className="mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm font-semibold mb-1">{field.name}</label>
            <div className="p-2 border border-gray-200 rounded">
              {field.fields?.map((subField) => renderField(subField, field.name))}
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  const clearSchema = () => {
    setSchemaData({})
    setGeneratedSchema('')
  }

  return (
    <div className=' bg-gradient-to-br from-blue-100 to-purple-100'>
<HeaderComp/>
<div className='flex justify-center'>
    <div className="min-h-screen w-full 2xl:mx-50 mx-10  p-8 mt-10">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Schema Markup Generator
      </motion.h1>
      <div className="flex gap-8">
        <motion.div
          className="bg-white p-6 rounded shadow-md flex-[5]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-lg font-semibold mb-4">Select Schema Type</label>
          <select
            value={schemaType}
            onChange={(e) => {
              setSchemaType(e.target.value as SchemaType)
              setSchemaData({})
              setGeneratedSchema('')
            }}
            className="w-full p-2 border border-gray-300 rounded mb-4 transition-colors focus:border-blue-500 focus:outline-none"
          >
            {schemaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="mb-4">
            <button
              onClick={() => setOpenFields(!openFields)}
              className="flex items-center justify-between w-full p-2 bg-gray-100 rounded transition-colors hover:bg-gray-200"
            >
              <span className="font-semibold">Fields</span>
              {openFields ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>

          <AnimatePresence>
            {openFields && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='grid grid-cols-2 gap-4'
              >
                {schemaFields[schemaType].map((field) => renderField(field))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded shadow-md w-1/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          
        >
          <label className="block text-lg font-semibold mb-4">Generated Schema</label>
          <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            <code>{generatedSchema}</code>
          </pre>
          <div className="flex justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="bg-blue-500 text-white p-2 rounded transition-colors hover:bg-blue-600"
            >
              <Copy className="inline-block mr-2" /> Copy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadSchema}
              className="bg-green-500 text-white p-2 rounded transition-colors hover:bg-green-600"
            >
              <Download className="inline-block mr-2" /> Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearSchema}
              className="bg-gray-500 text-white p-2 rounded transition-colors hover:bg-gray-600"
            >
              Clear
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
    <FooterFour/>
    </div>
  )
}