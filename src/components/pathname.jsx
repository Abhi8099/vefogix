import React from 'react';
import { usePathname } from 'next/navigation';

const Pathname = () => {
    const pathname = usePathname(); // Get the current pathname

    // Function to format the pathname
    const getFormattedPathname = (pathname) => {
        return pathname.replace(/^\/+|\/+$/g, '') || 'home';
    };

    const formattedPathname = getFormattedPathname(pathname); // Format the pathname

    return (
        <div>
            {/* Display the formatted pathname */}
            <p>Formatted Pathname: {formattedPathname}</p>
        </div>
    );
};

export default Pathname;
