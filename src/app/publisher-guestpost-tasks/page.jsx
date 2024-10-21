"use client"
import DefaultLayout from '@/components/PublisherLayouts/DefaultLaout'
import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Space, Popover, Modal, Form, Select } from 'antd';
import { FaChevronRight, FaEye } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { FaRegCirclePause } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { useWebsites } from '@/helpers/WebsiteContext'
import { useRouter } from 'next/navigation';
import { FaRegEye } from "react-icons/fa";
import { formated_date } from '@/utils/custom-functions';
import { FaRegCopy } from "react-icons/fa";
import toast from 'react-hot-toast';


const Page = () => {

    const router = useRouter();
    const [isRotated, setIsRotated] = useState(false);
    const [activeTab, setActiveTab] = useState('Not Started');
    const [currentPage, setCurrentPage] = useState(1 || localStorage.getItem('publisherTasksCurrentPage'));

    useEffect(() => {
        Aos.init({});
        publisher_Tasks();

        // const savedTab = localStorage.getItem('publisherTasksActiveTab');
        // const savedPage = localStorage.getItem('publisherTasksCurrentPage');

        // if (savedTab) {
        //     setActiveTab(savedTab);
        // }

        // if (savedPage) {
        //     setCurrentPage(parseInt(savedPage, 10));
        // }
        // localStorage.removeItem('publisherTasksActiveTab')
    }, []);


    const { publisherTasks, publisher_Tasks, loading } = useWebsites();
    // console.log(publisherTasks);


    const sumOfRejectedTask = publisherTasks.reduce((sum, publisherTasks) => {
        return publisherTasks.task_status.title === "Rejected" ? sum + 1 : sum;
    }, 0);
    const sumOfCompletedTask = publisherTasks.reduce((sum, publisherTasks) => {
        return publisherTasks.task_status.title === "Completed" ? sum + 1 : sum;
    }, 0);
    const sumOfInProgressTask = publisherTasks.reduce((sum, publisherTasks) => {
        return publisherTasks.task_status.title === "In Progress" ? sum + 1 : sum;
    }, 0);
    const sumOfPendingApprovalTask = publisherTasks.reduce((sum, publisherTasks) => {
        return publisherTasks.task_status.title === "Pending Approval" ? sum + 1 : sum;
    }, 0);
    const sumOfNotStartedTask = publisherTasks.reduce((sum, publisherTasks) => {
        return publisherTasks.task_status.title === "Not Started" ? sum + 1 : sum;
    }, 0);
    const sumOfImprovementTask = publisherTasks.reduce((sum, publisherTasks) => {
        return publisherTasks.task_status.title === "Improvement" ? sum + 1 : sum;
    }, 0);
    const sumOfAwaitingTask = publisherTasks.reduce((sum, publisherTasks) => {
        return publisherTasks.task_status.title === "Awaiting" ? sum + 1 : sum;
    }, 0);



    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // localStorage.setItem('publisherTasksActiveTab', tab);
    };
    const handleTableChange = (pagination) => {
        const { current } = pagination;
        setCurrentPage(current);
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
        // {
        //     title: 'Buyer',
        //     dataIndex: ['buyerDetails','username'],
        //     key: ['buyerDetails','username'],
        //     render: (text) => {
        //         return (
        //             <h3 className='dark:text-blue-500'>{(text)}</h3>);
        //     },
        // },
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
            dataIndex: 'publisher_amount',
            key: 'publisher_amount',
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
        }
        ,
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
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
                );
            },
        },
    ];

    const taskData = {
        'Not Started': publisherTasks.filter(task => task.task_status.title === "Not Started"),
        'In Progress': publisherTasks.filter(task => task.task_status.title === "In Progress"),
        'Pending Approval': publisherTasks.filter(task => task.task_status.title === "Pending Approval"),
        'Improvement': publisherTasks.filter(task => task.task_status.title === "Improvement"),
        'Awaiting': publisherTasks.filter(task => task.task_status.title === "Awaiting"),
        'Completed': publisherTasks.filter(task => task.task_status.title === "Completed"),
        'Rejected': publisherTasks.filter(task => task.task_status.title === "Rejected"),
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


    return (
        <>
            <DefaultLayout>
                <div className='bg-white rounded-xl p-4 shadow-md dark:bg-dark dark:text-white'>
                    <h1 className='text-center text-lg md:text-xl font-bold'>{activeTab} Tasks</h1>
                    <div onClick={() => setIsRotated(!isRotated)} className={`w-full h-[100px] md:h-[50px] bg-newcolor mt-4 rounded-lg flex items-center p-4 gap-4 cursor-pointer transition-all ease-in-out duration-300 hover:bg-gradient-to-r from-primary to-[#2c7be5] mb-4 ${isRotated ? 'bg-gradient-to-r from-primary to-[#2c7be5]' : 'bg-[rgba(87,80,241,0.7)]'}`}>
                        <FaChevronRight
                            className={`text-white transform transition-transform duration-300 ${isRotated ? 'rotate-90' : ''}`}
                        />
                        <p className='text-white md:font-bold'>Please click here to read and familiarise yourself with things you can and cannot do.</p>
                    </div>

                    {isRotated && (
                        <div className='h-[80vh] md:h-[50vh] bg-white my-4 transition-all ease-in-out duration-300 flex flex-col gap-2 p-4 text-gray-600 font-medium overflow-auto dark:bg-dark dark:text-white' data-aos='fade-down'>
                            <p className='text-sm md:text-base'>• Before you start working on a task, make sure you have accepted it.</p>
                            <p className='text-sm md:text-base'>• Reject the task as soon as you think you cannot complete it.</p>
                            <p className='text-sm md:text-base'>• The article must not be on the subdomain.</p>
                            <p className='text-sm md:text-base'>• Dont ask the buyer to approve the task.</p>
                            <p className='text-sm md:text-base'>• If the Buyer doesnt approve the task, it will be automatically marked as approved after 3 days.</p>
                            <p className='text-sm md:text-base'>• If the Buyer requests any changes, make sure you fix it as soon as possible if not the task may be cancelled by the buyer or Vefogix.</p>
                            <p className='text-sm md:text-base'>• Before you deliver the task, make sure that all links and target URLs are in place and follow all the instructions.</p>
                            <p className='text-sm md:text-base'>• Dont try to renegotiate the price with the Buyer.</p>
                            <p className='text-sm md:text-base'>• Dont exchange email, phone numbers or links to any sites with the Buyer.</p>
                            <p className='text-sm md:text-base'>• We read all messages and we reserve the right to suspend or ban your account if you fail any of these rules.</p>
                            <p className='text-sm md:text-base'>• As a website Owner: After delivering the task, if the Buyer doesnt approve it, it will be automatically marked as complete after 3 days and the funds will be Available For Withdrawal.</p>
                            <p className='text-sm md:text-base'>• As a contributor on a website: After delivering the task, if the Buyer doesnt approve it, it will be automatically marked as complete after 3 days and the funds will move to your Balance Awaiting and will be Available For Withdrawal After 21 Days.</p>
                            <p className='text-sm md:text-base'>• Payments are made weekly (Every Monday). Please Make sure to request your payment before Sunday Midnight UK Time.</p>
                        </div>
                    )}

                    <div className="w-full h-full md:h-[50px] flex flex-col md:flex-row mb-4 dark:bg-dark dark:text-white">
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
                        pagination={{ pageSize: 10, current: currentPage }}
                        scroll={{ x: 'max-content' }}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </div>
            </DefaultLayout>
        </>
    );
}

export default Page;

