// FadeInSection.js
"use client";
import React from 'react';
import { useInView } from 'react-intersection-observer';

const FadeInSection = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2, // Trigger a bit earlier for smoother experience
    });

    return (
        <div
            ref={ref}
            className={`fade-in-section ${inView ? 'fade-in' : ''}`}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
