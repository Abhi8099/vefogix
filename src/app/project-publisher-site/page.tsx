"use client"
import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout';
import { FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Table, Space, Input, Select, Drawer, Popover, Form, Radio, Modal } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { LuExternalLink } from "react-icons/lu";
import { TbMathMax } from "react-icons/tb";
import { MdAccessTime, MdOutlineArticle } from "react-icons/md";
import Highlighter from 'react-highlight-words';
import Image from 'next/image';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import { SearchOutlined } from '@ant-design/icons';
import { FaUserCheck } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { useRecord } from '@/helpers/RecordContext';
import { BsCartCheckFill, BsCurrencyDollar } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { LinkPreview } from '@/components/ui/link-preview';
import millify from 'millify';
import { PiHandshakeFill } from "react-icons/pi";
import Cookies from 'js-cookie';
import styled from "styled-components";


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

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const showDrawer = (record: any) => {
        setSelectedRecord(record);
        setOpen(true);
    };

    const onClose:any = () => {
        setOpen(false);
        setIsModalOpen(false);
        // setSelectedRecord(null);
    };
    const { selectedRecord, setSelectedRecord } = useRecord();
    console.log(selectedRecord);

    const [websites, setWebsites] = useState<any[]>([]);
    const [langs, setLangs] = useState<any[]>([]);
    const [selected_LinkType, setSelected_LinkType] = useState<any[]>([]);
    const [selected_Category, setSelected_Category] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        niche: '',
        language: '',
        linkType: '',
        daRange: [0, 100],
        paRange: [0, 100],
        drRange: [0, 100],
        priceRange: [0, 1000],
    });
    const [errors, setErrors] = useState('')

    useEffect(() => {
        fetchWebsites();
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


    const filteredWebsites = websites.filter((website) => {
        const { niche, language, linkType, daRange, paRange, drRange, priceRange } = filters;
        return (
            (niche ? website.category_detail.some((cat: any) => cat.uid === niche) : true) &&
            (language ? website.language_detail.uid === language : true) &&
            (linkType ? website.linktype_detail.uid === linkType : true) &&
            (website.website.da >= daRange[0] && website.website.da <= daRange[1]) &&
            (website.website.pa >= paRange[0] && website.website.pa <= paRange[1]) &&
            (website.website.dr >= drRange[0] && website.website.dr <= drRange[1]) &&
            (website.content_p_price >= priceRange[0] && website.content_p_price <= priceRange[1])
        );
    });
    // console.log(filteredWebsites);



    const handleResetFilters = () => {
        setFilters({
            niche: '',
            language: '',
            linkType: '',
            daRange: [0, 100],
            paRange: [0, 100],
            drRange: [0, 100],
            priceRange: [0, 1000],
        });
        setErrors('');
    };

    // const fetchWebsites = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}project-publishers/${selectedRecord.website.uid}`, {
    //         });
    //         console.log(response);

    //         setWebsites(response.data);
    //     } catch (error) {
    //         console.error('Failed to fetch websites:', error);
    //     }
    // };
    const fetchWebsites = async () => {
        try {
            const selectedMenu = localStorage.getItem('selectedMenu');
            let endpoint;

            if (selectedMenu === '"all publisher sites"') {
                endpoint = `${BASE_URL}project-publishers/${selectedRecord.website_id}`;
            }
            else if (selectedMenu === '"verified sites"') {
                endpoint = `${BASE_URL}project-publishers/${selectedRecord.website_id}`;
            }
            else if (selectedMenu === '"favourite sites"') {
                endpoint = `${BASE_URL}project-publishers/${selectedRecord.published_sites.website.uid}`;
            }
            else if (selectedMenu === '"blacklisted sites"') {
                endpoint = `${BASE_URL}project-publishers/${selectedRecord.published_sites.website.uid}`;
            }
            else if (selectedMenu === '"my platform"') {
                endpoint = `${BASE_URL}project-publishers/${selectedRecord.website_id}`;
            }
            else {
                throw new Error('Unknown selected menu');
            }
            const token = Cookies.get("login_access_token");
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",

                },
            });
            // console.log(response);
            setWebsites(response.data);
        } catch (error) {
            console.error('Failed to fetch websites:', error);
        }
    };

    const [value1, setValue1] = useState('Normal Post');
    useEffect(() => {
        localStorage.setItem('selectedPostType', 'Normal Post');
    }, []);
    const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
        // console.log('radio1 checked', value);
        setValue1(value);
        localStorage.setItem('selectedPostType', value);
    };



    const options = [
        { label: 'Normal Post', value: 'Normal Post' },
        {
            label: 'CBD/Casino Post',
            value: 'CBD/Casino Post',
            price: websites[0]?.cbd_p_price || websites[0]?.cbd_cp_price || websites[0]?.cbd_li_price,
        },
        {
            label: 'Adult Post',
            value: 'Adult Post',
            price: websites[0]?.adult_p_price || websites[0]?.adult_cp_price || websites[0]?.adult_li_price,
        },
    ];
    const availableOptions = options.filter(option => option.value === 'Normal Post' || option.price !== null);

    const renderPricingDetails = () => {
        if (value1 === 'Normal Post') {
            return (
                <>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> Content Placement
                        </p>
                        <p className='text-base'>{websites[0]?.content_p_price}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> Content Creation & Placement
                        </p>
                        <p className='text-base'>{websites[0]?.content_cp_price}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> Link Insertion
                        </p>
                        <p className='text-base'>{websites[0]?.link_insert_price || "Not Provided"}</p>
                    </div>
                </>
            );
        } else if (value1 === 'CBD/Casino Post') {
            return (
                <>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> CBD Content Placement
                        </p>
                        <p className='text-base'>{websites[0]?.cbd_p_price || "Not Provided"}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> CBD Content Creation & Placement
                        </p>
                        <p className='text-base'>{websites[0]?.cbd_cp_price || "Not Provided"}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> CBD Link Insertion
                        </p>
                        <p className='text-base'>{websites[0]?.cbd_li_price || "Not Provided"}</p>
                    </div>
                </>
            );
        } else if (value1 === 'Adult Post') {
            return (
                <>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> Adult Content Placement
                        </p>
                        <p className='text-base'>{websites[0]?.adult_p_price || "Not Provided"}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> Adult Content Creation & Placement
                        </p>
                        <p className='text-base'>{websites[0]?.adult_cp_price || "Not Provided"}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <BsCurrencyDollar /> Adult Link Insertion
                        </p>
                        <p className='text-base'>{websites[0]?.adult_li_price || "Not Provided"}</p>
                    </div>
                </>
            );
        }
    };


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<any>(null);

    const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0] as string);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters?: () => void) => {
        if (clearFilters) {
            clearFilters();
        }
        setSearchText('');
    };

    const handleResetAndSearch = (
        clearFilters: (() => void) | undefined,
        selectedKeys: React.Key[],
        confirm: () => void,
        dataIndex: string
    ) => {
        handleReset(clearFilters);
        handleSearch(selectedKeys, confirm, dataIndex);
    };

    const getColumnSearchProps: any = (dataIndex: keyof DataType) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: ColumnSearchProps) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0] as string}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, background: 'blue' }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleResetAndSearch(clearFilters, selectedKeys, confirm, dataIndex)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? 'blue' : 'black', fontSize: filtered ? '22px' : 'inherit', transition: 'all ease 0.3s' }} />,
        onFilter: (value: string, record: DataType) =>
            record.website && record.website.domain.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible: boolean) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text: string) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const maxlink = websites.map((website) => website.max_link);
    const deliverytime = websites.map((website) => website.delivery_time);
    const websiteLinkTypeTitle = websites.map((website) => website.linktype_detail.title);
    const isMyPlatform = localStorage.getItem('selectedMenu') === '"my platform"';
    const columns = [
        {
            title: 'Username',
            dataIndex: 'user_details',
            key: 'user_details',
            // ...getColumnSearchProps('website'),
            // sorter: (a: any, b: any) => a.website.url.length - b.website.url.length,
            render: (user_details: any, record: any) => {


                return (
                    <div className={`flex flex-col items-start gap-1`}>
                        {/* {user_details.admin === false && user_details.partner === true && 
                        <span className='text-[12px] text-white font-semibold bg-[#3c5a99] px-3 rounded-md '>In House Staff</span>
                        } */}
                        <div className='flex gap-2 items-center justify-between w-full '>
                            <div className="flex items-center gap-2 ">
                                <div className="website text-sm font-bold text-[#3c5a99] truncate cursor-pointer dark:text-blue-500" onClick={() => {
                                    showDrawer(record)
                                }}>
                                    {user_details.username/*.slice(0, 3)*/}</div>
                            </div>

                            <div className=' flex right-0 gap-2'>
                                <span className="unhide-url text-xl  text-[#2c7be5]  rounded hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer dark:text-blue-500">
                                    {user_details.admin === true && <FaUserCheck />  || user_details.partner === true ? <PiHandshakeFill className='text-2xl' /> : ""}

                                </span>
                                <span className="unhide-url text-xl  text-orange-500 font-extraboldbold rounded hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer dark:text-blue-500"><IoIosHeartEmpty /></span>
                            </div>

                        </div>
                    </div>
                )
            } 
        },
        {
            title: 'Role',
            dataIndex: 'user_details',
            key: 'user_details',
            render: (user_details: any, record: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    <span className="dark:text-blue-500">{user_details.admin === true ? "Owner" : user_details.partner === true ? "Partner" : "Contributor"}</span>
                </div>
            )
        },
        {
            title: 'Completion Rate',
            dataIndex: 'user_details',
            key: 'user_details',
            render: (user_details: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    <span className="dark:text-blue-500">{Math.round(user_details.task_detail.completion_rate)}%</span>
                </div>
            )
        },
        {
            title: 'Completed',
            dataIndex: 'user_details',
            key: 'user_details',
            render: (user_details: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    <span className="dark:text-blue-500">{user_details.task_detail.completed_tasks_count}</span>
                </div>
            )
        },
        {
            title: 'In Progress',
            dataIndex: 'user_details',
            key: 'user_details',
            render: (user_details: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    <span className="dark:text-blue-500">{user_details.task_detail.inprogress_tasks_count}</span>
                </div>
            )
        },
        {
            title: 'Placement',
            dataIndex: 'content_p_price',
            key: 'content_p_price',
            render: (content_p_price: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    <span className="dark:text-blue-500">${content_p_price}</span>
                </div>
            )
        },
        {
            title: 'Creation & Placement',
            dataIndex: 'content_cp_price',
            key: 'content_cp_price',
            render: (content_cp_price: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    <span className="dark:text-blue-500">${content_cp_price}</span>
                </div>
            )
        },
        {
            title: 'Link Insertion',
            dataIndex: 'link_insert_price',
            key: 'link_insert_price',
            render: (link_insert_price: any) => (
                <div className="flex flex-wrap flex-col gap-1">
                    <span className="dark:text-blue-500">{link_insert_price ? `$${link_insert_price}` : "Not Provided"}</span>
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'content_p_price',
            key: 'action',
            render: (content_p_price: any, record: any) => (
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-1'>
                        <Button
                            onClick={() => showDrawer(record)}
                            className='bg-primary text-white font-semibold text-base flex-1'
                        >
                            <SiTicktick /> Select
                        </Button>
                    </div>
                </div>
            )
        }

    ];
    const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);
    const handleExpandClick = (recordKey: string) => {
        setExpandedRowKey(prevKey => (prevKey === recordKey ? null : recordKey));
    };
    const expandedRowRender = (record: any) => (

        <div className='p-4 bg-gray-100 flex flex-col gap-2'>
            <div className='flex'>
                <div className='flex-1 '>
                    <span className='text-sm font-bold text-[#3c5a99]'>Turn Around Time : </span>   {record.delivery_time}
                </div>
                <div className='flex-1 '>
                    <span className='text-sm font-bold text-[#3c5a99]'>Link Type :</span> Up to {record.max_link} {record.linktype_detail.title} Links
                </div>
            </div>
            <div className='flex'>
                <div className='flex-1 '>
                    <span className='text-sm font-bold text-[#3c5a99]'>  Website Special Requirements:</span> {record.special_requirment}
                </div>
                <div className='flex-1 '>
                    <span className='text-sm font-bold text-[#3c5a99]'>Examples Of Publishers Work:</span>   <br /> {record.gp_site1}<br /> {record.gp_site2}<br /> {record.gp_site3}<br />
                </div>
            </div>

        </div>

    );

    const token = Cookies.get("login_access_token");

    const router = useRouter();
    const [data, setData] = useState<any>();
    const handleBuy = async () => {
        const token = Cookies.get("login_access_token");
        if (!token) {
            alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL}buyer-wallet/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",

                },
            });
            const data = response.data;
            // console.log(data);
            setData(data);
            // console.log(data[0].remain_balance);


            if (data && Number(data[0].remain_balance) >= Number(websites[0]?.content_p_price)) {
                router.push('/task-create');
            }
            else {
                toast.error("Please Recharge Your Balance First.")
                router.push('/buyer-add-funds');
                // localStorage.setItem('selectedMenu', '"add funds"');
            }
        } catch (error: any) {
            console.error('Error fetching projects:', error.response);
        }

    };
    const currentDate = new Date();
    const deliveryDays = parseInt(websites[0] && websites[0]?.delivery_time, 10) || 0;
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + deliveryDays);
    const day = futureDate.getDate().toString().padStart(2, '0');
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const year = futureDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const [buttonText, setButtonText] = useState('');

    useEffect(() => {

        const menuSelection = localStorage.getItem('selectedMenu');

        switch (menuSelection) {
            case '"all publisher sites"':
                setButtonText('Go Back To All Publishers Sites');
                break;
            case '"verified sites"':
                setButtonText('Go Back To Verified Sites');
                break;
            case '"favourite sites"':
                setButtonText('Go Back To Favourite Sites');
                break;
            case '"blacklisted sites"':
                setButtonText('Go Back To Blacklisted Sites');
                break;
            case '"my platform"':
                setButtonText('Go Back To My Platform');
                break;
            default:
                setButtonText('Go Back');
        }
    }, []);


    return (
        <DefaultLayout>
            <button
                onClick={() => router.back()}
                className='bg-newcolor text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center  group hover:bg-blue-500 transition-all ease-in-out duration-300'
            >
                <FaChevronRight className='group-hover:scale-125 transition-all ease-in-out duration-300 rotate-180' />
                {buttonText}
            </button>
            <div className="container mx-auto mt-3 flex flex-col gap-2 group">
                <h1 className='text-xl py-2'>Available publishers for your task on
                    <LinkPreview
                        url={websites[0]?.website?.url}
                        className="cursor-pointer mx-3 hover:text-white text-white hover:scale-105 transition-all ease-in-out duration-300  z-999"
                    >
                        <span className='text-primary font-medium group-hover:scale-110'>{websites[0]?.website?.url}
                        </span> </LinkPreview> </h1>
                <h1 className='text-md text-center bg-newcolor text-white py-3 '>We highly recommend you choose a publisher with the
                    <span className=' font-semibold'> highest completion rate</span> or who has <span className=' font-semibold'>completed the most tasks.</span> </h1>
            </div>


            <div className="container mx-auto mt-5">
                <main className="mb-10">
                    <div className="table-container shadow-lg rounded-lg bg-white p-5 dark:bg-dark dark:text-white">

                        <Table
                            className='dark:bg-dark dark:text-white'
                            columns={columns}
                            rowClassName={(record) =>
                                record.user_details.admin === false && record.user_details.partner === true
                                    ? 'activeTableRow'
                                    : ''
                            }
                            dataSource={websites}
                            pagination={{ pageSize: 5 }}
                            scroll={{ x: 'max-content' }}
                            rowKey="website"
                            expandedRowRender={record => expandedRowKey === record.key ? expandedRowRender(record) : null}
                            onExpand={(expanded, record) => {
                                if (expanded) {
                                    setExpandedRowKey(record.key);
                                } else {
                                    setExpandedRowKey(null);
                                }
                            }}
                        />
                    </div>


                </main>
            </div>


            {selectedRecord && (
                <Modal
                    title="Website Details"
                    onCancel={onClose}
                    footer={null}
                    open={open}
                    className='dark:bg-dark dark:text-white w-[80vw] md:w-[900px] '>
                    
                    <div className='flex items-center justify-between border-b border-gray-300 p-2 dark:bg-dark dark:text-white space-x-100 '  >
                        <p className='flex items-center justify-center gap-2 text-base dark:bg-dark dark:text-white'>
                            <LuExternalLink className='' />Website
                        </p>
                        <p className='text-base'>{websites[0]?.website?.url}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <Image src='/images/logs/unnamed (1).png' alt='Moz DA Icon' height={18} width={18} />Moz DA
                        </p>
                        <p className='text-base'>{websites[0]?.website?.da}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <Image src='/images/logs/unnamed (1).png' alt='Moz Spam Score Icon' height={18} width={18} />Moz Spam Score
                        </p>
                        <p className='text-base'>{websites[0]?.website?.spam_score}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <Image src='/images/logs/Ahrefs-icon.jpeg' alt='Ahrefs Icon' height={18} width={18} />Ahrefs DR
                        </p>
                        <p className='text-base'>{websites[0]?.website?.dr}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <LuExternalLink className='' />Link Type
                        </p>
                        <p className='text-base'>Up to {websites[0]?.max_link} {websites[0]?.linktype_detail.title} Links</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <Image src='/images/logs/google-analytics-icon.svg' alt='Google Analytics Icon' height={18} width={18} />Monthly Traffic
                        </p>
                        <p className='text-base'>{websites[0]?.website.traffic > 1000 ? millify(websites[0]?.website.traffic) : "less than 1000"}</p>
                    </div>

                    <div className="">
                        {renderPricingDetails()}
                    </div>

                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <MdOutlineArticle className='' />Article
                        </p>
                        <p className='text-base'>{websites[0]?.word_limit}</p>
                    </div>
                    <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                        <p className='flex items-center justify-center gap-2 text-base'>
                            <MdAccessTime className='' />Estimated Completion Time
                        </p>
                        <p className='text-base'>{formattedDate}</p>

                    </div>
                    {websites[0]?.gp_site1 &&
                        <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                            <p className='flex items-center gap-2 text-base w-full' >
                                <LuExternalLink className='' />Example site 1 :
                            </p>
                            <a href={websites[0]?.gp_site1} className='text-base w-fit text-primary'>{websites[0]?.gp_site1}</a>

                        </div>
                    }
                    {websites[0]?.gp_site2 &&
                        <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                            <p className='flex items-center gap-2 text-base w-full'>
                                <LuExternalLink className='' />Example site 2 :
                            </p>
                            <a href={websites[0]?.gp_site2} className='text-base w-fit text-primary'>{websites[0]?.gp_site2}</a>
                        </div>
                    }
                    {websites[0]?.gp_sit3 &&
                        <div className='flex items-center justify-between border-b border-gray-300 p-2'>
                            <p className='flex items-center gap-2 text-base w-full'>
                                <LuExternalLink className='' />Example site 3 :
                            </p>
                            <a href={websites[0]?.gp_site3} className='text-base w-fit text-primary'>{websites[0]?.gp_sit3}</a>
                        </div>
                    }
                    <div className="flex flex-col space-y-2 p-4 mt-4 bg-gray-50 rounded shadow-lg">
                        <Radio.Group onChange={onChange1} value={value1} buttonStyle="solid"  className='flex  gap-2'>
                            {availableOptions.map(option => (
                                <Radio key={option.value} value={option.value}  className={`text-gray-700 py-2 px-4 rounded-full hover:bg-primary hover:text-white smooth 
                                    ${value1 === option.value ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                                    {option.label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </div>


                    {!isMyPlatform && (
                        <div className='flex items-center justify-between py-4'>

                            <Button

                                onClick={handleBuy} className='flex items-center justify-center gap-2 text-base bg-primary w-full text-white'>
                                <BsCartCheckFill className='' />Buy Post
                            </Button>
                        </div>
                    )}

                </Modal>

            )}

        </DefaultLayout>
    )
}

export default Page


