"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Image from 'next/image';

export default function SimpleSlider() {
  const scrollContainer = useRef(null);
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}home-page/`);
      setBlogs(response.data.featured_blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleScroll = (direction) => {
    const scrollAmount = scrollContainer.current.offsetWidth / 2; // Scroll by half the container width
    scrollContainer.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10 mt-25">
        <h3 className="text-[20px] lg:text-[24px] xl:text-[48px] text-black font-extrabold leading-tight">
          Featured <span className="text-primary">Blogs</span>
        </h3>
        <div className="flex gap-2">
          <div
            onClick={() => handleScroll('left')}
            className="h-11 w-11 rounded-full flex items-center justify-center border border-primary group hover:bg-primary cursor-pointer"
          >
            <GoChevronLeft className="text-3xl text-primary group-hover:text-white" />
          </div>
          <div
            onClick={() => handleScroll('right')}
            className="h-11 w-11 rounded-full flex items-center justify-center border border-primary group hover:bg-primary cursor-pointer"
          >
            <GoChevronRight className="text-3xl text-primary group-hover:text-white" />
          </div>
        </div>
      </div>
      <div
  className="flex flex-row overflow-x-auto gap-6 py-6 scrollbar-hide"
  ref={scrollContainer}
>
  {blogs?.map((blog) => (
    <div
      key={blog.uid}
      className="relative h-[500px] w-[300px] flex-shrink-0 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
    >
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#FF6BDC] to-[#4E3F8C]">
        <Image
          src={`https://vefogix.com${blog?.image}`} 
          alt={blog.image_alt || ""}
          className="w-full h-full"
          fill
        />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {blog.title}
        </h5>
        <p
          className="block font-sans text-base font-light  line-clamp-4 "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <div className="p-6 pt-0 absolute bottom-0">
        <button
          onClick={() => router.push(`/blogs/${blog.slug}`)}
          data-ripple-light="true"
          type="button"
          className="select-none rounded-lg bg-primary text-white py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Read More
        </button>
      </div>
    </div>
  ))}
</div>

      <div className='flex items-center justify-center mt-6 mb-10'>
        <button
        className="flex items-center justify-center w-[266px] font-medium rounded-full text-primary border border-primary py-3 px-4 hover:bg-primary hover:text-white">
<a href="/blogs" className='w-full h-full'>View All</a>
        </button>
      </div>
    </>
  );
}
