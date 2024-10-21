"use client"
import { usePathname } from 'next/navigation';
import React from 'react'

const Canonical = () => {
    const pathname = usePathname();
    const currentUrl = `https://www.vefogix.com${pathname}`;
  return (
    <link rel="canonical" href={currentUrl} />
  )
}

export default Canonical