"use client";
import Image from 'next/image';
import React, { useRef } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const CardSlider = () => {
    const scrollContainer = useRef(null);

    const scrollLeft = () => {
        scrollContainer.current.scrollBy({
            top: 0,
            left: -700, // Adjust the scroll distance
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        scrollContainer.current.scrollBy({
            top: 0,
            left: 700, // Adjust the scroll distance
            behavior: 'smooth',
        });
    };

    return (
        <div className='flex flex-col my-[65px] w-full xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px]'>
            {/* Header Section */}
            <div className="flex justify-between md:flex-row flex-col ">
                <div className="flex flex-col flex-1">
                    <h3 className="md:text-left text-[20px] lg:text-[24px] xl:text-[48px] text-black font-extrabold leading-tight text-center  ">
                        Our Memoir Of  <span className="text-primary">Excellence</span>
                    </h3>
                    <h3 className="md:text-start text-center text-[16px] text-black my-[29px] leading-tight">
                        Every business deserves to have the best SEO in action. Keeping this in mind, our experts wrapped as a backlink-building agency, have been offering off-page success consistently. Have a look at our untold stories that can be your biggest reason for trusting us.
                    </h3>
                </div>
                <div className="flex gap-2 flex-1 items-center justify-center md:items-end md:justify-end">
                    <div
                        onClick={scrollLeft}
                        className="h-11 w-11 rounded-full flex items-center justify-center border-1 border-primary group hover:bg-primary smooth cursor-pointer"
                    >
                        <GoChevronLeft className="text-3xl text-primary group-hover:text-white smooth" />
                    </div>
                    <div
                        onClick={scrollRight}
                        className="h-11 w-11 rounded-full flex items-center justify-center border-1 border-primary group hover:bg-primary smooth cursor-pointer"
                    >
                        <GoChevronRight className="text-3xl text-primary group-hover:text-white smooth" />
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div
                ref={scrollContainer}
                className="flex overflow-x-auto scroll-smooth gap-6 mt-6 pb-10 px-1 scrollbar-hide "
            >
                {/* Card 1 */}
                <div className="w-[300px] md:w-[468px] flex-shrink-0 bg-white text-black rounded-lg shadow-lg flex flex-col group">
                    <Image src={"/images/new/Group 1000003860.svg"} alt='' width={500} height={500} />
                    <div className='fle flex-col gap-2 p-4'>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-primary">15+ Years Of Experience</h4>
                        <p className="text-gray-600">
                            Our team of digital marketers carry an invaluable experience of providing quality within the deadlines. Their experience and expertise have been already proven as a benchmark in the digital marketing industry.
                        </p>
                    </div>
                </div>
                <div className="w-[300px] md:w-[468px] flex-shrink-0 bg-white text-black rounded-lg shadow-lg flex flex-col group">
                    <Image src={"/images/new/Group 1000003873.svg"} alt='' width={500} height={500} />
                    <div className='fle flex-col gap-2 p-4'>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-primary">3000+ Number of Projects Delivered</h4>
                        <p className="text-gray-600">
                            By now, we have delivered numerous quality guest posts and backlinks, regardless of the niche. This shows the perfection we possess to balance the bandwidth without compromising on quality.
                        </p>
                    </div>
                </div>
                <div className="w-[300px] md:w-[468px] flex-shrink-0 bg-white text-black rounded-lg shadow-lg flex flex-col group">
                    <Image src={"/images/new/Group 1000003869.svg"} alt='' width={500} height={500} />
                    <div className='fle flex-col gap-2 p-4'>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-primary">500+ Number of Happy Clients</h4>
                        <p className="text-gray-600">
                            With our sincerity and creativity, we have expanded our family to [same stats] loyal clients. Currently, we are celebrating [stat]% of customer retention, as the result of hard work laid by our professionals.
                        </p>
                    </div>
                </div>
                <div className="w-[300px] md:w-[468px] flex-shrink-0 bg-white text-black rounded-lg shadow-lg flex flex-col group">
                    <Image src={"/images/new/Group 1000003865.svg"} alt='' width={500} height={500} />
                    <div className='fle flex-col gap-2 p-4'>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-primary">95 Number Of Digital Marketers</h4>
                        <p className="text-gray-600">
                            Our experienced and expert team members have extensive knowledge about various aspects of the digital marketing industry. Their collaborative expertise ensures that we remain at the forefront of link-building and guest-posting strategies.
                        </p>
                    </div>
                </div>
                <div className="w-[300px] md:w-[468px] flex-shrink-0 bg-white text-black rounded-lg shadow-lg flex flex-col group">
                    <Image src={"/images/new/Group 1000003872.svg"} alt='' width={500} height={500} />
                    <div className='fle flex-col gap-2 p-4'>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-primary">12 Times We Ranked At SERPs</h4>
                        <p className="text-gray-600">
                            We&apos;ve achieved top rankings on SERPs 12 times, exemplifying our ability to craft content and strategies that drive strong SEO results.
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CardSlider;
