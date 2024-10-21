"use client"
import Image from "next/image";
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePathname, useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import { SiH3 } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { formated_date } from "@/utils/custom-functions";
import { FaChevronLeft, FaFacebookF, FaTwitter, FaLinkedinIn,  } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";
import { format } from 'date-fns'
import styled from "styled-components";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import { setDefaultAutoSelectFamily } from "net";
import toast from "react-hot-toast";



export default function FollowingPointerDemo() {
    const router = useRouter()
    const date = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false };
    const istDate = date.toLocaleString('en-IN', options);
    const pathname = window.location.href;
    

    const [email, setEmail] = useState("")
    const [id, setId] = useState<any>();
    const [suggestedBlogs, setSuggestedBlogs] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false)

    // console.log(id);
    useEffect(() => {
        fetchBlogs()
    }, [])
    const fetchBlogs = async () => {
      setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}blogs/`, {

            });
            // console.log(response);
            const featuredBlogs = response.data.filter((blog:any) => blog.is_featured == true);
            setSuggestedBlogs(featuredBlogs);
        } catch (error) {
            console.log(error);
        }
        finally{
          setLoading(false)
        }
    };
    const [blogs, setBlogs] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Extract the ID from the URL path
                var path = window.location.pathname;
                if(path.endsWith("/")){
                  path = path.slice(0,-1)
                }
                const pathSegments = path.split('/');

                const id = pathSegments[pathSegments.length - 1];


                setId(id);

                // Fetch data from the API
                const response = await axios.get(`${BASE_URL}blogs?slug=${id}`);
                // console.log(response.data);
                setBlogs(response.data);
                // console.log(blogs?.meta_title);

                const blogData = response.data;
                if (blogData) {
                  document.title = blogData.meta_title || 'Default Meta Title';
                  
                  const metaDescription = document.querySelector('meta[name="description"]');
                  if (metaDescription) {
                    metaDescription.setAttribute('content', blogData.meta_description || 'Default Meta Description');
                  } else {
                    // If meta description tag doesn't exist, create one
                    const metaTag = document.createElement('meta');
                    metaTag.name = 'description';
                    metaTag.content = blogData.meta_description || 'Default Meta Description';
                    document.head.appendChild(metaTag);
                  }
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubscribe = async (e:any) => {
      e.preventDefault();
      if (email) {

              try {
                  const response = await axios.post(`${BASE_URL}newsletter/`, { email: email ,is_subscribed: true});
                  toast.success("Added Favourite Site");
                  console.log('Subscribed email:', response.data);
                  return response;
              } catch (error: any) {
                  // console.error('Error ', error.response.data.email );
                  toast.error(error.response.data.email);
              }
      } else {
        console.log('Please enter a valid email address.');
      }
    };

    return (
        <>

            <HeaderComp />

            <main className="container mx-auto px-4 py-8 md:py-16  md:px-12.5  mt-10 h-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3 flex flex-col gap-8">
                        <Link href="/blogs" passHref>
                        <button
            className="bg-primary text-white text-base rounded-lg px-4 py-2 flex gap-2 items-center group hover:bg-blue-500 transition-all duration-300 ease-in-out w-[200px]"
        >
            <FaChevronRight className="group-hover:scale-125 transition-transform duration-300 rotate-180 w-fit" />
            Back To Blogs
        </button>
                        </Link>
{loading ? <Loader/>  :
                        <article className="min-h-screen text-black flex flex-col justify-between">
                        <h1 className="text-[30px] md:text-[36px] lg:text-[48px] font-bold text-primary mb-4 leading-tight">
                          {blogs?.title}
                        </h1>
                        
                        <div className="flex items-center text-gray-600 mb-6">
                          <span className="mr-4">{formated_date(blogs?.post_date)}</span>
                          <span>5 min read</span>
                        </div>
                      
                        <Image
                          src={`https://vefogix.com${blogs?.image}`}
                          alt={blogs?.image_alt || ""}
                          width={1000}
                          height={600}
                          className="object-cover w-full h-[600px] mb-8 rounded-xl"
                        />
                      
                        <div className="max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: blogs?.content }} className="text-lg font-normal" />
                        </div>
                      
                        <div className="mt-8 pt-8 border-t border-gray-200">
                          <h3 className="text-xl font-semibold mb-4">Share this post</h3>
                          <div className="flex space-x-2">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pathname)}`} target="_blank" rel="noopener noreferrer">
                              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] text-white smooth hover:bg-[#1656A1] hover:-translate-y-1 transition-colors duration-300">
                                <FaFacebookF className="text-xl" />
                              </button>
                            </a>
                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pathname)}&text=Check%20this%20out!`} target="_blank" rel="noopener noreferrer">
                              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#000] text-white smooth hover:bg-[#000] hover:-translate-y-1 transition-colors duration-300">
                                <FaXTwitter className="text-xl" />
                              </button>
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pathname)}`} target="_blank" rel="noopener noreferrer">
                              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077B5] text-white smooth hover:bg-[#005582] hover:-translate-y-1 transition-colors duration-300">
                                <FaLinkedinIn className="text-xl" />
                              </button>
                            </a>
                          </div>
                        </div>
                      </article>
}


                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 text-black">
                        <div className="sticky top-32">
                        <div className=" py-6 bg-gray-100 rounded-lg">
                                <h3 className="text-2xl font-semibold mb-4">Subscribe to our newsletter</h3>
                                <p className="text-gray-600 mb-4">Get the latest posts delivered right to your inbox</p>
                                <form className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value) }
                                        className="w-full p-2 border border-gray-300 rounded outline-none"
                                    />
                                    <button className="w-full bg-primary text-white py-2 rounded-lg hover:scale-105 smooth" onClick={handleSubscribe}>Subscribe</button>
                                </form>
                            </div>



                            <h3 className="text-2xl font-bold mb-6 ">Suggested Posts</h3>
                            <div className="space-y-6">
                                {suggestedBlogs?.map((blog: any) => (
                                    <Link key={blog.id} href={`/blogs/${blog.slug}`} className="block group">
                                        <div className="flex items-center hover:scale-105 smooth">
                                            <Image
                                                src={`https://vefogix.com${blog.image}`}
                                                alt={blog.image_alt || ""}
                                                width={100}
                                                height={100}
                                                className="rounded object-cover mr-4"
                                            />
                                            <div>
                                                <h4 className="font-semibold group-hover:text-primary transition-colors">
                                                    {blog.title}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {formated_date(blog.post_date)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>


                        </div>
                    </aside>
                </div>
            </main>

<FooterFour />

        </>

    );
}

const StyledWrapper = styled.div`
menu,ol,ul {
  list-style: disc !important;
}
h1, h2, h3, h4, h5, h6 {
  font-size: revert !important; 
 font-weight: revert !important;
}

`