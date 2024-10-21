
"use client"
import Head from 'next/head';
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, Space, Input, Select, Checkbox, InputNumber, Form, Drawer, Popover } from 'antd';
import { LuExternalLink } from "react-icons/lu";
import { TbMathMax } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import { SearchOutlined } from '@ant-design/icons';
import { MdFavorite } from "react-icons/md";
import { MdOutlineBrowserNotSupported } from "react-icons/md";
import { useRecord } from '@/helpers/RecordContext';
import toast from 'react-hot-toast';
import millify from 'millify';
import { PiFlagDuotone } from "react-icons/pi";
import Cookies from 'js-cookie';
import { LuSearch } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import Loader from '@/components/common/Loader';


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

export default function Publishers() {

    const router = useRouter();
    const [websites, setWebsites] = useState<any[]>([]);
    const [langs, setLangs] = useState<any[]>([]);
    const [selected_LinkType, setSelected_LinkType] = useState<any[]>([]);
    const [selected_Category, setSelected_Category] = useState<any[]>([]);
    const [filters, setFilters] = useState<any>({
        niche: '',
        language: '',
        linkType: '',
        countries: '',
        minDaRange: '',
        maxDaRange: '',
        minDrRange: '',
        maxDrRange: '',
        minTrafficRange: '',
        maxTrafficRange: '',
        minPriceRange: '',
        maxPriceRange: '',
    });
    const [errors, setErrors] = useState('')
    const [countries, setCountries] = useState<any[]>([])
    const [isOpened, setIsOpened] = useState<any>(false)


    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}common-website-details/`, {

            });
            // console.log(response);

            setLangs(response.data.language);
            setSelected_LinkType(response.data.link_type);
            setSelected_Category(response.data.categories);
            setCountries(response.data.countries);

        } catch (error) {
            console.log(error);
        }
    };

    // const handleFilterChange = (name: any, value: any) => {
    //     setFilters((prevFilters:any) => ({
    //         ...prevFilters,
    //         [name]: value === '' ? '' : value,
    //     }));
    //     fetchWebsites(currentPage, pageSize, { ...filters, [name]: value }, searchText);
    // };
    const handleFilterChange = (name: any, value: any) => {
        const updatedFilters = { ...filters, [name]: value === '' ? '' : value };
        setFilters(updatedFilters);
        fetchWebsites(currentPage, pageSize, updatedFilters, searchText);
    };


    const handleResetFilters = () => {
        const defaultFilters = {
            niche: '',
            language: '',
            linkType: '',
            countries: '',
            minDaRange: '',
            maxDaRange: '',
            minDrRange: '',
            maxDrRange: '',
            minTrafficRange: '',
            maxTrafficRange: '',
            minPriceRange: '',
            maxPriceRange: '',
        };
        setFilters(defaultFilters);
        fetchWebsites(currentPage, pageSize, defaultFilters);
    };

    const [dataCount, setDataCount] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);

    const fetchWebsites = async (page: number = 1, size: number = 10, filters: any = {}, searchText: string = '', sortField: string = '', sortOrder: 'asc' | 'desc' = 'asc') => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}publisher-sites/verified/`, {
                params: {
                    page,
                    page_size: size,
                    search: searchText,
                    sort: sortField,
                    order: sortOrder,
                    ...Object.fromEntries(
                        Object.entries(filters).filter(([key, value]) => value !== '' && value !== undefined && value !== null)
                    )
                },
            });
            setWebsites(response.data.results);
            // console.log(response.data.results);

            setDataCount(response.data.count);
        } catch (error) {
            console.error('Failed to fetch websites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
        fetchWebsites(page, pageSize, filters, searchText);
    };
    const handlePageSizeChange = (current: any, size: any) => {
        setPageSize(size);
        setCurrentPage(1);
        fetchWebsites(1, size, filters, searchText);
    };

    // const [favorites, setFavorites] = useState([]);

    const addFav = async (record: any) => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.post(`${BASE_URL}favourite-sites/`, { site_id: record.uid, status: true }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Added Favourite Site");
            // console.log('Added Fav:', response.data);
            fetchWebsites();
            return response;
        } catch (error: any) {
            console.error('Error adding website:', error.response || error);
        }
    };

    const addBlacklisted = async (record: any) => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.post(`${BASE_URL}favourite-sites/`, { site_id: record.uid, status: false }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Added Blacklisted Site");
            // console.log('Added Blacklisted:', response.data);
            fetchWebsites();
            return response;
        } catch (error: any) {
            console.error('Error adding website:', error.response || error);
        }
    };

    const getStoredWebsite = () => {
        const storedData = localStorage.getItem("selectedWebsite");

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const currentTime = new Date().getTime();

            if (currentTime < parsedData.expiry) {
                return parsedData.value;
            } else {
                localStorage.removeItem("selectedWebsite");
            }
        }
        return "";
    };

    const [searchText, setSearchText] = useState<any>(getStoredWebsite());
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<any>(null);

    const handleSearch = (selectedKeys: any, confirm: () => void, dataIndex: string) => {
        confirm();
        const searchText = selectedKeys[0] as string;
        setSearchText(searchText);
        fetchWebsites(currentPage, pageSize, filters, searchText);
    };

    const handleReset = (clearFilters?: () => void) => {
        if (clearFilters) {
            clearFilters();
        }
        setSearchText('');
        fetchWebsites(currentPage, pageSize, filters, '');
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

    const getColumnSearchProps = (dataIndex: keyof DataType) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: ColumnSearchProps) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block', color: 'blue' }}
                    defaultValue={searchText}
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
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? 'blue' : 'black', transition: 'all ease 0.3s', fontSize: '18px' }} />,

        onFilter: (value: string, record: DataType) =>
            record.website && record.website.domain.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible: boolean) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select());
            }
        },
    });

    useEffect(() => {
        fetchWebsites(currentPage, pageSize, filters, searchText);
        fetchData();
    }, [currentPage, pageSize, filters, searchText]);

    const [open, setOpen] = useState(false);

    const { selectedRecord, setSelectedRecord } = useRecord();

    const showDrawer = (record: any) => {
        setSelectedRecord(record);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedRecord(null);
    };

    const websiteName = websites.map((website) => website.url);
    const maxlink = websites.map((website) => website.max_link);
    const deliverytime = websites.map((website) => website.delivery_time);
    const websiteLinkTypeTitle = websites.map((website) => website.linktype_detail.title);
    const websiteCont = websites.map((website) => website.country_detail[0].name);


    function parseTrafficValue(value: string | number) {
        if (typeof value === 'string') {
            const multiplierMap: { [key: string]: number } = {
                'k': 1000,
                'K': 1000,
                'M': 1000000,
                'm': 1000000,
                'B': 1000000000,
            };

            const suffix = value.slice(-1);  // Get the last character (suffix)
            const numberPart = parseFloat(value);  // Parse the numerical part

            // If the suffix exists in the multiplierMap, convert it, otherwise return as is
            if (multiplierMap[suffix]) {
                return numberPart * multiplierMap[suffix];
            }
            return numberPart; // Return as float if no valid suffix
        }
        return value; // If already a number, return it directly
    }

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
                const websiteContlink = websiteCont[websites.findIndex(w => w.website_id === website.uid)];
                const website_Name = websiteName[websites.findIndex(w => w.website_id === website.uid)];
                //                 console.log(websiteMaxLink);
                //                 console.log("Current Website UID:", website.uid);
                // console.log("Websites UIDs:", websites.map(w => w.website_id));
                return (
                    <div className="flex flex-col items-start gap-2">
                        <div className='flex gap-2 items-center'>
                            <div className="flex items-center gap-2 dark:text-blue-500">
                                <LuExternalLink className='text-blue text-lg dark:text-blue-500' />
                                <div className="website text-sm font-bold text-[#3c5a99] truncate cursor-pointer dark:text-blue-500"
                                    onClick={() => {
                                        router.push("/project-publisher-site")
                                        setSelectedRecord(record);
                                    }}>
                                    {website.domain/*.slice(0, 3)*/}</div>
                            </div>
                            {/* <span className="unhide-url text-[10px] text-[#2c7be5] px-2 rounded hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer bg-[#d5e5fa]">Unhide the URL</span> */}
                        </div>
                        <div className='flex items-center'>
                            <div className="flex items-center gap-2 dark:text-blue-500">
                                <TbMathMax className='text-blue text-lg dark:text-blue-500' />
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
                        <div className='flex items-center'>
                            <div className="flex items-center gap-2">
                                <PiFlagDuotone className='text-blue text-lg' />
                                <span className="website text-sm text-[#3c5a99]">Country:</span>
                            </div>
                            <span className="unhide-url text-sm text-[#2c7be5] px-2 ">{websiteContlink}</span>
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
                        <span key={i} className="category-tag bg-[#F3F3F3] rounded px-2 py-1 text-sm text-primary font-medium">{cat.title}</span>
                    ))}
                </div>
            )
        },
        {
            title: 'Monthly Traffic',
            dataIndex: ['website', 'traffic'],
            key: 'traffic',
            sorter: (a: any, b: any) => parseTrafficValue(a.website.traffic) - parseTrafficValue(b.website.traffic),
            render: (traffic: string | number) => (
                <>
                    <div className='flex items-center gap-2'>
                        <Image src='/images/logs/google-analytics-icon.svg' alt='Google Analytics Icon' height={20} width={20} />
                        <span className='dark:text-blue-500'>
                            {parseTrafficValue(traffic) > 1000 ? millify(parseTrafficValue(traffic)) : "less than 1000"}
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
                <div className='flex items-center gap-2 dark:text-blue-500'>
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
                <div className='flex items-center gap-2 dark:text-blue-500'>
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
                <div className='flex items-center gap-2 dark:text-blue-500'>
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
                <div className="flex items-center dark:text-blue-500">
                    <span className="language-flag"></span>
                    {website_lang.title}
                </div>
            )
        },
        {
            title: 'Price',
            dataIndex: 'content_p_price',
            key: 'content_p_price',
            sorter: (a: any, b: any) => a.content_p_price - b.content_p_price,
            render: (content_p_price: any) => (
                <div className="flex items-center dark:text-blue-500">
                    <span className="bg-primary px-4 py-1 text-white rounded-full">
                        ${content_p_price}
                    </span>

                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'content_p_price',
            key: 'content_p_price',
            render: (content_p_price: any, record: any) => (
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 flex-col'>
                        <button className='bg-white border-primary border-1 hover:bg-primary hover:text-white smooth font-medium py-1 text-primary cursor-pointer px-4 rounded-lg flex-1'
                            onClick={() => {
                                router.push("/project-publisher-site")
                                setSelectedRecord(record);
                            }}>BuyPost</button>
                        {/* <Button
                            onClick={() => {
                                router.push("/project-publisher-site")
                                setSelectedRecord(record);
                            }} className='bg-primary text-white font-semibold text-base flex-1'>${content_p_price}</Button> */}
                            <div className=' flex gap-2 flex-1'>
                            <Popover
                            title="Add To Favorites"
                            trigger="hover"
                            placement="top"
                        >
                            <Button className=" font-semibold w-full border-[#f5803e] hover:shadow-lg transition ease-in-out text-center duration-300 hover:scale-110" onClick={() => addFav(record)}>
                                <MdFavorite className='text-xl text-[#f5803e]' />
                            </Button>
                        </Popover>
                        <Popover
                            title="Add To Blacklisted"
                            trigger="hover"
                            placement="top"
                        >
                            <Button className=" details-button font-semibold w-full border-red-600 hover:shadow-lg transition ease-in-out text-center duration-300 hover:scale-110" onClick={() => addBlacklisted(record)}>
                                <MdOutlineBrowserNotSupported className='text-xl text-red-600' />
                            </Button>
                        </Popover>
                            </div>


                    </div>
                </div>
            )
        }
    ];


    const token = Cookies.get("login_access_token");

    const currentDate = new Date();
    const deliveryDays = parseInt(selectedRecord && selectedRecord.delivery_time, 10) || 0;
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + deliveryDays);
    const day = futureDate.getDate().toString().padStart(2, '0');
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const year = futureDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;


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


            if (data && Number(data[0].remain_balance) >= Number(selectedRecord.content_p_price)) {
                router.push('/task-create');
            }
            else {
                toast.error("Please Recharge Your Balance First.")
            }
        } catch (error: any) {
            console.error('Error fetching projects:', error.response);
        }

    };


    return (

        <>
            <DefaultLayout>


                <div className="container sm:w-full w-[400px] mx-auto py-5 dark:bg-dark dark:text-white">
                    <main className="mb-10 dark:bg-dark dark:text-white ">



                        <div className="table-container shadow-lg rounded-lg bg-white p-5 dark:bg-dark dark:text-white">
                        <div className='w-full flex items-center justify-center'>
                                    <span className=' w-[644px] h-[52px]  flex items-center justify-center text-xl '>{dataCount} Websites Available</span>
                                    </div>
                            <div className='w-full flex justify-between items-center'>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-2 items-center rounded-full  shadow-md border-1 mb-2 w-[644px] h-[52px] justify-between  p-1 pl-2'>
                                        <LuSearch className='text-2xl text-primary' />
                                        <div className='w-full h-full flex items-center mt-2'>
                                            <input
                                                ref={searchInput}
                                                placeholder={`Search from ${dataCount} Websites`}
                                                value={searchText}
                                                onChange={e => setSearchText(e.target.value)}
                                                // onPressEnter={() => handleSearch([searchText], () => {}, '')}
                                                className='outline-none border-none  h-full w-full active:outline-none active:border-none focus:outline-none focus:border-none  '
                                                style={{ marginBottom: 8, display: 'block', color: 'blue' }}
                                            />
                                        </div>

                                        <Button
                                            className='bg-primary text-white'
                                            onClick={() => {
                                                handleReset();
                                                localStorage.removeItem("selectedWebsite");
                                            }}
                                            style={{
                                                width: 114,
                                                height: 46,
                                                borderRadius: '50px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            Clear
                                        </Button>
                                    </div>
                                </div>


                                <FiFilter
                                    onClick={() => { setIsOpened(!isOpened) }}
                                    className='text-2xl text-primary font-semibold cursor-pointer  ' />
                            </div>

                            {isOpened ?
                                <div className="filter-section mb-2 p-5 bg-primary/[.07] rounded-lg dark:bg-dark dark:text-white">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">

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
                                            <span>Countries</span>
                                            <Select placeholder=""
                                                onChange={(value) => handleFilterChange('countries', value)}
                                                value={filters.countries}
                                                className="w-full">
                                                <Option value="">All</Option>
                                                {countries.map((country: any) => (
                                                    <Option key={country.id} value={country.id}>{country.name}</Option>
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
                                                onChange={(value) => handleFilterChange('minDaRange', value)}
                                                value={filters.minDaRange}
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
                                                onChange={(value) => handleFilterChange('maxDaRange', value)}
                                                value={filters.maxDaRange}
                                                className="w-full"
                                            />
                                        </div>
                                        {/* <div className='flex flex-col gap-2 hidden lg:block'>
                                <span>Reset</span>
                                <Button onClick={handleResetFilters} className='bg-blue-500 text-white w-full hover:shadow-lg transition ease-in-out duration-300 '>Reset</Button>

                            </div> */}



                                        <div className=' flex flex-col gap-2'>
                                            <span>Traffic Min</span>
                                            <InputNumber
                                                placeholder="Traffic Min"
                                                min={0}
                                                onChange={(value) => handleFilterChange('minTrafficRange', value)}
                                                value={filters.minTrafficRange}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className=' flex flex-col gap-2'>
                                            <span>Traffic Max</span>
                                            <InputNumber
                                                placeholder="Traffic Max"
                                                min={0}
                                                onChange={(value) => handleFilterChange('maxTrafficRange', value)}
                                                value={filters.maxTrafficRange}
                                                className="w-full"
                                            />
                                        </div>

                                        <div className=' flex flex-col gap-2'>
                                            <span>DR Min</span>
                                            <InputNumber
                                                placeholder="DR Min"
                                                min={0}
                                                max={100}
                                                onChange={(value) => handleFilterChange('minDrRange', value)}
                                                value={filters.minDrRange}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className=' flex flex-col gap-2'>
                                            <span>DR Max</span>
                                            <InputNumber
                                                placeholder="DR Max"
                                                min={0}
                                                max={100}
                                                onChange={(value) => handleFilterChange('maxDrRange', value)}
                                                value={filters.maxDrRange}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className=' flex flex-col gap-2'>
                                            <span>Price Min</span>
                                            <InputNumber
                                                placeholder="Price Min"
                                                min={0}
                                                max={1000}
                                                onChange={(value) => handleFilterChange('minPriceRange', value)}
                                                value={filters.minPriceRange}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className=' flex flex-col gap-2'>
                                            <span>Price Max</span>
                                            <InputNumber
                                                placeholder="Price Max"
                                                min={0}
                                                max={1000}
                                                onChange={(value) => handleFilterChange('maxPriceRange', value)}
                                                value={filters.maxPriceRange}
                                                className="w-full"
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-4 justify-end w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                        <div className=' flex flex-col gap-2 items-left'>
                                            <span>Reset</span>
                                            <Button onClick={handleResetFilters} className='bg-primary  text-white w-full hover:shadow-lg transition ease-in-out duration-300 '>Reset</Button>

                                        </div>
                                    </div>
                                </div>
                                : ""}

                            <Table
                                columns={columns}
                                dataSource={websites}
                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: dataCount,
                                    showSizeChanger: true,
                                    onChange: handlePageChange,
                                    onShowSizeChange: handlePageSizeChange,
                                    showQuickJumper: true,
                                }}
                                scroll={{ x: 'max-content' }}
                                rowKey="website_id"
                                loading={loading}
                            />
                        </div>

                    </main> 
                </div>

            </DefaultLayout>

        </>
    );
}


