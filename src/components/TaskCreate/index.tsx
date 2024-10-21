"use client"
import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Dropdown, message, Space, Menu, Button, Result, Modal } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRecord } from '@/helpers/RecordContext';
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import type { MenuProps } from 'antd';
import { useSidebarProjects } from '@/helpers/SidebarProjectContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useWebsites } from '@/helpers/WebsiteContext';
import { FaChevronRight } from 'react-icons/fa';
import { LinkPreview } from '../ui/link-preview';
import { FileUpload } from "@/components/ui/file-upload";
import mammoth from 'mammoth';
import Cookies from 'js-cookie';



const Page = () => {


    const [selectedCP, setSelectedCP] = useState(true)
    const [selectedCCP, setSelectedCCP] = useState(false)
    const [selectedLIP, setSelectedLIP] = useState(false)
    const [content, setContent] = useState('')
    const { selectedRecord, setSelectedRecord } = useRecord();
    const [postURL, setpostURL] = useState("");
    const [targetURL, setTargetURL] = useState("N/A");
    const [anchorText, setAnchorText] = useState("N/A");
    const [spReq, setSpReq] = useState("");

    // console.log(selectedRecord);

    const [project_id, setProject_id] = useState('');

    const handleMenuClick = (e: any) => {
        if (e.key) {
            // console.log('Clicked item UID:', e.key);
            setProject_id(e.key);

            const selectedProject = projects.find((project:any) => project.uid === e.key);
            if (selectedProject) {
                setSelectedTitle(selectedProject.title);
            }
        }
    }

    useEffect(() => {
        if (project_id === undefined || project_id === null || project_id === '') {
            setErr(true);
        } else {
            setErr(false);
        }
    }, [project_id]);


    const { projects, fetchProjects } = useSidebarProjects();
    useEffect(() => {
        fetchProjects();
    }, []);

    const menu = (
        <Menu onClick={handleMenuClick}>
            {projects.map((project: any) => (
                <Menu.Item key={project.uid}>
                    {project.title}
                </Menu.Item>
            ))}
        </Menu>
    );

    const [selectedTitle, setSelectedTitle] = useState('None');
    const [err, setErr] = useState(false);



    const currentDate = new Date();
    const deliveryDays = parseInt(selectedRecord.delivery_time, 10) || 0;
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + deliveryDays);
    const day = futureDate.getDate().toString().padStart(2, '0');
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const year = futureDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const router = useRouter();
    const [data, setData] = useState();
    const { buyer_Tasks } = useWebsites();

    const handleBuyCP = async () => {
        const token = Cookies.get("login_access_token");
        if (!token) {
            alert('You need to log in first.');
            return;
        }
        if(content.trim() === ""){
            toast.error("Please Provide Content...")
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

                const websiteData = {
                    target_url: targetURL,
                    anchor_text: anchorText,
                    special_requirment: spReq,
                    content: content,
                    task_type: (cbdContent ? "cbdcp"  : adultContent ? "adultcp" : "cp"),
                    publishersite: selectedRecord.uid,
                    project_id: project_id,
                    publisher_amount: (cbdContent ? selectedRecord.cbd_p_price_publisher  : adultContent ? selectedRecord.adult_p_price_publisher : selectedRecord.content_p_price_publisher) ,
                    buyer_amount:(cbdContent ? selectedRecord.cbd_p_price  : adultContent ? selectedRecord.adult_p_price : selectedRecord.content_p_price) ,
                    taskstatus: "2aa352ab-9685-47ba-8f59-7ae9385cf38d",
                };
                const token = Cookies.get("login_access_token");
                // console.log("CP", websiteData);

                try {
                    const response = await axios.post(`${BASE_URL}my-tasks/`, websiteData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    // console.log('Added CP:', response.data);
                    toast.success("Task Created Successfully");
                    router.push("/buyer-orders")
                    return response;
                } catch (error: any) {
                    console.error('Error Creating Task', error.response || error);
                    toast.error("Error Creating Task")
                }
                finally {
                    setContent("");
                    setTargetURL("N/A");
                    setAnchorText("N/A"),
                        setSpReq("")
                    buyer_Tasks();
                }

            }
            else {
                toast.error("Please Recharge Your Balance First.")
            }
        } catch (error: any) {
            console.error('Error fetching projects:', error.response);
        }

    };

    const handleBuyCCP = async () => {
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


            if (data && Number(data[0].remain_balance) >= Number(selectedRecord.content_cp_price)) {

                const website_Data = {
                    target_url: targetURL,
                    anchor_text: anchorText,
                    special_requirment: spReq,
                    task_type: (cbdContent ? "cbdccp"  : adultContent ? "adultccp" : "ccp"),
                    publishersite: selectedRecord.uid,
                    project_id: project_id,
                    publisher_amount: (cbdContent ? selectedRecord.cbd_cp_price_publisher  : adultContent ? selectedRecord.adult_cp_price_publisher : selectedRecord.content_cp_price_publisher) ,
                    buyer_amount:(cbdContent ? selectedRecord.cbd_cp_price  : adultContent ? selectedRecord.adult_cp_price : selectedRecord.content_cp_price) ,
                    taskstatus: "2aa352ab-9685-47ba-8f59-7ae9385cf38d",
                };
                // console.log("CCP", website_Data);

                const token = Cookies.get("login_access_token");
                try {
                    const response = await axios.post(`${BASE_URL}my-tasks/`, website_Data, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    // console.log('Added CCP:', response.data);
                    toast.success("Task Created Successfully");
                    router.push("/buyer-orders")
                    return response;
                } catch (error: any) {
                    console.error('Error  Creating Task:', error.response || error);
                    toast.error("Error Creating Task")
                }
                finally {
                    setContent("");
                    setTargetURL("N/A");
                    setAnchorText("N/A"),
                        setSpReq("")
                    buyer_Tasks();
                }

            }
            else {
                toast.error("Please Recharge Your Balance First.")
            }
        } catch (error: any) {
            console.error('Error fetching projects:', error.response);
        }

    };

    const handleBuyLIP = async () => {
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

                const websiteData = {
                    post_url: postURL,
                    target_url: targetURL,
                    anchor_text: anchorText,
                    special_requirment: spReq,
                    content: content,
                    task_type: (cbdContent ? "cbdli"  : adultContent ? "adultli" : "li"),
                    publishersite: selectedRecord.uid,
                    project_id: project_id,
                    publisher_amount: (cbdContent ? selectedRecord.cbd_li_price_publisher  : adultContent ? selectedRecord.adult_li_price_publisher : selectedRecord.link_insert_price_publisher) ,
                    buyer_amount:(cbdContent ? selectedRecord.cbd_li_price  : adultContent ? selectedRecord.adult_li_price : selectedRecord.content_li_price) ,
                    taskstatus: "2aa352ab-9685-47ba-8f59-7ae9385cf38d",
                };
                const token = Cookies.get("login_access_token");
                // console.log("CP", websiteData);

                try {
                    const response = await axios.post(`${BASE_URL}my-tasks/`, websiteData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    // console.log('Added CP:', response.data);
                    toast.success("Task Created Successfully");
                    router.push("/buyer-orders")
                    return response;
                } catch (error: any) {
                    console.error('Error Creating Task', error.response || error);
                    toast.error("Error Creating Task")
                }
                finally {
                    setContent("");
                    setpostURL("");
                    setTargetURL("N/A");
                    setAnchorText("N/A"),
                        setSpReq("")
                    buyer_Tasks();
                }

            }
            else {
                toast.error("Please Recharge Your Balance First.")
            }
        } catch (error: any) {
            console.error('Error fetching projects:', error.response);
        }

    };


    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                [{ 'align': [] }],
                ['link', 'image'],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        }
    };


    const handleFileUpload = async (files: File[]) => {
        const file = files[0];
        if (file) {
            if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                // Handle .docx files
                try {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const arrayBuffer = reader.result as ArrayBuffer | null;
                        if (arrayBuffer) {
                            try {
                                const result = await mammoth.convertToHtml({ arrayBuffer });
                                setContent(result.value);
                                // console.log(result.value);
                                
                            } catch (error) {
                                console.error('Error converting .docx file to HTML:', error);
                            }
                        }
                    };
                    reader.readAsArrayBuffer(file);
                } catch (error) {
                    console.error('Error reading .docx file:', error);
                }
            } else if (file.type === 'application/msword') {
                alert('Handling of .doc files is not supported directly. Please convert to .docx format.');
            } else {
                alert('Unsupported file type. Please upload a .docx file.');
            }
        }
    };


    const handleEditorClear = () => {
        setContent("");
    };

    const cbdContent = localStorage.getItem('selectedPostType') === 'CBD/Casino Post';
    const adultContent = localStorage.getItem('selectedPostType') === 'Adult Post';

    let placementDisplayText;
    if (cbdContent) {
      placementDisplayText = `${selectedRecord.cbd_p_price}`;
    } else if (adultContent) {
      placementDisplayText = `${selectedRecord.adult_p_price}`;
    } else {
      placementDisplayText = `${selectedRecord.content_p_price}`;
    }
    
    let creationPlacementText;
    if (cbdContent) {
      creationPlacementText = `${selectedRecord.cbd_cp_price}`;
    } else if (adultContent) {
      creationPlacementText = `${selectedRecord.adult_cp_price}`;
    } else {
      creationPlacementText = `${selectedRecord.content_cp_price}`;
    }
    
    let linkPlacementText;
    if (cbdContent) {
      linkPlacementText = `${selectedRecord.cbd_li_price}`;
    } else if (adultContent) {
      linkPlacementText = `${selectedRecord.adult_li_price}`;
    } else {
      linkPlacementText = `${selectedRecord.link_insert_price}`;
    }
    

    return (
        <DefaultLayout>
            <button
                onClick={() => router.back()}
                className='bg-newcolor text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center  group hover:bg-blue-500 transition-all ease-in-out duration-300'
            >
                <FaChevronRight className='group-hover:scale-125 transition-all ease-in-out duration-300 rotate-180' />
                Go Back
            </button>

            <div className='h-auto w-full rounded-lg bg-white flex flex-col gap-3 my-3'>
                <div className='h-[50px] w-full bg-newcolor flex items-center justify-between px-4 te  xt-white rounded-t-lg'>

                    <LinkPreview
                        url={selectedRecord.website.url}
                        className="cursor-pointer mx-3 hover:text-white text-white hover:scale-105 transition-all ease-in-out duration-300  "
                    >
                        <h1 className='text-sm md:text-lg font-semibold text-white'>{selectedRecord.website.url}</h1></LinkPreview>
                    <p className='text-sm text-white'>Estimated Completion: {formattedDate}</p>
                </div>

                <div className='flex gap-3 px-3 items-center justify-center'>

                    <label htmlFor="dropdown" className='text-base font-semibold' >Choose a Project: </label>
                    <Dropdown overlay={menu} className='border px-7 rounded-lg py-1'>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {selectedTitle}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>


                    {err && <span className='text-sm text-red-400 font-medium'>Please Select A Project First!</span>}
                </div>

                <div className='h-[50px] w-full px-3 md:flex-row flex-col flex mb-2'>



                    <button onClick={() => {
                        setSelectedCP(true);
                        setSelectedCCP(false);
                        setSelectedLIP(false);
                    }} className={`flex-1 border border-blue/60 text-base font-semibold hover:bg-newcolor hover:text-white transition-all ease-in-out duration-300 ${selectedCP && "bg-newcolor text-white"}`} >{cbdContent? "CBD/Casino" : adultContent ? "Adult" : ""} Content Placement <span className='text-sm bg-newcolorxt-white rounded-full text-center px-2 md:py-1'>${placementDisplayText}</span></button>

                    <button onClick={() => {
                        setSelectedCP(false);
                        setSelectedCCP(true);
                        setSelectedLIP(false);
                    }} className={`flex-1 border-t border-r border-b border-primary/60 text-base font-semibold hover:bg-newcolor hover:text-white transition-all ease-in-out duration-300 ${selectedCCP && "bg-newcolor text-white"} `} >{cbdContent? "CBD/Casino" : adultContent ? "Adult" : ""} Content Creation & Placement <span className='text-sm bg-newcolorxt-white rounded-full text-center px-2 md:py-1'>${creationPlacementText}</span></button>

{(
    // (selectedRecord.user_details.admin || selectedRecord.user_details.partner) &&
  (
    cbdContent ? selectedRecord.cbd_li_price
    : adultContent ? selectedRecord.adult_li_price
    : selectedRecord.link_insert_price
  )) && (
    <button
      onClick={() => {
        setSelectedCP(false);
        setSelectedCCP(false);
        setSelectedLIP(true);
      }}
      className={`flex-1 border-t border-r border-b border-primary/60 text-base font-semibold hover:bg-newcolor hover:text-white transition-all ease-in-out duration-300 ${selectedLIP && "bg-newcolor text-white"}`}
    >
{cbdContent? "CBD/Casino" : adultContent ? "Adult" : ""} Link Insertion <span className='text-sm bg-newcolorxt-white rounded-full text-center px-2 md:py-1'>${linkPlacementText}</span>
    </button>
  )
}



                </div>

                {selectedCCP && (
                    <div className='w-full px-3'>
                        <Form
                            layout="vertical"
                            initialValues={{ size: "large" }}
                            onFinish={handleBuyCCP}
                        >
                            <Form.Item
                                label="Target URL"
                                className='items-start'
                                name="targetURL"
                            >
                                <Input
                                    style={{ width: '100%', height: '50px' }}
                                    onChange={(e) => { setTargetURL(e.target.value); }}
                                    defaultValue={"N/A"}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Anchor Text"
                                className='items-start'
                                name="anchorText"
                            >
                                <Input
                                    style={{ width: '100%', height: '50px' }}
                                    onChange={(e) => { setAnchorText(e.target.value); }}
                                    defaultValue={"N/A"}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Special Requirements For Content Creation & Placement"
                                className='items-start'
                                name="specialRequirements"
                            >
                                <Input.TextArea
                                    style={{ width: '100%', height: '150px', marginBottom: '35px' }}
                                    onChange={(e) => { setSpReq(e.target.value); }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <div className='h-[50px] w-full flex flex-col justify-end items-end gap-3 mt-[30px] p-4'>
                                    <h1 className='text-blue text-xl font-medium'>$ {creationPlacementText}</h1>
                                    <button
                                        type="submit"
                                        className={`bg-newcolor hover:bg-blue transition-all ease-in-out duration-300 px-8 w-[200px] py-3 rounded-lg text-white font-medium ${err ? 'bg-red hover:bg-red cursor-not-allowed' : ''} ${err ? 'disabled' : ''}`}
                                        disabled={err}
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                )}

                {selectedCP && (
                    <div className='w-full px-3'>
                        <Form
                            layout="vertical"
                            initialValues={{ size: "large" }}
                            onFinish={handleBuyCP}
                        >
                            <Form.Item
                                label="Content"
                                className='items-start'
                                name="content"
                                
                            >
                                <div className='flex w-full md:flex-row flex-col'>
                                    <div className='w-fit md:w-1/3'>
                                        <FileUpload onChange={handleFileUpload} onEditorClear={handleEditorClear} />
                                    </div>
                                    <div className='w-fit md:w-2/3'>
                                        <ReactQuill
                                            className='resizable-container pb-10 border-b-2  outline-none'
                                            style={{ width: '100%', height: '320px', outline:"0%" }}
                                            value={content}
                                            onChange={(value) => setContent(value)}
                                            modules={modules}
                                        />
                                    </div>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Target URL"
                                className='items-start'
                                name="targetURL"
                            >
                                <Input
                                    style={{ width: '100%', height: '50px' }}
                                    onChange={(e) => { setTargetURL(e.target.value); }}
                                    defaultValue={"N/A"}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Anchor Text"
                                className='items-start'
                                name="anchorText"
                            >
                                <Input
                                    style={{ width: '100%', height: '50px' }}
                                    onChange={(e) => { setAnchorText(e.target.value); }}
                                    defaultValue={"N/A"}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Special Requirements For Content Placement"
                                className='items-start'
                                name="specialRequirements"
                            >
                                <Input.TextArea
                                    style={{ width: '100%', height: '150px', marginBottom: '35px' }}
                                    onChange={(e) => { setSpReq(e.target.value); }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <div className='h-[50px] w-full flex flex-col justify-end items-end gap-3 mt-[30px] p-4'>
                                    <h1 className='text-blue text-xl font-medium'>$ {placementDisplayText}</h1>
                                    <button
                                        type="submit"
                                        className={`bg-newcolor hover:bg-blue transition-all ease-in-out duration-300 px-8 w-[200px] py-3 rounded-lg text-white font-medium ${err ? 'bg-red hover:bg-red cursor-not-allowed' : ''} ${err ? 'disabled' : ''}`}
                                        disabled={err}
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                )}

                {selectedLIP && (
                    <div className='w-full px-3'>
                        <Form
                            layout="vertical"
                            initialValues={{ size: "large" }}
                            onFinish={handleBuyLIP}
                        >
                            <Form.Item
                                label="Existing Post URL"
                                className='items-start'
                                name="postURL"
                            >
                                <Input
                                    style={{ width: '100%', height: '50px' }}
                                    onChange={(e) => { setpostURL(e.target.value); }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Target URL"
                                className='items-start'
                                name="targetURL"
                            >
                                <Input
                                    style={{ width: '100%', height: '50px' }}
                                    onChange={(e) => { setTargetURL(e.target.value); }}
                                    defaultValue={"N/A"}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Anchor Text"
                                className='items-start'
                                name="anchorText"
                            >
                                <Input
                                    style={{ width: '100%', height: '50px' }}
                                    onChange={(e) => { setAnchorText(e.target.value); }}
                                    defaultValue={"N/A"}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Special Requirements For Content Creation & Placement"
                                className='items-start'
                                name="specialRequirements"
                            >
                                <Input.TextArea
                                    style={{ width: '100%', height: '150px', marginBottom: '35px' }}
                                    onChange={(e) => { setSpReq(e.target.value); }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <div className='h-[50px] w-full flex flex-col justify-end items-end gap-3 mt-[30px] p-4'>
                                    <h1 className='text-blue text-xl font-medium'>${linkPlacementText} </h1>
                                    <button
                                        type="submit"
                                        className={`bg-newcolor hover:bg-blue transition-all ease-in-out duration-300 px-8 w-[200px] py-3 rounded-lg text-white font-medium ${err ? 'bg-red hover:bg-red cursor-not-allowed' : ''} ${err ? 'disabled' : ''}`}
                                        disabled={err}
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                )}


            </div>
        </DefaultLayout>
    )
}

export default Page; 

