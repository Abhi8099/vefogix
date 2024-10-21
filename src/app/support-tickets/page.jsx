"use client"
import React, { useEffect, useState } from 'react'
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import { Button, Table, Space, Input, Select, Checkbox, InputNumber, Form, Modal, Label } from 'antd';
import { FaChevronRight } from 'react-icons/fa';
import { GrDocumentConfig } from 'react-icons/gr';
import { LuFileEdit } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import { formated_date } from '@/utils/custom-functions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FormLabel } from '@mui/material';
import Cookies from 'js-cookie';


const Page = () => {
    const router = useRouter()

    const columns = [
        {
            title: 'Ticket ID.',
            dataIndex: 'uid',
            uid: 'key',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => {
                return (
                    <h3 className='dark:text-blue-500'>{formated_date(text)}</h3>);
            },
        },
        {
            title: 'Ticket Issue',
            dataIndex: 'ticket_issue_display',
            key: 'ticket_issue_display',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <div className='flex items-center gap-2 dark:text-blue-500'>
                    {status ? <span className='text-green-200 bg-green-500 px-2 py-1 rounded-md font-medium'> Open Ticket </span> : <span className='text-red-200 bg-red-500 px-2 py-1 rounded-md font-medium'> Closed Ticket </span>}
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (action, record) => (
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => router.push(`/ticket-details/${record.uid}`)}
                            className='bg-primary text-white cursor-pointer text-center py-1 w-[50px] flex items-center justify-center  rounded-lg'
                        >
                            <FaRegEye className='text-xl text-center' />
                        </button>
                    </div>
                </div>
            ),
        },
    ];


    const { Option } = Select;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    // console.log(selectedCategory);
    
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        if (!value) {
            setText(''); 
        setTitle('');
            setIsButtonEnabled(false);
        }
    };

    const handleTextChange = (e) => {
        const value = e.target.value;
        setText(value);
        setIsButtonEnabled(value.trim().length > 0);
    };
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);

    };

    const [tickets, setTickets] = useState()

    useEffect(() => {
        fetchTickets();
    }, [])

    const fetchTickets = async () => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.get(`${BASE_URL}tickets/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('fetchTickets:', response.data);
            setTickets(response.data)
            setIsModalOpen(false);
            return response;
        } catch (error) {
            console.error('Error adding website:', error.response || error);
        }
    };


    const handleCreateClick = async () => {
        const token = Cookies.get("login_access_token");
        try {
            const data={
                ticket_items: [{
                    "message": text
                }],
                ticket_issue: selectedCategory,
                title: title,
            }
            // console.log("data",data)
            const response = await axios.post(`${BASE_URL}tickets/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                });
            toast.success("Ticket Added Successfully.");
            // console.log('fetchTickets:', response.data);
            setIsModalOpen(false);
            fetchTickets();
            setSelectedCategory("");
            setTitle("");
            setText("");
            return response;
        } catch (error) {
            console.error('Error adding website:', error.response || error);
        }
    };


    return (
        <DefaultLayout>
            <div className='h-[150px] md:h-[100px] w-full bg-white mb-4 rounded-lg flex flex-col gap-2 py-4 dark:bg-dark dark:text-white '>
                <h1 className='text-center text-lg md:text-xl font-bold'>Support Tickets</h1>
                <p className='text-center'>
                    Manage your support tickets efficiently by keeping track of all the requests and their statuses in one place.
                </p>

            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className='bg-primary text-white text-base rounded-lg px-4 py-1 mb-4 flex gap-2 items-center  group hover:bg-blue-500 transition-all ease-in-out duration-300'
            >
                <GrDocumentConfig className='group-hover:scale-125 transition-all ease-in-out duration-300' />
                Create New Ticket
            </button>

            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                className=""
            >
                <div className='flex justify-between w-[80vw]  md:w-[900px] mx-auto h-full px-6 py-8 flex-col gap-4'>
                    <h1 className='text-center text-lg md:text-xl font-semibold'>Create New Ticket</h1>
                    <label htmlFor="title">Topic</label>
                    <Select
                        placeholder="Select a topic"
                        style={{ width: '100%', height: "40px" }}
                        className="mb-2 border rounded-md"
                        onChange={handleCategoryChange}
                    >
                        <Option value="" disabled>Select a Topic</Option>
                        <Option value="account">Accounts</Option>
                        <Option value="billing">Billing</Option>
                        <Option value="app">App Platform</Option>
                        <Option value="website">VefoGix Sites</Option>
                        <Option value="others">Others</Option>
                    </Select>

                    {selectedCategory && (
                        <>
                            <label htmlFor="title">Title</label>
                            <Input
                                placeholder="Title"
                                className='h-10'
                                required
                                value={title}
                                onChange={handleTitleChange}
                            >
                            </Input>
                            <label htmlFor="title">Issue</label>
                            <textarea
                                rows={5}
                                required
                                className="w-full border rounded-lg p-3 outline-none"
                                placeholder="Describe your issue here..."
                                value={text}
                                onChange={handleTextChange}
                            />

                            <button
                                onClick={handleCreateClick}
                                className={`bg-primary text-white w-[200px] justify-center text-base rounded-lg px-4 py-1 mb-4 flex gap-2 items-center group hover:bg-blue-500 transition-all ease-in-out duration-300 ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed hover:bg-primary' : ''}`}
                                disabled={!isButtonEnabled}
                            >
                                <IoCreateOutline className={`group-hover:scale-125 transition-all ease-in-out duration-300 text-xl ${!isButtonEnabled ? 'group-hover:scale-100' : ''}`} />
                                Create
                            </button>
                        </>
                    )}
                </div>

            </Modal>


            <div className="table-container shadow-lg rounded-lg bg-white p-5 dark:bg-dark dark:text-white">
                <h1 className='text-center text-lg md:text-xl font-bold'>My Tickets</h1>

                <Table
                    columns={columns}
                    dataSource={tickets}
                    pagination={{
                        pageSize: 10
                    }}
                    scroll={{ x: 'max-content' }}
                    rowKey=""
                />
            </div>
        </DefaultLayout>
    )
}

export default Page
