"use client"
import DefaultLayout from '@/components/PublisherLayouts/DefaultLaout'
import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Space, Popover, Modal, Checkbox, Select } from 'antd';
import { FaChevronRight, FaEye, FaRegCopy } from "react-icons/fa";
import { TbEdit, TbInvoice } from "react-icons/tb";
import { FaRegCirclePause } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { useWebsites } from '@/helpers/WebsiteContext'
import { useRouter } from 'next/navigation';
import { FaRegEye } from "react-icons/fa";
import styles from "./styles.module.css";
import { SiTicktick } from 'react-icons/si';
import { BASE_URL } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import { formated_date } from '@/utils/custom-functions';
import Cookies from 'js-cookie';

const Page = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { buyerTasks, buyer_Tasks } = useWebsites();
    // console.log(buyerTasks);
    
    const [isRotated, setIsRotated] = useState(false);
    const [activeTab, setActiveTab] = useState('Not Started');

    useEffect(() => {   
        buyer_Tasks();
        // const savedTab = localStorage.getItem('buyerTasksActiveTab');
        // if (savedTab) {
        //     setActiveTab(savedTab);
        // }
        // localStorage.removeItem('buyerTasksActiveTab')
    }, []);



    const sumOfRejectedTask = buyerTasks.reduce((sum, buyerTasks) => {
        return buyerTasks.task_status.title === "Rejected" ? sum + 1 : sum;
    }, 0);
    const sumOfCompletedTask = buyerTasks.reduce((sum, buyerTasks) => {
        return buyerTasks.task_status.title === "Completed" ? sum + 1 : sum;
    }, 0);
    const sumOfInProgressTask = buyerTasks.reduce((sum, buyerTasks) => {
        return buyerTasks.task_status.title === "In Progress" ? sum + 1 : sum;
    }, 0);
    const sumOfPendingApprovalTask = buyerTasks.reduce((sum, buyerTasks) => {
        return buyerTasks.task_status.title === "Pending Approval" ? sum + 1 : sum;
    }, 0);
    const sumOfAwaitingTask = buyerTasks.reduce((sum, buyerTasks) => {
        return buyerTasks.task_status.title === "Awaiting" ? sum + 1 : sum;
    }, 0);
    const sumOfNotStartedTask = buyerTasks.reduce((sum, buyerTasks) => {
        return buyerTasks.task_status.title === "Not Started" ? sum + 1 : sum;
    }, 0);
    const sumOfImprovementTask = buyerTasks.reduce((sum, buyerTasks) => {
        return buyerTasks.task_status.title === "Improvement" ? sum + 1 : sum;
    }, 0);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // localStorage.setItem('buyerTasksActiveTab', tab);
    };
    const columns = [
        {
            title: 'Task ID',
            dataIndex: 'uid',
            key: 'uid',
            render: (text) => {
                return (
                    <h3 className='dark:text-blue-500'>{(text)}</h3>);    
            },
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
            title: 'Website Domain',
            dataIndex: 'publishersite_domain',
            key: 'publishersite_domain',
            render: (text) => {
                return (
                    <h3 className='dark:text-blue-500'>{(text)}</h3>);     
            },
        },
        {
            title: 'Target URL',
            dataIndex: 'target_url',
            key: 'target_url',
            render: (text) => {
                const maxLength = 30;
                const shortenedText = text?.length > maxLength ? text?.slice(0, maxLength) + '...' : text;

                const handleCopy = () => {
                    navigator.clipboard.writeText(text).then(() => {
                        toast.success('Target URL copied to clipboard!');
                    }, (err) => {
                        console.error('Failed to copy text: ', err);
                    });
                };

                return (
                    <div className='flex items-center space-x-2 justify-between'>
                        {shortenedText && (
                            <>
                                <h3 className='dark:text-blue-500'>{shortenedText}</h3>
                                <FaRegCopy
                                    className='text-blue-500  hover:text-blue px-2 py-1 rounded text-3xl cursor-pointer hover:scale-110 transition-all ease-in-out duration-100'
                                    onClick={handleCopy}
                                />
                            </>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Post URL',
            dataIndex: 'post_url',
            key: 'post_url',
            render: (text) => {
                const maxLength = 30;
                const shortenedText = text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;
                const handleCopy = () => {
                    navigator.clipboard.writeText(text).then(() => {
                        toast.success('Post URL copied to clipboard!');
                    }, (err) => {
                        console.error('Failed to copy text: ', err);
                    });
                };
        
                return (
                    <div className='flex items-center space-x-2 justify-between'>
                        {shortenedText && (
                            <>
                                <h3 className='dark:text-blue-500'>{shortenedText}</h3>
                                <FaRegCopy
                                    className='text-blue-500 hover:text-blue px-2 py-1 rounded text-3xl cursor-pointer hover:scale-110 transition-all ease-in-out duration-100'
                                    onClick={handleCopy}
                                />
                            </>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'buyer_amount',
            key: 'buyer_amount',
            // render: (text) => "$" + text
            render: (text) => {
                return (
                    <h3 className='dark:text-blue-500'>{"$" + (text)}</h3>);    
            },
        },
        {
            title: 'Status',
            dataIndex: ['task_status', 'title'],
            key: 'task_status',
            render: (text) => {
                return (
                    <h3 className='dark:text-blue-500'>{(text)}</h3>);    
            },
        },
        {
            title: 'Message',
            dataIndex: 'messages',
            key: 'messages',
            render: (messages) => {
                return messages?.length > 0 ? (
                    <span className='rounded-full bg-primary/20 text-black px-2 md:py-1 ml-1 text-sm'>
                        {messages.length}
                    </span>
                ) : (
                    ''
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div className='flex gap-2'>
                        <FaRegEye
                            style={{
                                fontSize: '1.5em',
                                color: 'white',
                                backgroundColor: '#00d27a',
                                border: '1px solid #00d27a',
                                padding: '3px',
                                cursor: 'pointer',
                                height: '27px',
                                width: '40px',
                                borderRadius: '5px',
                            }}
                            onClick={() => window.open(`/publisher-task-view?uid=${record.uid}`, '_blank')}
                        />
                        {record.task_status.title === "Completed" &&
                                                <TbInvoice
                                                style={{
                                                    fontSize: '1.5em',
                                                    color: 'white',
                                                    backgroundColor: 'rgba(87, 80, 241, 0.7)',
                                                    border: '1px solid rgba(87, 80, 241, 0.7)',
                                                    padding: '3px',
                                                    cursor: 'pointer',
                                                    height: '27px',
                                                    width: '40px',
                                                    borderRadius: '5px',
                                                }}
                                                onClick={() => setIsModalOpen(true)}
                                            />
                        }

                    </div>
                );
            },
        },
    ];
    const taskData = {
        'Not Started': buyerTasks.filter(task => task.task_status.title === "Not Started"),
        'In Progress': buyerTasks.filter(task => task.task_status.title === "In Progress"),
        'Pending Approval': buyerTasks.filter(task => task.task_status.title === "Pending Approval"),
        'Improvement': buyerTasks.filter(task => task.task_status.title === "Improvement"),
        'Awaiting': buyerTasks.filter(task => task.task_status.title === "Awaiting"),
        'Completed': buyerTasks.filter(task => task.task_status.title === "Completed"),
        'Rejected': buyerTasks.filter(task => task.task_status.title === "Rejected"),
    };
    const taskCounts = {
        'Not Started': sumOfNotStartedTask,
        'In Progress': sumOfInProgressTask,
        'Pending Approval': sumOfPendingApprovalTask,
        'Improvement': sumOfImprovementTask,
        'Awaiting': sumOfAwaitingTask,
        'Completed': sumOfCompletedTask,
        'Rejected': sumOfRejectedTask,
    };

    const onChange = (e) => {
        // console.log(`checked = ${e.target.checked}`);
    };
    const [selectedTask, setSelectedTask] = useState(null);
    // console.log(selectedTask);
    
    const handleRowClick = (record) => {
        setSelectedTask(record);
    };


    const [da_ta, set_Data] = useState();
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
                const data = response.data;
                set_Data(data);
            } catch (error) {
                console.error('Error fetching projects:', error.response);
            }
        };
        fetchUsers();
    }, []);
    return (
        <DefaultLayout>
            <div className='bg-white rounded-xl p-4 shadow-md dark:bg-dark dark:text-white'>
                <h1 className='text-center text-lg md:text-xl font-bold'>Guest Post Tasks {activeTab}</h1>


                <div className="w-full h-full flex-col md:flex-row md:h-[50px] flex my-4 dark:bg-dark dark:text-white">
                    {Object.keys(taskData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`text-sm md:text-base md:font-medium flex-1 rounded-lg  mx-3   transition-all ease-in-out duration-300 ${activeTab === tab ? 'bg-newcolor  text-white' : 'bg-[#F3F3F3]'} hover:bg-newcolor hover:text-white dark:bg-dark dark:text-white `}
                        >
                            {tab} {taskCounts[tab] > 0 && <span className="rounded-lg bg-white text-black px-2 py-1 text-sm ml-1">{taskCounts[tab]}</span>}
                        </button>
                    ))}
                </div>

                <Table
                    columns={columns}
                    dataSource={taskData[activeTab]}
                    rowKey="uid"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
                    className='dark:bg-dark dark:text-white'
                />
            </div>

            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                className=""
            >
                <div className='flex justify-between w-[900px] mx-auto h-full px-6 py-8'>
                    <Image
                        src={"/images/new/logo-no-background.svg"}
                        height={100}
                        width={200}
                        alt='Invoice Image'
                        className='object-contain'
                    />
                    <div className='flex items-center justify-center text-xl font-semibold px-6 py-2 w-[200px] rounded-md text-white bg-primary'>
                        Invoice
                    </div>
                </div>

                <div className='flex justify-between w-full max-w-screen-lg mx-auto px-6 py-4'>
                    <div className='flex-1 flex flex-col gap-4'>
                        <div>
                            <span className='text-base font-semibold'>To:</span> <br />
                            <span className="text-gray-800 text-base">{da_ta?.username}</span><br />
                            <span className="text-gray-800 text-base">{da_ta?.email}</span><br />
                        </div>
                        {/* <div>
                            <span className='text-base '>Total unpaid:<span className='text-base font-semibold'>{" "}${selectedTask?.buyer_amount || 'N/A'}</span></span> <br />
                            <span className='text-base '>Total Paid:<span className='text-base font-semibold'>{" "}${selectedTask?.buyer_amount || 'N/A'}</span></span> <br />

                        </div> */}
                        <div>
                            <div className="flex flex-col">
                                <span className=" text-base">Task Type:{" "}<span className=" text-base font-semibold">{selectedTask?.task_type === "cp" && "Content Placement" || selectedTask?.task_type === "ccp" && "Content Creation And Placement" || selectedTask?.task_type === "li" && "Link Insertion"}</span></span>

                            </div>
                        </div>
                    </div>

                    <div className='flex-1 flex flex-col gap-4'>
                        <span className={`text-${selectedTask?.paid_status ? 'green-600' : 'red-600'} font-semibold  px-4 py-2 rounded-md bg-${selectedTask?.paid_status ? 'green-200' : 'red-200'} `}>
                            {selectedTask?.paid_status ? 'Paid' : 'Unpaid'}
                        </span>

                        <div className='w-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-md overflow-hidden'>
                            <table className='w-full table-auto'>
                                <tbody>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className='px-4 py-2 font-semibold'>Invoice Number</td>
                                        <td className='px-4 py-2'>{selectedTask?.uid}</td>
                                    </tr>
                                    <tr className='bg-white border-b'>
                                        <td className='px-4 py-2 font-semibold'>Order Number</td>
                                        <td className='px-4 py-2'></td>
                                    </tr>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className='px-4 py-2 font-semibold'>Invoice Date</td>
                                        <td className='px-4 py-2'>{new Date(selectedTask?.created_at).toLocaleDateString()}</td>
                                    </tr>
                                    <tr className='bg-white'>
                                        <td className='px-4 py-2 font-semibold'>Sub Total</td>
                                        <td className='px-4 py-2 '>${selectedTask?.buyer_amount}</td>
                                    </tr>
                                    <tr className='bg-gray-100'>
                                        <td className='px-4 py-2 font-semibold'>Tax</td>
                                        <td className='px-4 py-2 '>$0.00</td>
                                    </tr>
                                    <tr className='bg-white'>
                                        <td className='px-4 py-2 font-semibold'>Total Due</td>
                                        <td className='px-4 py-2 text-blue-600 font-semibold'>${selectedTask?.buyer_amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='flex w-[900px] mx-auto h-full px-6 py-2 text-base  text-white justify-center bg-primary'>
                    Thanks for choosing Vefogix


                    {/* <LinkPreview
                        url="http://143.110.240.167:8080/"
                        className="cursor-pointer mx-3 hover:text-white text-white hover:scale-105 transition-all ease-in-out duration-300 "
                    >
                        <Link target='_blank' href={"mailto:support@Vefogix.com"} className='hover:text-white text-white'>
                        support@Vefogix.com
                        </Link>
                        
                    </LinkPreview> */}

                </div>

            </Modal>


        </DefaultLayout>
    )
}

export default Page

