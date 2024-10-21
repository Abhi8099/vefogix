"use client"
import DefaultLayout from '@/components/PublisherLayouts/DefaultLaout'
import { BASE_URL } from '@/utils/api';
import { Modal, Checkbox, Button, message, Popconfirm, Input, Popover, Drawer, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { FaChevronRight, FaRegCopy } from 'react-icons/fa';
import Aos from "aos";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import "aos/dist/aos.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useWebsites } from '@/helpers/WebsiteContext';
import toast from 'react-hot-toast';
import { VscDebugRestartFrame } from "react-icons/vsc";
import styles from "./styles.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineWorkHistory } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { RiUserSmileLine } from "react-icons/ri";
import Image from 'next/image';
import { BiInfoCircle } from "react-icons/bi";
import { gsap } from 'gsap';
import { formated_date } from '@/utils/custom-functions';
import { formatDistanceToNow } from 'date-fns';
import Cookies from 'js-cookie';


const TaskView = () => {


    const { publisher_Tasks } = useWebsites();

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        Aos.init({});
    }, []);
    const [uid, setUid] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const uidParam = params.get('uid');
        if (uidParam) {
            setUid(uidParam);
        }
    }, []);

    const [data, setData] = useState();
    // console.log(data);

    const [websites, setWebsites] = useState();
    const quillRef = useRef(null);
    const [chatText, setChatText] = useState('');

    const handleChatChange = (event) => {
        setChatText(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const showLoading = () => {
        setOpen(true); // This will synchronously set the state
    };
    const [scrollTrigger, setScrollTrigger] = useState(false);

    useEffect(() => {
        if (open) {
            setScrollTrigger(true);
        } else {
            setScrollTrigger(false);
        }
    }, [open]);

    useEffect(() => {
        if (scrollTrigger) {
            const timer = setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [scrollTrigger, data?.messages]);




    const addChat = async () => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.post(`${BASE_URL}task-message/`,
                {
                    task_id: data?.uid,
                    message: chatText,
                }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Chat added successfully:', response);
            toast.success("Message sent successfully")
            const params = new URLSearchParams(window.location.search);
            const uidParam = params.get('uid');
            await publisher_tasks(uidParam);
            setChatText('');
            return response;
        } catch (error) {
            console.error('Error adding chat:', error.response || error);
        }
    };



    const publisher_tasks = async (uid) => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.post(`${BASE_URL}my-tasks/task_detail/`,
                {
                    uid: uid,
                    is_publisher: showButton ? true : false
                }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }

            });
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch publisherTasks:', error);
            router.back();
        }
    };
    const taskType = data && data.task_type;

    const messagesEndRef = useRef(null);


    const publisher_Tasks_Change = async (event) => {
        event.preventDefault()
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.put(`${BASE_URL}my-tasks/${uid}/`, {
                taskstatus: "2deed0bc-c233-43e2-ab11-70dfd5f164c9",
                task_type: taskType,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setIsModalOpen(false)
            // console.log("publisher_Tasks_Change",response.data);
            setData(response.data);
            publisher_Tasks();
            toast.success("The task has been sent in progress.")
            // router.push('/publisherGuestPostTasks')
        } catch (error) {
            console.error('Failed to fetch publisherTasks:', error);
        }
    };


    const url = data && (data.publishersite);
    // console.log(url);
    const fetchWebsites = async (url) => {
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.get(`${BASE_URL}publisher-sites/${url}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            // console.log(response.data);
            setWebsites(response.data);
        } catch (error) {
            console.error('Failed to fetch websites:', error);
        }
    };
    useEffect(() => {
        if (uid) {
            publisher_tasks(uid);
        }
    }, [uid]);

    useEffect(() => {
        if (data && data.publishersite) {
            fetchWebsites(data.publishersite);
        }
    }, [data]);

    const [isRotated, setIsRotated] = useState(false);

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const isPublisher = localStorage.getItem('isPublisher');
        if (isPublisher === `true`) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, []);

    const [checked, setChecked] = useState({
        task1: false,
        task2: false,
        task3: false,
        task4: false,
        task5: false,
        task6: false,
        task7: false,
        task8: false,
        task9: false
    });

    const onChange = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const selectAll = () => {
        const allChecked = Object.values(checked).every(value => value);
        if (allChecked) {
            // Uncheck all if they are already all checked
            setChecked({
                task1: false,
                task2: false,
                task3: false,
                task4: false,
                task5: false,
                task6: false,
                task7: false,
                task8: false,
                task9: false
            });
        } else {
            // Check all if they are not all checked
            setChecked({
                task1: true,
                task2: true,
                task3: true,
                task4: true,
                task5: true,
                task6: true,
                task7: true,
                task8: true,
                task9: true
            });
        }
    };

    const [postPlacementURL, setPostPlacementURL] = useState(data && (data.post_url) || '');
    const [isValidURL, setIsValidURL] = useState(true);

    const validateURL = (url) => {
        const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
        return regex.test(url);
    };

    useEffect(() => {
        setIsValidURL(validateURL(postPlacementURL));
    }, [postPlacementURL]);

    const ppURL = (event) => {

        const url = event.target.value || "";
        setPostPlacementURL(url);
        setIsValidURL(validateURL(url));
    };


    const ppURLupdate = async (event) => {
        event.preventDefault()
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.put(`${BASE_URL}my-tasks/${uid}/`, {
                taskstatus: "fc1e5d23-68a7-4755-bf6b-d4ebbdcacb0a",
                task_type: taskType,
                post_url: postPlacementURL,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setData(response.data);
            // console.log(response.data);
            publisher_Tasks();
            toast.success("The task has been sent for approval")
            // router.push('/publisherGuestPostTasks')
        } catch (error) {
            console.error('Failed to fetch publisherTasks:', error);
        }
    };


    const ppURL_update = async (event) => {
        // console.log(postPlacementURL);
        event.preventDefault()
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.put(`${BASE_URL}my-tasks/${uid}/`, {
                taskstatus: "2e771c7d-cfe1-4ef2-9769-a37cea2f02aa",
                task_type: taskType,
                post_url: postPlacementURL,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setData(response.data);
            // console.log(response.data);
            publisher_Tasks();
            handleInputBlur();
            toast.success("The Post Url has been Updated")
            // router.push('/publisherGuestPostTasks')
        } catch (error) {
            console.error('Failed to fetch publisherTasks:', error);
        }
    };
    const completeupdate = async (event) => {
        event.preventDefault()
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.put(`${BASE_URL}my-tasks/${uid}/`, {
                taskstatus: "eadb51a1-3433-4a70-89ce-bbfcb2d5ab1d",
                task_type: taskType,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setData(response.data);
            // console.log(response.data);
            publisher_Tasks();
            toast.success("The task has been sent for complete")
        } catch (error) {
            console.error('Failed to fetch publisherTasks:', error);
        }
    };
    const improvementupdate = async (event) => {
        event.preventDefault()
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.put(`${BASE_URL}my-tasks/${uid}/`, {

                taskstatus: "2e771c7d-cfe1-4ef2-9769-a37cea2f02aa",
                improvement_text: impReason,
                task_type: taskType,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setData(response.data);
            // console.log(response.data);
            publisher_Tasks();
            toast.success("The task has been sent for improvement")
        } catch (error) {
            console.error('The task has not been sent for improvement', error);
        }
    };
    const awaitingupdate = async (event) => {
        event.preventDefault()
        const token = Cookies.get("login_access_token");
        try {
            const response = await axios.put(`${BASE_URL}my-tasks/${uid}/`, {
                taskstatus: "97cb629b-d405-4a84-9fcb-07b933c3754b",
                task_type: taskType,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setData(response.data);
            // console.log(response.data);
            publisher_Tasks();
            toast.success("The task has been sent awaiting")
        } catch (error) {
            console.error('Failed to fetch publisherTasks:', error);
        }
    };
    const con_firm = async (event) => {
        event.preventDefault()
        const token = Cookies.get("login_access_token");
        if (reason && reason.trim() !== "") {

            try {
                const response = await axios.put(`${BASE_URL}my-tasks/${uid}/`, {
                    taskstatus: "7bb73c4e-fbee-4e37-b039-4877fdad6f43",
                    rejection_reason: reason,
                    task_type: taskType,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                setData(response.data);
                // console.log(response.data);
                publisher_Tasks();
                toast.success("The task has been Rejected")
            } catch (error) {
                console.error('Failed to fetch publisherTasks:', error);
            }
        }
        else {
            toast.error("Please enter a reason for rejection")
        }

    };

    const can_cel = (e) => {
        // console.log(e);
        message.error('Did Not Reject The Task');
    };

    const [reason, setReason] = useState('');
    const [impReason, setImpReason] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [postUrl, setPostUrl] = useState(data?.post_url || '');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setPostUrl(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };



    const created_at_date = new Date(data && data.created_at);
    if (isNaN(created_at_date.getTime())) {
        console.error('Invalid date:', data && data.created_at);
        return;
    }
    const formatted_date = created_at_date.toISOString().split('T')[0];
    const deliveryTime = websites?.delivery_time ? parseFloat(websites.delivery_time) : 0;
    const plus = isNaN(deliveryTime) ? 0 : deliveryTime;
    const parsedFormattedDate = new Date(formatted_date);
    const newFormatted_Date = new Date(parsedFormattedDate);
    newFormatted_Date.setDate(parsedFormattedDate.getDate() + plus);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const newFormattedDate = formatter.format(newFormatted_Date);

    const copyToClipboard = () => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor(); // Get the Quill editor instance
            if (editor) {
                const content = editor.getText(); // Get the plain text content
                if (content) {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(content) // Write the text to clipboard
                            .then(() => {
                                toast.success('Content copied to clipboard!');
                            })
                            .catch(err => {
                                console.error('Failed to copy content:', err);
                            });
                    } else {
                        // Fallback for older browsers or contexts where clipboard API is not available
                        const textarea = document.createElement('textarea');
                        textarea.value = content;
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                            document.execCommand('copy');
                            toast.success('Content copied to clipboard!');
                        } catch (err) {
                            console.error('Failed to copy content:', err);
                        } finally {
                            document.body.removeChild(textarea);
                        }
                    }
                } else {
                    console.error('No content found to copy');
                }
            } else {
                console.error('Editor instance not found');
            }
        } else {
            console.error('Quill reference is not set');
        }
    };

    const popoverContent = (
        <div className="text-red">
            We read all messages and your account will be suspended if you discuss the price of the service.
            It is prohibited to promote or make any negotiation or exchange email, phone numbers or links to any sites.
            We reserve the right to suspend or ban your account if you fail to follow this rule.
        </div>
    );

    return (
        <>


            <DefaultLayout>
                <div
                    onClick={showLoading}
                    className={`h-10 w-15 group rounded-s-lg hover:w-30 transition-all ease-in-out duration-100 cursor-pointer  bg-blue-500 flex items-center gap-2 justify-center  top-[50%] right-0 fixed z-99999 hover:bg-primary ${open ? "hidden" : ""}`} >
                    <AiOutlineMessage className='text-xl text-white' />
                    <p className='text-white hidden group-hover:block duration-100 transition-all ease-in-out '>Chat</p>
                </div>

                <Drawer
                    closable
                    destroyOnClose
                    title={
                        <div className='flex flex-col gap-1'>
                            <p className='text-center flex gap-1 items-center justify-center' ><AiOutlineMessage className='text-xl' /> Message</p>
                            <p className='text-center text-sm font-normal'>This Message Box Is For Task ID: {data && (data.uid)}</p>
                        </div>
                    }
                    placement="right"
                    open={open}
                    loading={loading}
                    onClose={() => setOpen(false)}
                >
                    <div className='flex flex-col h-full gap-2'>
                        <div className='flex-[4] bg-white overflow-y-auto flex flex-col gap-2  custom-scrollbar '>

                            {data?.messages?.length > 0 ?
                                (data?.messages?.map((item, index) => (
                                    <>
                                        <div
                                            key={item.uid}
                                            className={`w-full gap-2  py-2 px-4 rounded-lg ${item.is_current_user ? "bg-blue-100 text-black" : "text-black bg-red-100 "}  flex flex-col`}>
                                            <div className='flex border-b border-gray-5 items-center gap-2 pb-1'>
                                                <RiUserSmileLine className='text-xl' /> <span>{item.is_current_user ? "Me" : showButton ? "Buyer" : "Publisher"}</span>
                                            </div>
                                            <p className='break-words'>{item.message}</p>
                                            <p className='flex justify-end  text-end'>
                                                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                        <div ref={messagesEndRef} />
                                    </>
                                ))) : (
                                    <div className='w-full h-full py-4 text-center text-gray-500 font-bold flex items-center justify-center flex-col'>
                                        No messages found.
                                        <Image
                                            alt="t"
                                            src="/images/new/noMsg.svg"
                                            width={100}
                                            height={100}
                                            className='w-full h-full '
                                            objectFit="contain"
                                        />
                                    </div>
                                )}
                        </div>
                        {data && data.task_status.title !== "Completed" && (
                            <div className='flex-1 flex flex-col gap-2'>
                                <textarea
                                    value={chatText}
                                    onChange={handleChatChange}
                                    className='w-full h-full resize-none border p-2 outline-none rounded-lg'></textarea>
                                <div className='flex gap-2 items-center'>
                                    <button
                                        onClick={addChat}
                                        disabled={!chatText || chatText.trim() === ""}
                                        className='rounded-lg w-full text-white bg-blue-500 px-4 py-1 hover:bg-primary transition-all ease-in-out duration-300 disabled:cursor-not-allowed disabled:bg-gray-5'>Send</button>

                                    <Popover
                                        overlayClassName="custom-popover"
                                        content={popoverContent}>
                                        <BiInfoCircle className='text-2xl text-red' />

                                    </Popover>
                                </div>

                            </div>
                        )}
                    </div>
                </Drawer>
                <div>
                    {!showButton && (
                        <button
                            onClick={() => router.push("/buyer-orders")}
                            className='bg-newcolor text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center  group hover:bg-blue-500 transition-all ease-in-out duration-300'
                        >
                            <FaChevronRight className='group-hover:scale-125 transition-all ease-in-out duration-300 rotate-180' />
                            Go Back To My Orders
                        </button>
                    )}
                    {showButton && (
                        <button
                            onClick={() => router.push("/publisher-guestpost-tasks")}
                            className='bg-newcolor text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center  group hover:bg-blue-500 transition-all ease-in-out duration-300'
                        >
                            <FaChevronRight className='group-hover:scale-125 transition-all ease-in-out duration-300 rotate-180' />
                            Go Back Guest Post Tasks
                        </button>
                    )}


                    <div onClick={() => setIsRotated(!isRotated)} className={`w-full h-[50px] bg-newcolor mt-4 rounded-lg flex items-center p-4 gap-4 cursor-pointer transition-all ease-in-out duration-300 hover:bg-gradient-to-r from-primary to-[#2c7be5] mb-4 ${isRotated ? 'bg-gradient-to-r from-primary to-[#2c7be5]' : 'bg-[rgba(87,80,241,0.7)]'}`}>
                        <FaChevronRight
                            className={`text-white transform transition-transform duration-300 ${isRotated ? 'rotate-90' : ''}`}
                        />
                        <p className='text-white font-bold'>Please click here to read and familiarise yourself with things you can and cannot do.</p>
                    </div>

                    {isRotated && (
                        <div className='h-[80vh] md:h-[50vh] bg-white my-4 transition-all ease-in-out duration-300 flex flex-col gap-2 p-4 text-gray-600 font-medium overflow-auto dark:bg-dark dark:text-white' data-aos='fade'>
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

                    <div className=' bg-white p-4 flex rounded-lg dark:bg-dark dark:text-white'>
                        <div className='h-full flex-1 '>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium  '>Task Id</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium '>Price</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2 text-black   text-base font-medium bg-red/20 dark:bg-dark dark:text-white' >Task Status</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium '>Link Type</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium  '>Service Type</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium '>Publishers URL</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium '>Post URL</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium  '>Anchor Text</h3>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium '>Target URL</h3>

                            {data && data.task_status.title === "Improvement" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium text-black dark:bg-dark dark:text-white bg-red/20'>Improvement Reason</h3></>
                            )}
                            {data && data.task_status.title === "Awaiting" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium text-black dark:bg-dark dark:text-white bg-red/20'>Improvement Reason</h3></>
                            )}
                            {data && data.task_status.title === "Not Started" && (
                                <>
                                    <h3 className='md:h-[70px] flex p-4 items-center border-b-2   text-base font-medium  '>About The Payment</h3></>
                            )}
                            {data && data.task_status.title === "In Progress" && (
                                <>
                                    <h3 className='md:h-[70px] flex p-4 items-center border-b-2   text-base font-medium  '>About The Payment</h3></>
                            )}
                            {data && data.task_status.title === "Pending Approval" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium dark:bg-dark dark:text-white bg-red/20'>Post Placement URL</h3>
                                    <h3 className='md:h-[70px] flex p-4 items-center border-b-2   text-base font-medium  '>About The Payment</h3>

                                </>
                            )}
                            {data && data.task_status.title === "Completed" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium dark:bg-dark dark:text-white bg-red/20 '>Post Placement URL</h3>
                                    <h3 className=' flex p-4 items-center    text-base font-medium '>Special Requirements</h3>   </>
                            )}
                            {data && data.task_status.title === "Rejected" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2   text-base font-medium dark:bg-dark dark:text-white bg-red/20 '>Rejection Reason</h3></>
                            )}
                        </div>
                        <div className='h-full flex-[3] '>
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium  '>{data && (data.uid)}</h3>{/*Task Id*/}
                            {showButton ?
                                <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-semibold '>${data && (data.publisher_amount)}</h3>

                                : <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-semibold '>${data && (data.buyer_amount)}</h3>}

                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium dark:bg-dark dark:text-white bg-red/20 text-black' data-aos="slide-right">{data && (data.task_status.title)}</h3>{/*Task Status*/}
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium '>{websites && (websites.linktype_detail.title)}</h3>{/*Link Type*/}
                            <div className='md:h-[20px] md:flex-row flex-col flex md:p-4 items-center border-b-2 justify-center text-base font-medium '>
                                {data && (
                                    <h3 className=' md:font-semibold'>
                                        {data.task_type === "cp" && "Content Placement"}
                                        {data.task_type === "ccp" && "Content Creation & Placement"}
                                        {data.task_type === "li" && "Link Insertion"} 
                                        {data.task_type === "cbdcp" && "CBD/Casino Content Placement"}
                                        {data.task_type === "cbdccp" && "CBD/Casino Content Creation & Placement"}
                                        {data.task_type === "cbdli" && "CBD/Casino Link Insertion"} 
                                        {data.task_type === "adultcp" && "Adult Content Placement"}
                                        {data.task_type === "adultccp" && "Adult Content Creation & Placement"}
                                        {data.task_type === "adultli" && "Adult Link Insertion"} 

                                    </h3>
                                )}
                                <span className=' '>: You Must post the article below on this website:</span> <p className='' style={{ marginLeft: "4px", color: "blue" }}> {" "} {data && (data.publishersite_domain)}</p>
                            </div>
                            {/*Service Type*/}
                            <h3 className='md:h-[20px] h-full flex p-4 items-center border-b-2 justify-center  text-base font-medium '>
                                <p style={{ marginLeft: "4px", color: "blue" }}> {" "} {data && (data.publishersite_domain)}</p></h3>{/*Publishers URL*/}



                            {data && data.task_status.title === "Improvement" && (
                                <>
                                    {showButton && (
                                        isEditing ? (
                                            <div className='flex justify-between'>
                                                <input
                                                    onChange={ppURL}
                                                    type="text"
                                                    name="postPlacementURL"
                                                    id="postPlacementURL"
                                                    placeholder="Post Placement URL"
                                                    className={`w-full outline-none h-[34px]  px-4 py-2 transition-all ease-in-out duration-300 rounded-lg border-2   ${isValidURL ? 'border-green-500' : 'border-red-500'}`}
                                                    value={postPlacementURL}
                                                />
                                                <div className=' flex gap-6 items-center justify-center px-4'>
                                                    <FaRegCheckCircle className='text-2xl cursor-pointer text-green-600  hover:scale-125 transition-all ease-in-out duration-100  disabled:cursor-not-allowed disabled:text-gray-6'
                                                        onClick={ppURL_update}
                                                        disabled={!isValidURL} />

                                                    <MdOutlineCancel onClick={handleInputBlur} className='text-[1.7rem] cursor-pointer text-red-600 hover:scale-125 transition-all ease-in-out duration-100' />
                                                </div>
                                            </div>

                                        ) : (
                                            <h3 className='md:h-[20px] flex p-4  items-center border-b-2 justify-center gap-4 text-base font-medium'>
                                                {data && (data.post_url)}
                                                <FaEdit
                                                    className='text-xl cursor-pointer text-primary hover:scale-125 transition-all ease-in-out duration-100'
                                                    onClick={handleEditClick}
                                                />
                                            </h3>
                                        )
                                    )}
                                </>
                            )}
                            {data && data.task_status.title !== "Improvement" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium '>{data && (data.post_url)} </h3>{/*post Text*/}
                                </>
                            )}
                            {data && data.task_status.title === "Improvement" && (
                                <>
                                    {!showButton && (
                                        <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium '>{data && (data.post_url)} </h3>
                                    )}
                                </>
                            )}

                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium  '>{data && (data.anchor_text)}</h3>{/*Anchor Text*/}
                            <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium '>{data && (data.target_url)}</h3>{/*Target URL*/}

                            {data && data.task_status.title === "Not Started" && (
                                <>
                                    <p className='md:h-[70px] text-center  flex p-4 items-center justify-center border-b-2 text-base font-medium '>
                                        After you deliver this task, if the Buyer doesnt approve it, Vefogix will automatically mark it as complete after 3 days and the funds will be Available For Withdrawal
                                    </p>
                                </>
                            )}{/* About The Payment */}
                            {data && data.task_status.title === "In Progress" && (
                                <>
                                    <p className='md:h-[70px] text-center  flex p-4 items-center justify-center border-b-2 text-base font-medium '>
                                        After you deliver this task, if the Buyer doesnt approve it, Vefogix will automatically mark it as complete after 3 days and the funds will be Available For Withdrawal
                                    </p>
                                </>
                            )}{/* About The Payment */}
                            {data && data.task_status.title === "Pending Approval" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium dark:bg-dark dark:text-white bg-red/20 '>{data && (data.post_url)}</h3>


                                    <p className='md:h-[70px] text-center  flex p-4 items-center justify-center border-b-2 text-base font-medium '>
                                        After you deliver this task, if the Buyer doesnt approve it, Vefogix will automatically mark it as complete after 3 days and the funds will be Available For Withdrawal
                                    </p>
                                </>
                            )}{/* About The Payment */}
                            {data && data.task_status.title === "Improvement" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium dark:bg-dark dark:text-white bg-red/20 text-black'>{data && (data.improvement_text)}</h3>
                                </>
                            )}{/* Improvement reason*/}
                            {data && data.task_status.title === "Awaiting" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center  text-base font-medium dark:bg-dark dark:text-white bg-red/20 text-black'>{data && (data.improvement_text)}</h3>
                                </>
                            )}{/* Improvement reason*/}
                            {data && data.task_status.title === "Completed" && (
                                <>
                                    <h3 className='md:h-[20px] flex p-4 items-center border-b-2 justify-center text-base font-medium dark:bg-dark dark:text-white bg-red/20'>
                                        {data && (data.post_url)} {/* Post Placement URL */}
                                    </h3>
                                    <h3 className='flex p-4 items-center justify-center text-base font-medium'>
                                        {data && (data.special_requirment)}    {/* Special Requirements */}
                                    </h3>
                                </>
                            )}
                            {data && data.task_status.title === "Rejected" && (
                                <>
                                    <p className='md:h-[20px] text-center  flex p-4 items-center justify-center border-b-2 text-base font-medium dark:bg-dark dark:text-white bg-red/20'>
                                        {data && (data.rejection_reason)}
                                    </p>
                                </>
                            )}{/* About The Payment */}
                        </div>
                    </div>



                    {data && data.task_status.title === "In Progress" && (
                        <div className=''>
                            {showButton && (
                                <div className='mt-4'>
                                    <h1 className='text-black text-xl mb-2 font-medium'>Post Placement URL</h1>
                                    <input
                                        onChange={ppURL}
                                        type="text"
                                        name="postPlacementURL"
                                        id="postPlacementURL"
                                        placeholder="Post Placement URL"
                                        className={`w-full outline-none  px-4 py-2 transition-all ease-in-out duration-300 rounded-lg border-2   ${isValidURL ? 'border-green-500' : 'border-red-500'}`}
                                        value={postPlacementURL}
                                    />
                                </div>)}
                        </div>
                    )}




                    <div className='mt-4'>

                        {data && data.task_status.title === "Not Started" && (
                            <div className='flex justify-between items-center'>
                                <Popconfirm
                                    title={
                                        <div>
                                            <p>Are you sure you want to reject this task?</p>
                                            <Input.TextArea
                                                rows={4}
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                placeholder="Provide a reason..."
                                            />
                                        </div>
                                    }
                                    description="Reject this task?"
                                    onConfirm={con_firm}
                                    onCancel={can_cel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <button className='bg-red-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                        <IoRemoveCircleOutline className='text-xl group-hover:scale-125 transition-all ease-in-out duration-300' />
                                        Reject The Task
                                    </button>
                                </Popconfirm>


                                {showButton && (
                                    // <Popconfirm
                                    //     title="Are you sure that you wish to proceed with this task?"
                                    //     onConfirm={publisher_Tasks_Change}>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className='bg-green-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'
                                    >
                                        <SiTicktick className='group-hover:scale-125 transition-all ease-in-out duration-300 ' />
                                        Accept This Task
                                    </button>
                                    // </Popconfirm>
                                )}
                            </div>
                        )}



                        {data && data.task_status.title === "In Progress" && (
                            <div className='flex justify-between items-center'>


                                {showButton && (
                                    <>
                                        <Popconfirm
                                            title={
                                                <div>
                                                    <p>Are you sure you want to reject this task?</p>
                                                    <Input.TextArea
                                                        rows={4}
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                        placeholder="Provide a reason..."
                                                    />
                                                </div>
                                            }
                                            description="Reject this task?"
                                            onConfirm={con_firm}
                                            onCancel={can_cel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className='bg-red-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                                <IoRemoveCircleOutline className='text-xl group-hover:scale-125 transition-all ease-in-out duration-300' />
                                                Reject The Task
                                            </button>
                                        </Popconfirm>


                                        <button
                                            onClick={ppURLupdate}
                                            disabled={!isValidURL}
                                            className='bg-green-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group disabled:cursor-not-allowed disabled:bg-gray-6 transition-all ease-in-out duration-300'
                                        >
                                            <SiTicktick className='group-hover:scale-125 transition-all ease-in-out duration-300 ' />
                                            Send For Buyers Approval
                                        </button>
                                    </>



                                )}
                            </div>
                        )}

                        {data && data.task_status.title === "Pending Approval" && (

                            <div className='flex justify-between items-center'>


                                {!showButton && (
                                    <>
                                        <div>
                                            <Popconfirm
                                                title={
                                                    <div>
                                                        <p>Are you sure you want to reject this task?</p>
                                                        <Input.TextArea
                                                            rows={4}
                                                            value={reason}
                                                            onChange={(e) => setReason(e.target.value)}
                                                            placeholder="Provide a reason..."
                                                        />
                                                    </div>
                                                }
                                                description="Reject this task?"
                                                onConfirm={con_firm}
                                                onCancel={can_cel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button className='bg-red-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                                    <IoRemoveCircleOutline className='text-xl group-hover:scale-125 transition-all ease-in-out duration-300' />
                                                    Reject The Task
                                                </button>
                                            </Popconfirm>
                                        </div>

                                        <div className=' flex gap-2'>
                                            <Popconfirm
                                                title={
                                                    <div>
                                                        <p>Are you sure you want to send this task for Improvement?</p>
                                                        <Input.TextArea
                                                            rows={4}
                                                            value={impReason}
                                                            onChange={(e) => setImpReason(e.target.value)}
                                                            placeholder="Provide Improvements ..."
                                                        />
                                                    </div>
                                                }
                                                description="Send this task for Improvement?"
                                                onConfirm={improvementupdate}
                                                onCancel={can_cel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button
                                                    // onClick={improvementupdate} 
                                                    className='bg-blue-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                                    <VscDebugRestartFrame className='text-xl group-hover:scale-125 transition-all ease-in-out duration-300' />
                                                    Improvement
                                                </button>
                                            </Popconfirm>
                                            <button onClick={completeupdate} className='bg-green-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                                <SiTicktick className=' group-hover:scale-125 transition-all ease-in-out duration-300' />
                                                Complete The Task
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>
                        )}
                        {data && data.task_status.title === "Improvement" && (

                            <div className='flex justify-between items-center'>


                                {showButton && (
                                    <>
                                        <div>
                                            <Popconfirm
                                                title={
                                                    <div>
                                                        <p>Are you sure you want to reject this task?</p>
                                                        <Input.TextArea
                                                            rows={4}
                                                            value={reason}
                                                            onChange={(e) => setReason(e.target.value)}
                                                            placeholder="Provide a reason..."
                                                        />
                                                    </div>
                                                }
                                                description="Reject this task?"
                                                onConfirm={con_firm}
                                                onCancel={can_cel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button className='bg-red-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                                    <IoRemoveCircleOutline className='text-xl group-hover:scale-125 transition-all ease-in-out duration-300' />
                                                    Reject The Task
                                                </button>
                                            </Popconfirm>
                                        </div>


                                        <div className=' flex gap-2'>
                                            <button onClick={awaitingupdate} className='bg-green-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                                <SiTicktick className=' group-hover:scale-125 transition-all ease-in-out duration-300' />
                                                Send For Final Approval
                                            </button>
                                        </div></>
                                )}

                            </div>
                        )}

                        {data && data.task_status.title === "Awaiting" && (
                            <div className='flex justify-end items-center'>


                                {!showButton && (
                                    <button onClick={completeupdate} className='bg-green-500 text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center group'>
                                        <SiTicktick className=' group-hover:scale-125 transition-all ease-in-out duration-300' />
                                        Complete The Task
                                    </button>)}
                            </div>
                        )}


                    </div>

                    <Modal
                        title={
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                You must agree before start working on this task
                            </div>
                        }
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null}
                        centered
                        className=""
                        style={{
                            height: "unset",
                        }}
                    >
                        {/* <div className={`h-full w-full flex items-start flex-col px-4 py-2 justify-around ${styles.modalContent}`}>
                        <form className='w-full' onSubmit={publisher_Tasks_Change} >

                            <label className="flex items-center py-1 cursor-pointer group">
                                <Checkbox
                                    name="task1"
                                    checked={checked.task1}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                This task must be completed before the <span className='text-blue font-semibold ml-1 group-hover:scale-110 group-hover:ml-2 transition-all ease-in-out duration-300'>{newFormattedDate}</span>
                            </label>
                            <label className="flex items-center py-1 cursor-pointer group ">
                                <Checkbox
                                    name="task2"
                                    checked={checked.task2}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                The link must come from <span className='text-blue font-semibold ml-1 group-hover:scale-110 group-hover:ml-2 transition-all ease-in-out duration-300'>{websites?.website?.url}</span>
                            </label>
                            <label className="flex items-center py-1 cursor-pointer ">
                                <Checkbox
                                    name="task3"
                                    checked={checked.task3}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                The article must not be on the subdomain
                            </label>
                            <label className="flex items-center py-1 cursor-pointer group">
                                <Checkbox
                                    name="task4"
                                    checked={checked.task4}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                The link in the article must be <span className='text-blue font-semibold ml-1 group-hover:scale-110 group-hover:ml-2 transition-all ease-in-out duration-300'>{websites?.linktype_detail?.title}</span>
                            </label>
                            <label className="flex items-center py-1 cursor-pointer ">
                                <Checkbox
                                    name="task5"
                                    checked={checked.task5}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                The article and links will be live forever on the site
                            </label>
                            <label className="flex items-center py-1 cursor-pointer ">
                                <Checkbox
                                    name="task6"
                                    checked={checked.task6}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                The article must be posted as a blog post
                            </label>
                            <label className="flex items-center py-1 cursor-pointer ">
                                <Checkbox
                                    name="task7"
                                    checked={checked.task7}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                We will not approve the task if it is a Press Release
                            </label>
                            <label className="flex items-center py-1 cursor-pointer">
                                <Checkbox
                                    name="task8"
                                    checked={checked.task8}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                Payments are made (Every Monday). Please Make sure to request your payment before Sunday Midnight.
                            </label>
                            <label className="flex  py-1 cursor-pointer text-red font-medium group">
                                <Checkbox
                                    name="task9"
                                    checked={checked.task9}
                                    onChange={onChange} required className='mr-2'></Checkbox>
                                <span> After you deliver this task, if the Buyer doesnt approve it, it will be automatically marked as complete after 3 days and the funds will be Available For Withdrawal as you are the owner of <span className='text-blue font-semibold group-hover:scale-110 group-hover:ml-2 transition-all ease-in-out duration-300'>{websites?.website?.url}</span></span>
                            </label>

                            <div className='flex w-full mt-4 items-center gap-4 justify-center'>
                                <button
                                    type="button"
                                    onClick={selectAll}
                                    className='group bg-newcolor transition-all ease-in-out duration-300 hover:bg-blue-500 text-white text-base rounded-lg px-4 py-2 flex gap-2 items-center'
                                ><SiTicktick className='text-white group-hover:scale-125 transition-all ease-in-out duration-300 ' />
                                    {Object.values(checked).every(value => value) ? 'Deselect All' : 'Select All'}
                                </button>
                                <button type=' submit' className='group bg-newcolor transition-all ease-in-out duration-300 hover:bg-green-500 text-white text-base rounded-lg px-4 py-2 flex gap-2 items-center'>
                                    <MdOutlineWorkHistory className='text-white group-hover:scale-125 transition-all ease-in-out duration-300 text-lg' />
                                    Agree and start working.
                                </button>
                            </div>
                        </form>
                    </div> */}

                        <div className={`h-full w-full flex items-center justify-center flex-col px-4 py-2  `}>
                            <button
                                onClick={publisher_Tasks_Change}
                                className='group bg-newcolor transition-all ease-in-out duration-300 hover:bg-green-500 text-white text-base rounded-lg px-4 py-2 flex gap-2 items-center'>
                                <MdOutlineWorkHistory className='text-white group-hover:scale-125 transition-all ease-in-out duration-300 text-lg' />
                                Agree and start working.
                            </button></div>
                    </Modal>



                    <div className='mt-4 bg-white flex flex-col dark:bg-dark dark:text-white'>
                        <div className='px-4 py-2 bg-newcolor rounded-t-lg   text-white'>
                            {data && data.task_status.title === "Not Started" && (
                                <p className='flex justify-between items-center'>Content to be published -&gt; This article must be posted with all the links and if you can&apos;t, just reject it
                                    <Popover title="If the content contains images manually copy and paste it.">
                                        <FaRegCopy className='text-lg hover:text-2xl transition-all ease-in-out duration-300 cursor-pointer ' onClick={copyToClipboard} /></Popover></p>
                            )}
                            {data && data.task_status.title === "In Progress" && (
                                <p className='flex justify-between items-center'>Content to be published -&gt; This article must be posted with all the links and if you can&apos;t, just reject it
                                    <Popover title="If the content contains images manually copy and paste it.">
                                        <FaRegCopy className='text-lg hover:text-2xl transition-all ease-in-out duration-300 cursor-pointer ' onClick={copyToClipboard} /></Popover></p>
                            )}
                            {data && data.task_status.title === "Pending Approval" && (
                                <p className='flex justify-between items-center'>Content to be published
                                    <Popover title="If the content contains images manually copy and paste it.">
                                        <FaRegCopy className='text-lg hover:text-2xl transition-all ease-in-out duration-300 cursor-pointer ' onClick={copyToClipboard} /></Popover></p>
                            )}
                            {data && data.task_status.title === "Improvement" && (
                                <p className='flex justify-between items-center'>Content to be published
                                    <Popover title="If the content contains images manually copy and paste it.">
                                        <FaRegCopy className='text-lg hover:text-2xl transition-all ease-in-out duration-300 cursor-pointer ' onClick={copyToClipboard} /></Popover></p>
                            )}
                            {data && data.task_status.title === "Awaiting" && (
                                <p className='flex justify-between items-center'>Content to be published
                                    <Popover title="If the content contains images manually copy and paste it.">
                                        <FaRegCopy className='text-lg hover:text-2xl transition-all ease-in-out duration-300 cursor-pointer ' onClick={copyToClipboard} /></Popover></p>
                            )}
                            {data && data.task_status.title === "Completed" && (
                                <p className='flex justify-between items-center'>Content to be published
                                    <Popover title="If the content contains images manually copy and paste it.">
                                        <FaRegCopy className='text-lg hover:text-2xl transition-all ease-in-out duration-300 cursor-pointer ' onClick={copyToClipboard} /></Popover></p>
                            )}
                            {data && data.task_status.title === "Rejected" && (
                                <p className='flex justify-between items-center'>Content to be published
                                    <Popover title="If the content contains images manually copy and paste it.">
                                        <FaRegCopy className='text-lg hover:text-2xl transition-all ease-in-out duration-300 cursor-pointer ' onClick={copyToClipboard} /></Popover></p>
                            )}
                        </div>
                        <div className='px-4 py-2 bg-white rounded-t-lg dark:bg-dark dark:text-white mb-5'>
                            <ReactQuill
                                ref={quillRef}
                                className='resizable-container pb-10'
                                style={{ width: '100%', height: '50vh', backgroundColor: '#f5f5f5', borderRadius: "8px" }}
                                value={data ? data.content : ''}
                                readOnly
                            />
                        </div>
                    </div>

                </div>
            </DefaultLayout>

        </>
    )
}

export default TaskView;
