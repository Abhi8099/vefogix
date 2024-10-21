// servermeta.tsx
import React from 'react';

interface MetaTagsProps {
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  index: boolean;
}

export default function MetaTags({ metaTitle, metaDescription, metaKeyword, index }: MetaTagsProps) {
  const isInsideBlog = metaTitle.startsWith('blogs/') && metaTitle.split('/').length > 2; // Adjust this logic based on your use case.

  if (isInsideBlog) {
    return null;
  }

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeyword} />
      <meta name="robots" content={index ? "index, follow" : "noindex, nofollow"} />
    </>
  );
}
