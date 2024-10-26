"use client"
import Image from "next/image";
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { useEffect, useState } from "react";
import MetaTags from "@/components/metadata";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";


export default function FollowingPointerDemo() {
    const router = useRouter();
    const pathname = usePathname()
    const desiredSegment = pathname.replace('/', ''); 
    // console.log(desiredSegment);
    
    
    const [blogs, setBlogs] = useState<any>();
    console.log(blogs);
    
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        fetchBlogs();
    }, [])
    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}blogs/`, {

            });
            // console.log(response);
            setBlogs(response.data)
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    };

    const [index, setIndex] = useState();
    const [meta_title, setMeta_title] = useState();
    const [meta_description, setMeta_description] = useState();
    const [meta_keyword, setMeta_keyword] = useState();
    const [email, setEmail] = useState('');
    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const response = await axios.get(`${BASE_URL}auth/page-details/?slug=${desiredSegment}`);
                // console.log(response.data)
                setMeta_keyword(response.data.meta_keyword);
                setMeta_description(response.data.meta_description);
                setMeta_title(response.data.meta_title);
                setIndex(response.data.index);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMeta();
    }, [desiredSegment]);


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
        {/* <MetaTags
            title={meta_title}
            description={meta_description}
            keywords={meta_keyword}
            index={index}
        /> */}
        
            <HeaderComp />

            <div className='p-10 flex items-center flex-col gap-6 mt-10  '>
                <h1 className="text-center  text-xl lg:text-2xl xl:text-3xl 2xl:text-[35px] text-black font-semibold leading-tight">Vefogix: Blogs and Updates</h1>
                <h3 className="text-primary font-medium text-base md:text-[20px]  text-center md:text-start">Subscribe to learn about new product features, the latest in technology, and updates.</h3>

                <StyledWrapper>
                <div className="input-group md:flex-row flex-col gap-2 md:gap-0">
      <input
        type="email"
        className="input"
        id="Email"
        name="Email"
        placeholder="Your Email Address"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input
        className="button--submit"
        value="Subscribe"
        type="submit"
        onClick={handleSubscribe} // Handle button click
      />
    </div>
                </StyledWrapper>

                {loading ? (
    <div className=" ">
        <Loader />
    </div>
) : (
    <div className='max-w-[1400px] py-5 flex flex-wrap gap-8'>
        {blogs?.map((blog: any) => (
            <div
                key={blog.uid} // Ensure uid is unique
                className="relative mt-8 h-[500px] flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <Image
                        src={`https://vefogix.com${blog?.image}`} // Ensure image URL is valid
                        alt={blog.image_alt || ""}
                        className="w-full h-full"
                        fill
                    />
                </div>
                <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {blog.title}
                    </h5>
                    <p className="text-base font-light line-clamp-4" dangerouslySetInnerHTML={{ __html: blog.content }}>
                    </p>
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
)}



                {/* <Stack spacing={2}>
                    <Pagination count={10} color="primary" />
                </Stack> */}
            </div>


            <FooterFour />
        </>
    );
}


const StyledWrapper = styled.div`
  .input-group {
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
}


.input {
  min-height: 40px;
 max-width: 440px;
  padding: 0 1rem;
  color: #000;
  font-size: 15px;
  border: 1px solid rgba(52, 76, 146,1 );
  border-radius: 6px 0 0 6px;
  background-color: transparent;
}

.button--submit {
  min-height: 40px;
  padding: .5em 1em;
  border: none;
  border-radius: 0 6px 6px 0;
  background-color: rgba(52, 76, 146,1 );
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transition: background-color .3s ease-in-out;
}
 
.button--submit:hover {
  background-color: rgba(52, 76, 146,1 );
  scale: 1.2;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
}
.button--submit:active {
  scale: 0.9;
  border-radius: 6px;
  transition: all 0.1s ease-in-out;
}

.input:focus, .input:focus-visible {
  border-color: rgba(52, 76, 146,1 );
  outline: none;
}

`;
