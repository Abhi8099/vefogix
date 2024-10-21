"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Space, Popover, Modal, Form, Select, Popconfirm, ConfigProvider, Radio } from 'antd';
import { FaEye } from "react-icons/fa";
import { SearchOutlined } from '@ant-design/icons';
import { TbEdit } from "react-icons/tb";
import { FaRegCirclePause } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import Highlighter from 'react-highlight-words';
import { useWebsites } from '@/helpers/WebsiteContext';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import Link from 'next/link';
import styles from "./styles.module.css";
import { useRouter } from 'next/navigation';
import Loader from '../common/Loader';
import { useRecord } from '@/helpers/RecordContext';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const { Option } = Select;

const AntDesignTable = () => {
    const { selectedRecord, setSelectedRecord } = useRecord();
    const { websites, updateWebsite, deleteWebsite, dataCount, pageSize, currentPage, handlePageSizeChange, handlePageChange, loading, handleSearch, handleReset, searchText ,setSearchText } = useWebsites();
    // console.log(websites);
    // const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingWebsite, setEditingWebsite] = useState(null);
    // console.log(editingWebsite);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());
    const [langs, setLangs] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selected_LinkType, setSelected_LinkType] = useState([]);
    const [selected_Category, setSelected_Category] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    let searchInput = useRef(null);

    useEffect(() => {
        if (editingWebsite) {
            setCheckedCategories(editingWebsite.category || []);
        }
    }, [editingWebsite]);

    const fetchData = async () => {
        const token = Cookies.get("login_access_token");
        if (!token) {
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}common-website-details/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setLangs(response.data.language);
            setCountries(response.data.countries);
            setSelected_LinkType(response.data.link_type);
            setSelected_Category(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (record) => {
        setEditingWebsite(record);
        fetchData();
        setFormKey(Date.now());
        setIsModalOpen(true);
        setPostType('normal')
    };

    const handleDelete = (id) => {
        if (id) {
            deleteWebsite(id);
        } else {
            console.error('ID is undefined. Cannot perform delete operation.');
        }
    };

    const handleModalOk = async (values) => {
        // console.log(values);
        values.category = checkedCategories;
        await updateWebsite(editingWebsite.uid, values);
        setIsModalOpen(false);
        setEditingWebsite(null);
        toast.success("Updated Succesfully!");
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setEditingWebsite(null);
        setPostType('normal')
    };



    // const handleSearch = (selectedKeys, confirm, dataIndex) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    //     setSearchedColumn(dataIndex);
    // };

    // const handleReset = (clearFilters) => {
    //     if (clearFilters) {
    //         clearFilters();
    //     }
    //     setSearchText('');
    // };

    const handleResetAndSearch = (clearFilters, selectedKeys, confirm, dataIndex) => {
        clearFilters();
        setSearchText('');
        handleSearch([], confirm, dataIndex);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block',}}
                    // defaultValue={searchText}
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
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? 'blue' : 'white', fontSize: filtered ? '22px' : 'inherit', transition: 'all ease 0.3s' }} />
        ),
        onFilter: (value, record) => record?.website?.url?.toLowerCase().includes(value.toLowerCase()),


        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
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

    const handleToggleActivity = async (record) => {

        const updatedStatus = !record.activity_status;
        const updatedData = { activity_status: updatedStatus };

        try {
            await updateWebsite(record.uid, updatedData);
        } catch (error) {
            console.error('Error updating website:', error);
        }
    };


    const handleCheckboxChange = (id) => {
        if (checkedCategories.includes(id)) {
            setCheckedCategories(checkedCategories.filter((categoryId) => categoryId !== id));
        } else {
            if (checkedCategories.length < 3) {
                setCheckedCategories([...checkedCategories, id]);
            }
        }
    };

    const validateUrl = (_, value) => {
        try {
            new URL(value); // This will throw an error if the URL is invalid
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(new Error('Please enter a valid URL.'));
        }
    };
    
    const router = useRouter();

    const columns = [
        {
            title: 'URL',
            dataIndex: ['website', 'domain'],
            key: 'domain',
            ...getColumnSearchProps(['website', 'domain']),
            render: (text) => {
                // Check if the text starts with 'http://' or 'https://', if not, add 'https://'
                const formattedUrl = text.startsWith('http://') || text.startsWith('https://') ? text : `https://${text}`;
        
                return (
                    <Link href={formattedUrl} className='dark:text-blue-500' target="_blank">
                        {text}
                    </Link>
                );
            },
        }
        ,
        {
            title: (
                <Popover className='text-white hover:text-white'
                overlayClassName="custom-popover"
                title="To verify the ownership of a website, click on CONTRIBUTOR next to the website and follow the instructions">
                    <Button type="text" className="font-semibold ">
                        Website Role <RiInformationLine className="text-lg " />
                    </Button>
                </Popover>
            ),
            dataIndex: ['website', 'user_role'],
            key: 'user_role',
            render: (user_role, record) => {
                return user_role === null  ? (
                    <span
                        onClick={() => {
                            router.push(`/update-owner?uid=${record.uid}`);
                            localStorage.setItem("uid", record.uid);
                        }}
                        className='text-blue-500 cursor-pointer font-medium dark:text-blue-500'>
                        {record.partner === true ? "Partner" : "Contributor"}
                    </span>

                ) : (
                    <span>{record.admin === true ? "Owner" : record.partner === true ? "Partner" : "Contributor"}</span>
                );
            },
        },
        {
            title: 'Website Status',
            dataIndex: 'website_status',
            key: 'website_status',
            render: (text) => {
                let label;
                let className;

                switch (text) {
                    case '0':
                        label = 'Moderate';
                        className = ' text-yellow-900';
                        break;
                    case '1':
                        label = 'Approved';
                        className = ' text-green-900';
                        break;
                    case '2':
                        label = 'Rejected';
                        className = ' text-red-500';
                        break;
                    default:
                        label = 'Unknown';
                        className = ' text-gray-500';
                        break;
                }

                return <span className={`${className} px-4 pt-1 pb-2 rounded-md font-semibold`}>{label}</span>;
            },
        },
        // {
        //     title: 'Performer Status',
        //     dataIndex: 'performer_status',
        //     key: 'performer_status',
        // },
        {
            title: 'Activity Status',
            dataIndex: 'activity_status',
            key: 'activity_status',
            render: (text) => (
                <span className={text ? ' text-green-900 px-4 pt-1 pb-2 rounded-md font-semibold' : 'font-semibold  text-red-500 px-4 pt-1 pb-2 rounded-md'}>
                    {text ? 'Active' : 'Deactivated'}
                </span>
            ),
        },
        {
            title: 'Placement',
            dataIndex: 'content_p_price',
            key: 'content_p_price',
            render: (text) => `$${text}`
        },
        {
            title: 'Creation & Placement',
            dataIndex: 'content_cp_price',
            key: 'content_cp_price',
            render: (text) => `$${text}`
        },
        {
            title: (
                <Popover className='text-white hover:text-white' title="Only Website Owner & Admin are eligible">
                    <Button type="text" className="font-semibold">
                        Link Insertion <RiInformationLine className="text-lg" />
                    </Button>
                </Popover>
            ),
            dataIndex: 'link_insert_price',
            key: 'link_insert_price',
            render: (text) => (
                <span className={text ? 'text-green-900 px-4 pt-1 pb-2 rounded-md font-semibold' : 'font-semibold text-red-500 px-4 pt-1 pb-2 rounded-md'}>
                    {text ? '$' + text : 'Not Eligible'}
                </span>
            ),
        },
        {
            title: 'Buyer Page',
            dataIndex: 'url',
            key: 'buyer_page',
            render: (_,record) => (
                <FaEye
                    style={{
                        fontSize: '1.5em',
                        color: 'rgba(44,123 ,229,1)',
                        backgroundColor: 'white',
                        border: '1px solid rgba(44,123 ,229,1)',
                        padding: '4px',
                        cursor: 'pointer',
                        height: '27px',
                        width: '40px',
                        marginLeft: '18px',
                        borderRadius: '5px',
                    }}
                    onClick={() => {
                        router.push("/project-publisher-site/")
                        setSelectedRecord(record);
                    }}
                />
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (_, record) => (
                <ConfigProvider
                    button={{
                        style: { width: buttonWidth, margin: 4 }
                    }}
                >

                    <div className="flex gap-1">
                        <TbEdit
                            style={{
                                fontSize: '1.5em',
                                color: 'white',
                                backgroundColor: 'rgba(44,123 ,229,1)',
                                border: '1px solid rgba(44,123 ,229,1)',
                                padding: '3px',
                                cursor: 'pointer',
                                height: '27px',
                                width: '40px',
                                borderRadius: '5px',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => handleEdit(record)}
                        />
                        <Popconfirm
                            placement="topRight"
                            title={te_xt}
                            description={desc_ription}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDelete(record.uid)}
                        >
                            <MdOutlineDelete
                                style={{
                                    fontSize: '1.5em',
                                    color: 'white',
                                    backgroundColor: 'rgba(255,50,50,1)',
                                    padding: '3px',
                                    cursor: 'pointer',
                                    height: '27px',
                                    width: '40px',
                                    borderRadius: '5px',
                                    transition: 'all 0.3s ease',
                                }}
                            // onClick={() => handleDelete(record.uid)}
                            /></Popconfirm>
                    </div>
                </ConfigProvider>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                const isActive = record.activity_status;
                return (
                    <FaRegCirclePause
                        style={{
                            fontSize: '1.5em',
                            color: 'white',
                            backgroundColor: isActive ? '#00d27a' : 'rgba(255,50,50,1)',
                            border: `1px solid ${isActive ? '#00d27a' : 'rgba(255,50,50,1)'}`,
                            padding: '3px',
                            cursor: 'pointer',
                            height: '27px',
                            width: '40px',
                            borderRadius: '5px',
                        }}
                        onClick={() => handleToggleActivity(record)}
                    />
                );
            },
        }
    ];

    const te_xt = 'Are you sure to remove this site?';
    const desc_ription = 'Ps: This site will still be count amount the websites you have added but will not been shown on your account';
    const buttonWidth = 80;

    const [searchTerm, setSearchTerm] = useState('');

    // Filter categories based on the search term
    const filteredCategories = selected_Category.filter((selectedcategory) =>
        selectedcategory.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
const [postType, setPostType] = useState('normal');
useEffect(() => {
    setPostType('normal')
},[])
const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
};
    return (
        <>

            {loading ? <Loader /> :
                <Table
                    columns={columns}
                    dataSource={websites}
                    rowKey="uid"
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
                />}
            <div className="w-full ">
                <Modal title="Edit Website" open={isModalOpen} onCancel={handleModalCancel} footer={null} key={formKey}>
                    <div className={`modal-form-wrapper ${styles.modalContent} `}  >
                        <Form
                            initialValues={{
                                url: editingWebsite?.website.url,
                                website_lang: editingWebsite?.website_lang,
                                country: editingWebsite?.country_detail?.map(country => country.id) || [],
                                max_link: editingWebsite?.max_link,
                                linktype: editingWebsite?.linktype,
                                da: editingWebsite?.website.da,
                                dr: editingWebsite?.website.dr,
                                traffic: editingWebsite?.website.traffic,
                                spam_score: editingWebsite?.website.spam_score,
                                content_p_price: editingWebsite?.content_p_price,
                                content_cp_price: editingWebsite?.content_cp_price,
                                link_insert_price: editingWebsite?.link_insert_price,
                                cbd_p_price: editingWebsite?.cbd_p_price,
                                cbd_cp_price: editingWebsite?.cbd_cp_price,
                                cbd_li_price: editingWebsite?.cbd_li_price,
                                adult_p_price: editingWebsite?.adult_p_price,
                                adult_cp_price: editingWebsite?.adult_cp_price,
                                adult_li_price: editingWebsite?.adult_li_price,
                                delivery_time: editingWebsite?.delivery_time,
                                word_limit: editingWebsite?.word_limit,
                                gp_site1: editingWebsite?.gp_site1,
                                gp_site2: editingWebsite?.gp_site2,
                                gp_site3: editingWebsite?.gp_site3,
                                special_requirment: editingWebsite?.special_requirment,
                                postType: 'normal',
                            }}
                            onFinish={handleModalOk}
                            key={formKey}
                            className="custom-form"
                        >
                            <Form.Item
                                label="Website URL"
                                name="url"
                                rules={[{ validator: validateUrl, required: true, message: 'Please enter a valid URL.' }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input type="text" required placeholder="http://www.example.com" disabled />
                            </Form.Item>
                            <Form.Item
                                label="Language"
                                name="website_lang"
                                rules={[{ required: true, message: 'Field is required.' }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Select required initialValue={editingWebsite?.website_lang}>
                                    {langs.map((lang) => (
                                        <Option key={lang.uid} value={lang.uid}>
                                            {lang.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Countries"
                                name="country"
                                rules={[{ required: true, message: 'Field is required.' }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Select 
                                mode="multiple"
                                required 
                                getPopupContainer={(trigger) => trigger.parentNode}  
                                initialValue={editingWebsite?.country}>
                                    {countries.map((country) => (
                                        <Option key={country.id} value={country.id}>
                                            {country.name}
                                        </Option>
                                    ))}
                                </Select>  
                            </Form.Item>
                            <Form.Item
                                label="Max Links"
                                name="max_link"
                                rules={[{ required: true, message: 'Field is required.' }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input type="number" max={3} step="0.01" min={0} required placeholder="Max Links" />
                            </Form.Item>
                            <Form.Item label="Link Type" name="linktype" rules={[{ required: true, message: 'Field is required.' }]} labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}>
                                <Select required initialValue={editingWebsite?.linktype}>
                                    {selected_LinkType.map((linkType) => (
                                        <Option key={linkType.uid} value={linkType.uid}>
                                            {linkType.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
 {/* Render fields based on the selected post type */}
 {postType === 'normal' && (
        <>
            <Form.Item
                label="Content Placement Price ($)"
                name="content_p_price"
                rules={[{ required: true, message: 'Field is required.' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="Content Placement Price" required />
            </Form.Item>
            <Form.Item
                label="Content Creation And Placement Price ($)"
                name="content_cp_price"
                rules={[{ required: true, message: 'Field is required.' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="Content Creation Price" required />
            </Form.Item>
            {(editingWebsite?.partner || editingWebsite?.admin) && (
                <Form.Item
                    label="Link Insert Price ($)"
                    name="link_insert_price"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input type="number" step="0.01" min={0} placeholder="Link Insert Price" />
                </Form.Item>
            )}
        </>
    )}

    {postType === 'cbd' && (
        <>
            <Form.Item
                label="CBD Placement Price ($)"
                name="cbd_p_price"
                rules={[{ required: true, message: 'Field is required.' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="CBD Placement Price" required />
            </Form.Item>
            <Form.Item
                label="CBD Creation And Placement Price ($)"
                name="cbd_cp_price"
                rules={[{ required: true, message: 'Field is required.' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="CBD Creation Price" required />
            </Form.Item>
            <Form.Item
                label="CBD Link Insert Price ($)"
                name="cbd_li_price"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="CBD Link Insert Price" />
            </Form.Item>
        </>
    )}

    {postType === 'adult' && (
        <>
            <Form.Item
                label="Adult Placement Price ($)"
                name="adult_p_price"
                rules={[{ required: true, message: 'Field is required.' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="Adult Placement Price" required />
            </Form.Item>
            <Form.Item
                label="Adult Creation And Placement Price ($)"
                name="adult_cp_price"
                rules={[{ required: true, message: 'Field is required.' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="Adult Creation Price" required />
            </Form.Item>
            <Form.Item
                label="Adult Link Insert Price ($)"
                name="adult_li_price"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input type="number" step="0.01" min={0} placeholder="Adult Link Insert Price" />
            </Form.Item>
        </>
    )}

                                {(editingWebsite?.partner || editingWebsite?.admin) && (
    <Form.Item
        label="Select Post Type"
        name="postType"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
    >
        <Radio.Group  onChange={handlePostTypeChange} value={postType}>
            <Radio value="normal">Normal Post</Radio>
            <Radio value="cbd">CBD / Casino Post</Radio>
            <Radio value="adult">Adult Post</Radio>
        </Radio.Group>
    </Form.Item>
)}

                            <Form.Item label="Delivery Time" name="delivery_time" rules={[{ required: true, message: 'Field is required.' }]} labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}>
                                <Input type="number" placeholder="Delivery Time" required />
                            </Form.Item>
                            <Form.Item label="Word Limit" name="word_limit" rules={[{ required: true, message: 'Field is required.' }]} labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}>
                                <Input placeholder="Word Limit" max={5000} min={250} step={250} required />
                            </Form.Item>
                            <Form.Item label="GP Site 1" name="gp_site1" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input type="text" placeholder={`/example-1`} />
                            </Form.Item>
                            {/* <Form.Item label="GP Site 2" name="gp_site2" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input type="text" placeholder={`/example-2`} />
                            </Form.Item>
                            <Form.Item label="GP Site 3" name="gp_site3" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input type="text" placeholder={`/example-3`} />
                            </Form.Item> */}
        <Form.Item
            label={
                <div className="flex justify-between items-center">
                    <span>Categories</span>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-2 p-1 border rounded"
                    />
                </div>
            }
            name="category"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 md:max-h-[200px] overflow-y-auto border px-4 py-1">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((selectedcategory) => (
                        <div key={selectedcategory.uid} className="flex items-center justify-start mr-2">
                            <input
                                type="checkbox"
                                className="mr-2 h-4 w-4"
                                checked={checkedCategories.includes(selectedcategory.uid)}
                                onChange={() => handleCheckboxChange(selectedcategory.uid)}
                                disabled={
                                    !checkedCategories.includes(selectedcategory.uid) &&
                                    checkedCategories.length >= 3
                                }
                            />
                            <p>{selectedcategory.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>
        </Form.Item>

                            <Form.Item label="Special Requirements" name="special_requirment" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input.TextArea maxLength={800} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="" htmlType="submit" className="bg-blue px-4 w-full text-white">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        </>
    );
};


export default AntDesignTable;

