"use client"
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Space, Input, Select, Checkbox, InputNumber, Form, Popover, Statistic } from 'antd';
import { LuExternalLink } from "react-icons/lu";
import { TbMathMax } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import Highlighter from 'react-highlight-words';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import { SearchOutlined } from '@ant-design/icons';
import Loader from '../common/Loader';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { GoSignIn } from 'react-icons/go';
import millify from 'millify';
import { TbInfoTriangle } from "react-icons/tb";
import type { StatisticProps } from 'antd';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Cookies from 'js-cookie';


const { Option } = Select;

interface WebsiteData {
    website: string;
    category: string[];
    traffic: string;
    dr: string;
    da: string;
    language: string;
    price: string;
}

interface ColumnSearchProps {
    setSelectedKeys: (keys: React.Key[]) => void;
    selectedKeys: React.Key[];
    confirm: () => void;
    clearFilters?: () => void;
}
interface DataType {
    website: {
        uid: string;
        url: string;
        domain: string;
    };
}

export default function Homie() {

    const router = useRouter();

    const [websites, setWebsites] = useState<any[]>([]);
    const [langs, setLangs] = useState<any[]>([]);
    const [selected_LinkType, setSelected_LinkType] = useState<any[]>([]);
    const [selected_Category, setSelected_Category] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        niche: '',
        language: '',
        linkType: '',
        daRange: [0, 100],
        TrafficRange: [0, 100000000000],
        drRange: [0, 100],
        priceRange: [0, 1000],
    });
    const [errors, setErrors] = useState('')

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}common-website-details/`, {

            });
            // console.log(response);

            setLangs(response.data.language);
            setSelected_LinkType(response.data.link_type);
            setSelected_Category(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilterChange = (name: any, value: any) => {


        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value === '' ? '' : value,
        }));

    };
    // console.log(websites);


    const filteredWebsites = websites.filter((website) => {
        const { niche, language, linkType, daRange, TrafficRange, drRange, priceRange } = filters;
        
        return (
            (niche ? website.category_detail.some((cat:any) => cat.uid === niche) : true) &&
            (language ? website.language_detail.uid === language : true) &&
            (linkType ? website.linktype_detail.uid === linkType : true) &&
            (Number(website.website.da) >= daRange[0] && Number(website.website.da) <= daRange[1]) &&
            (Number(website.website.traffic) >= TrafficRange[0] && Number(website.website.traffic) <= TrafficRange[1]) &&
            (Number(website.website.dr) >= drRange[0] && Number(website.website.dr) <= drRange[1]) &&
            (Number(website.content_p_price) >= priceRange[0] && Number(website.content_p_price) <= priceRange[1])
        );
    });
    
    

    
    // console.log(filteredWebsites);




    const handleResetFilters = () => {
        setFilters({
            niche: '',
            language: '',
            linkType: '',
            daRange: [0, 100],
            TrafficRange: [0, 100000000000],
            drRange: [0, 100],
            priceRange: [0, 1000],
        });
        setErrors('');
    };
    const [dataCount, setDataCount] = useState()

    // const fetchWebsites = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}publisher-sites/all/`, {
    //         });
    //         console.log(response);

    //         setWebsites(response.data.results);
    //         setDataCount(response.data.count)
    //         setLoading(false)
    //     } catch (error) {
    //         console.error('Failed to fetch websites:', error);
    //     }
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [loading, setLoading] = useState(true);
const [tableDataCount, setTableCount] = useState()

    const fetchWebsites = async (page = 1, size = 10) => {
        try {
            const response = await axios.get(`${BASE_URL}publisher-sites/all/`, {
                params: { page, page_size: size },
            });
            // console.log(response.data);
            setWebsites(response.data.results);
            setDataCount(response.data.count);
            setTableCount(response.data.results.length)
            
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch websites:', error);
        }
    };

    useEffect(() => {
        fetchWebsites(currentPage, pageSize);
    }, []);

    // const handlePageChange = (page:any) => {
    //     setCurrentPage(page);
    //     fetchWebsites(page, pageSize);
    // };
    const handlePageChange = (page: any) => {
                const token = Cookies.get("login_access_token");

        if (page > 9 && !token) {
            toast.error('Sign in to see more Websites & Blogs', {
                position: "bottom-center",
                icon: <GoSignIn className='text-xl' />,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            localStorage.setItem('selectedMenu', '"all publisher sites"');
            router.push("/all-publisher-sites")
            return;
        }
        else if (page > 10 && token) {
            localStorage.setItem('selectedMenu', '"all publisher sites"');
            router.push("/all-publisher-sites")
            return;
        }
        setCurrentPage(page);
    };

    const handlePageSizeChange = (current: any, size: any) => {
        setPageSize(size);
        setCurrentPage(1);
        fetchWebsites(1, size);
    };


    // const [favorites, setFavorites] = useState([]);


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<any>(null);

    const handleSearch = (value: string) => {
        const filtered = websites.filter((website) =>
            website.website.domain.toLowerCase().includes(value.toLowerCase())
        );
        setWebsites(filtered);
    };


    const handleReset = (clearFilters?: () => void) => {
        if (clearFilters) {
            clearFilters();
        }
        setSearchText('');
        fetchWebsites();
    };

    const handleResetAndSearch = (
        clearFilters: (() => void) | undefined,
        selectedKeys: React.Key[],
        confirm: () => void,
        dataIndex: string
    ) => {
        handleReset(clearFilters);
        // handleSearch(selectedKeys, confirm, dataIndex);          
    };

    const maxlink = websites.map((website) => website.max_link);
    const deliverytime = websites.map((website) => website.delivery_time);
    const websiteLinkTypeTitle = websites.map((website) => website.linktype_detail.title);
            const token = Cookies.get("login_access_token");

    const columns = [
        {
            title: 'Websites',
            dataIndex: 'website',
            key: 'website',

            sorter: (a: any, b: any) => a.website.url.length - b.website.url.length,
            render: (website: any, record: any) => {
                const websiteMaxLink = maxlink[websites.findIndex(w => w.website_id === website.uid)];
                const websitedeliverytime = deliverytime[websites.findIndex(w => w.website_id === website.uid)];
                const websiteLinkTypeLink = websiteLinkTypeTitle[websites.findIndex(w => w.website_id === website.uid)];
                //                 console.log(websiteMaxLink);
                //                 console.log("Current Website UID:", website.uid);
                // console.log("Websites UIDs:", websites.map(w => w.website_id));



                return (
                    <div className="flex flex-col items-start gap-2">
                        <div className='flex gap-2 items-center'>
                            <div className="flex items-center gap-2">
                                <LuExternalLink className='text-blue text-lg' />
                                <div className="website text-sm font-bold text-[#3c5a99] truncate cursor-pointer"
                                    onClick={() => {
                                        const expireTime = new Date().getTime() + 10 * 1000;
                                        const data = {
                                            value: record.website.domain,
                                            expiry: expireTime
                                        };

                                        // Store selected menu and website with expiration
                                        router.push('/all-publisher-sites');
                                        localStorage.setItem('selectedMenu', '"all publisher sites"');
                                        localStorage.setItem('selectedWebsite', JSON.stringify(data));
                                        if (!token) {
                                            toast.error('Sign in to see more Websites & Blogs', {
                                                position: "bottom-center",
                                                icon: <GoSignIn className='text-xl' />,
                                                style: {
                                                    borderRadius: '10px',
                                                    background: '#333',
                                                    color: '#fff',
                                                },
                                            });
                                        }

                                    }}>
                                    {website.domain/*.slice(0, 3)*/}</div>
                            </div>
                            {/* <span className="unhide-url text-[10px] text-[#2c7be5] px-2 rounded hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer bg-[#d5e5fa]">Unhide the URL</span> */}
                        </div>
                        <div className='flex items-center'>
                            <div className="flex items-center gap-2">
                                <TbMathMax className='text-blue text-lg' />
                                <span className="website text-sm text-[#3c5a99]">Max:</span>
                            </div>
                            <span className="unhide-url text-sm text-[#2c7be5]  ">{websiteMaxLink} </span>
                            <span className="unhide-url text-sm text-[#2c7be5] px-2 "> {websiteLinkTypeLink}</span>
                        </div>
                        <div className='flex items-center'>
                            <div className="flex items-center gap-2">
                                <MdAccessTime className='text-blue text-lg' />
                                <span className="website text-sm text-[#3c5a99]">Turnaround Time:</span>
                            </div>
                            <span className="unhide-url text-sm text-[#2c7be5] px-2 ">{websitedeliverytime} days</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Categories',
            dataIndex: 'category_detail',
            key: 'category_detail',
            render: (category_detail: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    {category_detail && category_detail.map((cat: any, i: any) => (
                        <span key={i} className="category-tag bg-[#d5e5fa] rounded px-2 py-1 text-sm text-[#2c7be5]">{cat.title}</span>
                    ))}
                </div>
            )
        },
        {
            title: 'Monthly Traffic',
            dataIndex: ['website', 'traffic'],
            key: 'traffic',
            sorter: (a: any, b: any) => a.website.traffic - b.website.traffic,
            render: (traffic: any) => (
                <>
                    <div className='flex items-center gap-2'>
                        <Image src='/images/logs/google-analytics-icon.svg' alt='Google Analytics Icon' height={20} width={20} />
                        <span className=''>
                            {parseFloat(traffic) > 1000 ? millify(traffic) : "less than 1000"}
                        </span>
                    </div>

                </>
            )
        },

        {
            title: 'Moz DA',
            dataIndex: ['website', 'da'],
            key: 'da',
            sorter: (a: any, b: any) => a.website.da - b.website.da,
            render: (da: any) => (
                <div className='flex items-center gap-2'>
                    <Image src='/images/logs/unnamed (1).png' alt='Moz DA Icon' height={20} width={20} />
                    <span>{da}</span>
                </div>
            )
        },
        {
            title: 'PA',
            dataIndex: ['website', 'pa'],
            key: 'pa',
            sorter: (a: any, b: any) => a.website.pa - b.website.pa,
            render: (da: any) => (
                <div className='flex items-center gap-2'>
                    <Image src='/images/logs/unnamed (1).png' alt='PA Icon' height={20} width={20} />
                    <span>{da}</span>
                </div>
            )
        },
        {
            title: 'Ahrefs DR',
            dataIndex: ['website', 'dr'],
            key: 'dr',
            sorter: (a: any, b: any) => a.website.dr - b.website.dr,
            render: (dr: any) => (
                <div className='flex items-center gap-2'>
                    <Image src='/images/logs/Ahrefs-icon.jpeg' alt='Ahrefs Icon' height={20} width={20} />
                    <span>{dr}</span>
                </div>
            )
        },
        {
            title: 'Language',
            dataIndex: 'language_detail',
            key: 'language_detail',
            render: (website_lang: any) => (
                <div className="flex items-center">
                    <span className="language-flag"></span>
                    {website_lang.title}
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'content_p_price',
            key: 'content_p_price',
            sorter: (a: any, b: any) => a.content_p_price - b.content_p_price,
            render: (content_p_price: any, record: any) => (
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-1'>
                        <button className='bg-[#3c5a99] text-white cursor-pointer px-4 rounded-lg flex-1'
                            onClick={() => {
                                const expireTime = new Date().getTime() + 10 * 1000;
                                const data = {
                                    value: record.website.domain,
                                    expiry: expireTime
                                };

                                // Store selected menu and website with expiration
                                router.push('/all-publisher-sites');
                                localStorage.setItem('selectedMenu', '"all publisher sites"');
                                localStorage.setItem('selectedWebsite', JSON.stringify(data));
                                        if (!token) {
                                            toast.error('Sign in to see more Websites & Blogs', {
                                                position: "bottom-center",
                                                icon: <GoSignIn className='text-xl' />,
                                                style: {
                                                    borderRadius: '10px',
                                                    background: '#333',
                                                    color: '#fff',
                                                },
                                            });
                                        }
                            }}>BuyPost</button>

                        <Button
                            onClick={() => {
                                const expireTime = new Date().getTime() + 10 * 1000;
                                const data = {
                                    value: record.website.domain,
                                    expiry: expireTime
                                };

                                // Store selected menu and website with expiration
                                router.push('/all-publisher-sites');
                                localStorage.setItem('selectedMenu', '"all publisher sites"');
                                localStorage.setItem('selectedWebsite', JSON.stringify(data));
                                        if (!token) {
                                            toast.error('Sign in to see more Websites & Blogs', {
                                                position: "bottom-center",
                                                icon: <GoSignIn className='text-xl' />,
                                                style: {
                                                    borderRadius: '10px',
                                                    background: '#333',
                                                    color: '#fff',
                                                },
                                            });
                                        }
                            }} className='bg-primary text-white font-semibold text-base flex-1'>${content_p_price}</Button>
                    </div>
                    <Button className="details-button font-semibold hover:shadow-lg transition ease-in-out duration-300 hover:scale-110"
                        onClick={() => {
                            const expireTime = new Date().getTime() + 10 * 1000;
                            const data = {
                                value: record.website.domain,
                                expiry: expireTime
                            };

                            // Store selected menu and website with expiration
                            router.push('/all-publisher-sites');
                            localStorage.setItem('selectedMenu', '"all publisher sites"');
                            localStorage.setItem('selectedWebsite', JSON.stringify(data));
                                        if (!token) {
                                            toast.error('Sign in to see more Websites & Blogs', {
                                                position: "bottom-center",
                                                icon: <GoSignIn className='text-xl' />,
                                                style: {
                                                    borderRadius: '10px',
                                                    background: '#333',
                                                    color: '#fff',
                                                },
                                            });
                                        }
                        }}>View Details</Button>

                </div>

            )
        },
    ];



    // const [loading, setLoading] = useState<boolean>(true);
    // const initialPageSize = 5;
    // const [pageSize, setPageSize] = useState(initialPageSize);

    // const handleShowSizeChange = (current: any, size: any) => {
    //     setPageSize(size);
    // };

    const cursorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // console.log('cursorRef:', cursorRef.current);
        const handleMouseEnter = () => {
            gsap.to(cursorRef.current, {
                scale: 4,
                backgroundColor: "rgba(87, 80, 241,0.2)",
                duration: 0.3,
                ease: 'power1.inOut',
            });
        };

        const handleMouseLeave = () => {
            // console.log('Mouse left card container');
            gsap.to(cursorRef.current, {
                scale: 0,
                backgroundColor: "#f5f5f5",
                duration: 0.3,
                ease: 'power1.inOut',
            });
        };

        const handleMouseMove = (e: any) => {

            // console.log('Mouse move:', e.clientX, e.clientY);
            gsap.set(cursorRef.current, { x: e.clientX, y: e.clientY }); // set initial position
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power1.out',
            });
        };

        const cardContainer = document.querySelector('.faq_section');
        if (cardContainer) {
            cardContainer.addEventListener('mouseenter', handleMouseEnter);
            cardContainer.addEventListener('mouseleave', handleMouseLeave);
            cardContainer.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (cardContainer) {
                cardContainer.removeEventListener('mouseenter', handleMouseEnter);
                cardContainer.removeEventListener('mouseleave', handleMouseLeave);
                cardContainer.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    const [startCount, setStartCount] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,  // Only trigger once when it enters the viewport
        onChange: (inView) => {
            if (inView) {
                setStartCount(true);
            }
        },
    });

    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} separator="," start={startCount ? 0 : undefined} />
    );


    return (

        <>
            <Head>
                <title>GuestPostSale</title>
                <meta name="description" content="Buy and sell guest posts easily" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container sm:w-full w-[400px] py-5 faq_section  ">
                <div ref={cursorRef} className="cur__sor z-50">
                </div>
                <main className="mb-10 w-full">
                    <div className="filter-section mb-5 p-5 bg-primary/[.07] rounded-lg ">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 special-effect">

                            <div className='flex flex-col gap-2'>
                                <span>Category</span>
                                <Select
                                    showSearch
                                    placeholder="Category"
                                    onChange={(value) => handleFilterChange('niche', value)}
                                    value={filters.niche}
                                    className="w-full"
                                    optionFilterProp="children" // Filters options based on their text
                                    filterOption={(input, option) =>
                                        (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <Option value="">All</Option>
                                    {selected_Category.map((category: any) => (
                                        <Option key={category.uid} value={category.uid}>
                                            {category.title}
                                        </Option>
                                    ))}
                                </Select>
                            </div>


                            <div className=' flex flex-col gap-2'>
                                <span>Language</span>
                                <Select placeholder="Language"
                                    onChange={(value) => handleFilterChange('language', value)}
                                    value={filters.language}
                                    className="w-full">
                                    <Option value="">All</Option>
                                    {langs.map((lang: any) => (
                                        <Option key={lang.uid} value={lang.uid}>{lang.title}</Option>
                                    ))}
                                </Select>
                            </div>

                            <div className=' flex flex-col gap-2'>
                                <span>Link Type</span>
                                <Select placeholder="Link Type"
                                    onChange={(value) => handleFilterChange('linkType', value)}
                                    value={filters.linkType}
                                    className="w-full">
                                    <Option value="">All</Option>
                                    {selected_LinkType.map((linkType: any) => (
                                        <Option key={linkType.uid} value={linkType.uid}>{linkType.title}</Option>
                                    ))}
                                </Select>
                            </div>

                            <div className=' flex flex-col gap-2'>
                                <span>DA Min</span>
                                <InputNumber
                                    type='number'
                                    placeholder="DA Min"
                                    min={0}
                                    max={100}
                                    onChange={(value) => {
                                        handleFilterChange('daRange', [value, filters.daRange[1]]);
                                    }}
                                    value={filters.daRange[0]}
                                    className="w-full"
                                />
                                {errors && <span className="text-red-500">{errors}</span>}
                            </div>

                            <div className=' flex flex-col gap-2'>
                                <span>DA Max</span>
                                <InputNumber
                                    placeholder="DA Max"
                                    min={0}
                                    max={100}
                                    onChange={(value) => handleFilterChange('daRange', [filters.daRange[0], value])}
                                    value={filters.daRange[1]}
                                    className="w-full"
                                />
                            </div>
                            <div className=' flex flex-col gap-2 hidden lg:block '>
                                <span>Reset</span>
                                <Button onClick={handleResetFilters} className='bg-primary text-white w-full hover:shadow-lg transition ease-in-out duration-300 '>Reset</Button>

                            </div>

                            <div className=' flex flex-col gap-2'>
                                <span>Traffic Min</span>
                                <InputNumber
                                    placeholder="Traffic Min"
                                    min={0}
                                    onChange={(value) => handleFilterChange('TrafficRange', [value, filters.TrafficRange[1]])}
                                    value={filters.TrafficRange[0]}
                                    className="w-full"
                                />
                            </div>

                            <div className=' flex flex-col gap-2'>
                                <span>Traffic Max</span>
                                <InputNumber
                                    placeholder="Traffic Max"
                                    min={0}
                                    onChange={(value) => handleFilterChange('TrafficRange', [filters.TrafficRange[0], value])}
                                    value={filters.TrafficRange[1]}
                                    className="w-full"
                                />
                            </div>

                            <div className=' flex flex-col gap-2'>
                                <span>DR Min</span>
                                <InputNumber
                                    placeholder="DR Min"
                                    min={0}
                                    max={100}
                                    onChange={(value) => handleFilterChange('drRange', [value, filters.drRange[1]])}
                                    value={filters.drRange[0]}
                                    className="w-full"
                                />
                            </div>
                            <div className=' flex flex-col gap-2'>
                                <span>DR Max</span>
                                <InputNumber
                                    placeholder="DR Max"
                                    min={0}
                                    max={100}
                                    onChange={(value) => handleFilterChange('drRange', [filters.drRange[0], value])}
                                    value={filters.drRange[1]}
                                    className="w-full"
                                />
                            </div>
                            <div className=' flex flex-col gap-2'>
                                <span>Price Min</span>
                                <InputNumber
                                    placeholder="Price Min"
                                    min={0}
                                    max={1000}
                                    onChange={(value) => handleFilterChange('priceRange', [value, filters.priceRange[1]])}
                                    value={filters.priceRange[0]}
                                    className="w-full"
                                />
                            </div>
                            <div className=' flex flex-col gap-2'>
                                <span>Price Max</span>
                                <InputNumber
                                    placeholder="Price Max"
                                    min={0}
                                    max={1000}
                                    onChange={(value) => handleFilterChange('priceRange', [filters.priceRange[0], value])}
                                    value={filters.priceRange[1]}
                                    className="w-full"
                                />
                            </div>
                            <div className=' flex flex-col gap-2 lg:hidden md:block sm:block'>
                                <span>Reset</span>
                                <Button onClick={handleResetFilters} className='bg-blue-500 text-white w-full hover:shadow-lg transition ease-in-out duration-300 '>Reset</Button>

                            </div>


                        </div>
                        <div className="mt-4 flex justify-end gap-4">
                            {/* <Button type="primary" className='bg-blue' >Search</Button> */}
                        </div>
                    </div>


                    <div className="table-container shadow-lg p-5 2xl:border-[40px] border-black rounded-t-3xl  2xl:mx-30  ">

                    <h2 className="text-center text-xl mb-4 flex items-center justify-center gap-3 md:flex-row flex-col">
                            {/* <div ref={ref}>
                                <Statistic value={dataCount} formatter={formatter} />
                            </div> */}
                            {dataCount} Websites & Blogs That Accept Guest Posts
                            {!token &&
                                <Popover
                                    title="Sign in to access all websites.">
                                    <TbInfoTriangle className='text-red ' />
                                </Popover>
                            }
                        </h2>
                        <div className='flex gap-2 items-center h-full justify-end  '>
                            <Input
                                ref={searchInput}
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                                style={{ width: 300, marginBottom: 8, display: 'block', color: 'blue' }}
                            />
                            <div className='items-center flex gap-2 pb-2 '>
                                <Button className='bg-primary text-white' onClick={() => handleReset()} style={{ width: 90 }}>
                                    Clear
                                </Button>
                            </div>
                        </div>
                        <div className='min-h-[55vh]'>
                        <Table
                            columns={columns}
                            dataSource={filteredWebsites}
                            pagination={{
                                current: currentPage,
                                pageSize: 5,
                                total: filteredWebsites.length > 0 ? filteredWebsites.length : 0,
                                showSizeChanger: false,
                                onChange: handlePageChange,
                                onShowSizeChange: handlePageSizeChange,
                                showQuickJumper: true,
                            }}
                            scroll={{ x: 'max-content' }}
                            rowKey="website_id"
                            loading={loading}
                            locale={{
                                emptyText: (
                                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                        Up to 50 websites shown. Sign in to access the full list of {dataCount} and use more filters.
                                    </div>
                                )
                            }}
                        /></div>
                    </div>
                    <Image 
src={"/images/new/Group 1000003895.svg"} 
alt='' 
width={500} 
height={500} 
className='h-full w-full hidden 2xl:block'
/>
                </main>
            </div>





        </>
    );
}