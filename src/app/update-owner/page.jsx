"use client"
import DefaultLayout from '@/components/PublisherLayouts/DefaultLaout';
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";
import Aos from "aos";
import Cookies from 'js-cookie';
import "aos/dist/aos.css";

const Page = () => {
    useEffect(() => {
        Aos.init({});
    }, []);

    const [uid, setUid] = useState('');
    const [websites, setWebsites] = useState([]);
    const [dynamicUid, setDynamicUid] = useState('');
    const [dynamicUserId, setDynamicUserId] = useState('');
    // console.log(dynamicUserId);
    
    const [data, setData] = useState('');

    const downloadLinkRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const uidFromUrl = params.get('uid');
        if (uidFromUrl) {
            setUid(uidFromUrl);

            const extractedPart = uidFromUrl.split('-').slice(1).join('-');
            setDynamicUid(extractedPart);
        }
    }, []);

    useEffect(() => {
        if (uid) {
            const fetchWebsites = async () => {
                const token = Cookies.get("login_access_token");
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }

                try {
                    const response = await axios.get(`${BASE_URL}publisher-sites/${uid}/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    setWebsites(response.data);
                    // console.log('Fetched websites:', response.data);
                    
                } catch (error) {
                    console.error('Failed to fetch websites:', error.message);
                }
            };

            fetchWebsites();
        }
    }, [uid]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = Cookies.get("login_access_token");
            if (!token) {
                alert('You need to log in first.');
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}profile/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                // console.log(response.data);
                setData(response.data.username);
                setDynamicUserId(response.data.id);
                // console.log(response.data.id);
                
            } catch (error) {
                console.error('Error fetching user:', error.response);
            }
        };
        fetchUsers();
    }, []);

    const handleDownload = () => {
        const filename = `${data}.txt`;
        const content = `Vefogix-verification:${dynamicUid}-${dynamicUserId}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        const currentLink = downloadLinkRef.current;
    
        if (currentLink) {
            currentLink.addEventListener('click', handleDownload);
        }
    
        return () => {
            if (currentLink) {
                currentLink.removeEventListener('click', handleDownload);
            }
        };
    });
    
    return (
        <DefaultLayout>
            <div className='flex flex-col gap-10'>
                <h1 className='text-center text-2xl font-semibold'>Confirm the ownership of your website by following the steps below</h1>
                <div className='flex gap-4 '>
                    <div className='w-[500px] h-[100px] bg-white shadow-lg rounded-lg flex items-center justify-center  px-4' data-aos="fade-right" data-aos-delay="150">
                        <span className=' items-center gap-2'>
                            <TbCircleNumber1Filled className='text-3xl text-blue-500' />
                            <span> Download this file <span className='font-semibold text-blue-500 cursor-pointer' id="downloadLink" ref={downloadLinkRef}>{data}.txt</span> and upload it to your websites root directory </span>
                        </span>

                    </div>
                    <div className='w-[500px] h-[100px] bg-white shadow-lg rounded-lg flex items-center justify-center px-4' data-aos="fade-right" data-aos-delay="300">
                        <h3 className=' items-center justify-center gap-2'>
                            <TbCircleNumber2Filled className='text-3xl text-blue-500' />
                            The file should be accessible via this URL:
                            <span className='font-semibold text-blue-500'> {websites?.website?.url}/{data}.txt</span>
                        </h3>
                    </div>
                    <div className='w-[500px] h-[100px] bg-white shadow-lg rounded-lg flex items-center justify-center px-4' data-aos="fade-right" data-aos-delay="450">
                        <span className=' items-center justify-center gap-2'><TbCircleNumber3Filled className='text-3xl text-blue-500' />
                            After that, click Confirm and our system will check the file in your root directory
                        </span>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='border w-[200px] text-center text-white hover:text-black bg-blue-500 hover:bg-blue-100  p-2 transition-all ease-in-out duration-300 rounded-lg border-blue-500 font-medium'>Confirm</button>
                </div>
            </div>

        </DefaultLayout>
    );
}

export default Page;
