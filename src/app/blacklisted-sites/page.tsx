"use client"
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { BsGraphUpArrow } from "react-icons/bs";
import { Button, Table, Space, Input, Select, Checkbox, InputNumber, Form } from 'antd';
import { LuExternalLink } from "react-icons/lu";
import { TbMathMax } from "react-icons/tb";
import { MdAccessTime } from "react-icons/md";
import { useWebsites } from '@/helpers/WebsiteContext';
import Highlighter from 'react-highlight-words';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import { SearchOutlined } from '@ant-design/icons';
import { Interface } from 'readline';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import { MdFavorite } from "react-icons/md";
import { MdOutlineBrowserNotSupported } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import { useRecord } from '@/helpers/RecordContext';
import Cookies from 'js-cookie';
import millify from 'millify';
import { PiFlagDuotone } from 'react-icons/pi';


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

  const router = useRouter();

  useEffect(() => {
    fetchWebsites();
}, []);

const [websites, setWebsites] = useState<any[]>([]);
const [websitesSum, setWebsitesSum] = useState<any[]>([]);

const fetchWebsites = async () => {
    const token = Cookies.get("login_access_token");

    try {
        const response = await axios.get(`${BASE_URL}favourite-sites/?status=False`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        // console.log(response.data);

        setWebsites(response.data);
        setWebsitesSum(response.data.length);
    } catch (error) {
        console.error('Failed to fetch websites:', error);
    }
};  
const handleRemove = async (uid: any) => {
    const token = Cookies.get("login_access_token");
    // console.log(uid.uid);
    try {
        const response=  await axios.delete(`${BASE_URL}favourite-sites/?site_id=${uid.uid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        fetchWebsites(); 
        // console.log(response);
    } catch (error) {
        console.error('Failed to delete website:', error);
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
    onFilter: (value: string, record: any) =>
        record.published_sites.website.url.toLowerCase().includes(value.toLowerCase()),
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
        dataIndex: 'published_sites',
        key: 'website',
        ...getColumnSearchProps('website'),
        sorter: (a: any, b: any) => a.published_sites.website.url.length - b.published_sites.website.url.length,
        render: (published_sites: any, record:any) => {
            const { website, max_link, delivery_time, linktype_detail,country_detail } = published_sites;
            const websitecont = country_detail[0].name;
            const websiteMaxLink = max_link;
            const websitedeliverytime = delivery_time;
            const websiteLinkTypeLink = linktype_detail ? linktype_detail.title : 'N/A';


            return (
                <div className="flex flex-col items-start gap-2">
                    <div className='flex gap-2 items-center'>
                        <div className="flex items-center gap-2">
                            <LuExternalLink className='text-blue text-lg' />
                            <div className="website text-sm font-bold text-[#3c5a99] truncate cursor-pointer" 
                                               onClick={() => {router.push("/project-publisher-site")
                                                setSelectedRecord(record);}}>
                                {website.url}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="flex items-center gap-2">
                            <TbMathMax className='text-blue text-lg' />
                            <span className="website text-sm text-[#3c5a99]">Max:</span>
                        </div>
                        <span className="unhide-url text-sm text-[#2c7be5]">{websiteMaxLink} </span>
                        <span className="unhide-url text-sm text-[#2c7be5] px-2"> {websiteLinkTypeLink}</span>
                    </div>
                    <div className='flex items-center'>
                        <div className="flex items-center gap-2">
                            <MdAccessTime className='text-blue text-lg' />
                            <span className="website text-sm text-[#3c5a99]">Turnaround Time:</span>
                        </div>
                        <span className="unhide-url text-sm text-[#2c7be5] px-2">{websitedeliverytime} days</span>
                    </div>
                    <div className='flex items-center'>
                        <div className="flex items-center gap-2">
                        <PiFlagDuotone className='text-blue text-lg' />
                            <span className="website text-sm text-[#3c5a99]">Country:</span>
                        </div>
                        <span className="unhide-url text-sm text-[#2c7be5] px-2">{websitecont}</span>
                    </div>
                </div>
            )
        }
    },
    {
        title: 'Categories',
        dataIndex: 'published_sites',
        key: 'category_detail',
        render: (published_sites: any) => (
            <div className="flex flex-wrap flex-col gap-1">
                {published_sites.category_detail && published_sites.category_detail.map((cat: any, i: any) => (
                    <span key={i} className="category-tag bg-[#F3F3F3] rounded px-2 py-1 text-sm font-medium text-primary">{cat.title}</span>
                ))}
            </div>
        )
    },
    {
        title: 'Monthly Traffic',
        dataIndex: ['published_sites', 'website', 'traffic'],
        key: 'traffic',
        sorter: (a: any, b: any) => a.published_sites.website.traffic - b.published_sites.website.traffic,
        render: (traffic: any) => (
            <div className='flex items-center gap-2 dark:text-blue-500'>
                <Image src='/images/logs/google-analytics-icon.svg' alt='Google Analytics Icon' height={20} width={20} />
                <span className=''>{parseTrafficValue(traffic) > 1000 ? millify(parseTrafficValue(traffic)) : "less than 1000"}</span>
            </div>
        )
    },
    {
        title: 'Moz DA',
        dataIndex: ['published_sites', 'website', 'da'],
        key: 'da',
        sorter: (a: any, b: any) => a.published_sites.website.da - b.published_sites.website.da,
        render: (da: any) => (
            <div className='flex items-center gap-2 dark:text-blue-500'>
                <Image src='/images/logs/unnamed (1).png' alt='Moz DA Icon' height={20} width={20} />
                <span>{da}</span>
            </div>
        )
    },
    {
        title: 'PA',
        dataIndex: ['published_sites', 'website', 'pa'],
        key: 'pa',
        sorter: (a: any, b: any) => a.published_sites.website.pa - b.published_sites.website.pa,
        render: (pa: any) => (
            <div className='flex items-center gap-2 dark:text-blue-500'>
                <Image src='/images/logs/unnamed (1).png' alt='PA Icon' height={20} width={20} />
                <span>{pa}</span>
            </div>
        )
    },
    {
        title: 'Ahrefs DR',
        dataIndex: ['published_sites', 'website', 'dr'],
        key: 'dr',
        sorter: (a: any, b: any) => a.published_sites.website.dr - b.published_sites.website.dr,
        render: (dr: any) => (
            <div className='flex items-center gap-2 dark:text-blue-500'>
                <Image src='/images/logs/Ahrefs-icon.jpeg' alt='Ahrefs Icon' height={20} width={20} />
                <span>{dr}</span>
            </div>
        )
    },

    {
        title: 'Language',
        dataIndex: ['published_sites', 'language_detail'],
        key: 'language',
        render: (language_detail: any) => (
            <div className="flex items-center dark:text-blue-500">
                <span className="language-flag"></span>
                {language_detail ? language_detail.title : 'N/A'}
            </div>
        )
    },
    {
        title: 'Price',
        dataIndex: 'published_sites',
        key: 'published_sites',
        sorter: (a: any, b: any) => a.published_sites.content_p_price - b.published_sites.content_p_price,
        render: (published_sites: any) => (
            <div className="flex items-center dark:text-blue-500">
                <span className="bg-primary px-4 py-1 text-white rounded-full">
                ${published_sites.content_p_price}
                </span>

            </div>
        )
    },
    {
        title: 'Action',
        dataIndex: 'published_sites',
        key: 'action',
        sorter: (a: any, b: any) => a.published_sites.content_p_price - b.published_sites.content_p_price,
        render: (published_sites: any, uid:any) => (
            <div className='flex flex-col gap-2'>
                <div className='flex gap-1'>
                    <button 
                    className='bg-[#3c5a99] text-white cursor-pointer px-4 py-1 rounded-lg flex-1  ' 
                    onClick={() =>{router.push("/project-publisher-site")
                        setSelectedRecord(uid);
                    } }
                    >BuyPost</button>
                    {/* <Button onClick={() =>{router.push("/project-publisher-site")
                        setSelectedRecord(uid);
                    } }className='bg-[#2c7be5] text-white font-semibold text-base flex-1'>${published_sites.content_p_price}</Button> */}
                </div>
                <div className='flex gap-2'>
                    <Button className="flex-1 font-semibold hover:shadow-lg  transition ease-in-out text-center duration-300 hover:scale-110" onClick={() => handleRemove(uid)}><MdRemoveCircleOutline className='text-xl text-[#f5803e]' />Remove</Button>
                    {/* <Button className="flex-1 details-button font-semibold hover:shadow-lg transition ease-in-out text-center duration-300 hover:scale-110" onClick={() => router.push("/buyer-dashboard")}><MdReportProblem className='text-xl text-red-600' />Report</Button> */}
                </div>
            </div>
        )
    },
];
  return (
    <DefaultLayout>
                <div className='h-[150px] md:h-[100px] w-full bg-white mb-4 rounded-lg flex flex-col gap-2 py-4 dark:bg-dark dark:text-white'>
<h1 className='text-center text-lg md:text-xl font-bold'>Websites in your BlackList ({websitesSum})</h1>
<p className='text-center  '>Use this BlackList to keep a list of websites that you dont want to see while searching.</p>
        </div>
                    <div className="table-container shadow-lg rounded-lg bg-white p-5 dark:bg-dark dark:text-white">

                        <Table
                            columns={columns}
                            dataSource={websites}
                            pagination={{
                                pageSize: 10
                            }}
                            scroll={{ x: 'max-content' }}
                            rowKey="website"
                        />
                    </div>
    </DefaultLayout>
  )
}

export default Page