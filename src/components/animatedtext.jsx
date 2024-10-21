"use client"

import React, { useEffect, useState } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";
import SparklesText from "@/components/magicui/sparkles-text";



const AnimatedText = () => {

    useEffect(() => {
        Aos.init({});
        Aos.refresh();
    }, []);
  return (
    <div className='leading-tight'>

  <SparklesText />
    </div>
  )
}

export default AnimatedText
