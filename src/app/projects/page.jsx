"use client"
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { IoMdAddCircle } from "react-icons/io";
import 'reactjs-popup/dist/index.css';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Aos from "aos";
import { ImCancelCircle } from "react-icons/im";
import "aos/dist/aos.css";
import { CiSaveUp2 } from "react-icons/ci";
import { MdOutlineBookmarkRemove } from "react-icons/md";
import CheckboxOne from '@/components/FormElements/Checkboxes/CheckboxOne';
import axios from 'axios';
import { IoCheckmarkDone } from "react-icons/io5";
import { useSidebarProjects } from '@/helpers/SidebarProjectContext';
import { BASE_URL } from '@/utils/api';
import { useWebsites } from '@/helpers/WebsiteContext';
import Image from 'next/image';
import { gsap } from 'gsap';
import Cookies from 'js-cookie';
import Loader from '@/components/common/Loader';


const AllMyProjects = () => {
    const { projects, fetchProjects, loading } = useSidebarProjects();
    const pathName = usePathname();

    const Link = ({ id, children, title, placement }) => (
        <OverlayTrigger placement={placement} className='bg-white' overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <a href="#">{children}</a>
        </OverlayTrigger>
    );

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const [projectName, setProjectName] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    // const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setProjectName("");
        setProjectUrl("");
        setIsAddModalOpen(false);
    }

    const openEditModal = (project) => {
        setCurrentProject(project);
        setProjectName(project.title);
        setProjectUrl(project.url);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setProjectName("");
        setProjectUrl("");
    }

    const openDeleteModal = (project) => {
        setCurrentProject(project);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    const animationRef = useRef(false);




    useEffect(() => {
        if (!animationRef.current && projects.length > 0) {
            animationRef.current = true;

            const projectElements = projects.map((_, index) => `.animate-${index}`);
            gsap.fromTo(
                projectElements,
                { opacity: 0, x: -200 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    stagger: 0.1
                }
            );
        }
    }, [projects]);

    const handleCreateProject = async (event) => {
        event.preventDefault();

        const token = Cookies.get("login_access_token");
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}projects/`, {
                "title": projectName,
                "url": projectUrl,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Project created:', response);
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error.response);
        }

        closeAddModal();

    };
    const [addEditText, setAddEditText] = useState(false)


    const handleEditProject = async (event) => {
        event.preventDefault();

        const token = Cookies.get("login_access_token");
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.put(`${BASE_URL}projects/${currentProject.uid}/`, {
                "title": projectName,
                "url": projectUrl,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Project updated:', response);
            fetchProjects();
            setAddEditText(true);
            // localStorage.setItem('successState', 'true');
        } catch (error) {
            console.error('Error updating project:', error.response);
        }

        closeEditModal();

    };

    const [addDeleteText, setAddDeleteText] = useState(false)

    const handleDeleteProject = async (event) => {
        event.preventDefault();

        const token = Cookies.get("login_access_token");
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.put(`${BASE_URL}projects/${currentProject.uid}/`, { delete_status: true }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('Project deleted', response);
            fetchProjects();
            setAddDeleteText(true);
        } catch (error) {
            console.error('Error deleting project:', error.response);
        }

        closeDeleteModal();
    };

    const handle_Checkbox_Change = async (projectId, currentStatus) => {
        const newStatus = !currentStatus; // Toggle the status
        await update_Project_Status(projectId, newStatus);

        // setTimeout(() => {
        //     window.location.reload();
        // }, 0);
    };

    const update_Project_Status = async (projectId, newStatus) => {
        const token = Cookies.get("login_access_token");
        if (!token) {
            // alert('You need to log in first.');
            return;
        }

        try {
            await axios.put(`${BASE_URL}projects/${projectId}/`, { status: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            fetchProjects(prevProjects => {
                return prevProjects.map(project => {
                    if (project.id === projectId) {
                        return { ...project, status: newStatus };
                    }
                    return project;
                });
            });
        } catch (error) {
            console.error('Error updating project status:', error.response);
        }
    };

        useEffect(() => {
        fetchProjects();
    }, []);

    const ProjectImage = ({ src, alt }) => {
        const [imgSrc, setImgSrc] = useState(src);
        const defaultImage = '/images/logo/logo-icon.png';

        const handleError = () => {
            setImgSrc(defaultImage);
        };

        return (
            <Image
                src={imgSrc}
                alt={alt}
                height={20}
                width={20}
                className="flex items-center justify-center"
                onError={handleError}
            />
        );
    };



    return (
        <DefaultLayout>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-xl md:text-2xl text-primary text-center md:text-start font-[900] dark:bg-dark dark:text-white'>Perfect For Agencies & Marketing Teams</h1>
                <h3 className='text-lg md:text-xl text-primary text-center md:text-start font-[400] dark:bg-dark dark:text-white '>Create a project for each of your clients to ensure you never duplicate placements</h3>
            </div>
            <hr className='border-gray-300 my-4' />
            {addEditText && (
                <div className="h-[50px] mt-2 rounded-lg flex items-center gap-4 mb-2">
                    <p className="text-gray-6 font-bold flex items-center gap-2">
                        <IoCheckmarkDone className="text-2xl" /> The project has been successfully updated
                    </p>
                </div>
            )}
            {addDeleteText && (
                <div className="h-[50px] mt-2 rounded-lg flex items-center gap-4 mb-2">
                    <p className="text-gray-6 font-bold flex items-center gap-2">
                        <IoCheckmarkDone className="text-2xl" /> The project has been successfully Deleted.
                    </p>
                </div>
            )}

            {projects.length > 0 ? <div>
                <button
                    onClick={openAddModal}
                    className='bg-primary  hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                > <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Create project</span></button>
            </div> : ""}
            {isAddModalOpen && (
                <div className="modal-backdrop"  >
                    <div className="modal-content dark:bg-dark dark:text-white" onClick={e => e.stopPropagation()} data-aos='fade'>
                        <div className='w-full bg-gray-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center dark:bg-dark dark:text-white'>
                            Add Project<ImCancelCircle onClick={closeAddModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                        <form className="modal-form" onSubmit={handleCreateProject}>
                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-primary  dark:text-white">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>


                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-primary  dark:text-white">
                                    Project URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="http://www.example.com"
                                    value={projectUrl}
                                    onChange={(e) => setProjectUrl(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <button
                                type='submit'

                                className='bg-primary hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                            > <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Create project</span></button>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modal-backdrop"  >
                    <div className="modal-content dark:bg-dark dark:text-white" onClick={e => e.stopPropagation()} data-aos='fade'>
                        <div className='w-full bg-gray-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center dark:bg-dark dark:text-white'>
                            Edit Project<ImCancelCircle onClick={closeEditModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                        <form className="modal-form" onSubmit={handleEditProject}>
                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-primary  dark:text-white">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>


                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-primary  dark:text-white">
                                    Project URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="http://www.example.com"
                                    value={projectUrl}
                                    onChange={(e) => setProjectUrl(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <button
                                type='submit'
                                className='bg-primary hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                            > <CiSaveUp2 className='text-2xl ' /><span className='font-medium'>Save</span></button>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal-backdrop"  >
                    <div className="modal-content dark:bg-dark-2 dark:text-white" onClick={e => e.stopPropagation()} data-aos='fade'>
                        <div className='w-full bg-red-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center dark:bg-dark dark:text-white'>
                            Delete Project<ImCancelCircle onClick={closeDeleteModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                        <form className="modal-form" onSubmit={handleDeleteProject}>
                            <div className='flex gap-2 ' onChange={handleCheckboxChange}>
                                <input type="checkbox" required className='h-4 w-4 mt-1' name="" id="" /><p className='text-sm font-bold '>Check this box if you want to Delete the <span className='text-red'>{currentProject ? currentProject.title : 'this'}</span> project</p>
                            </div>
                            <button
                                type='submit'
                                className={`${isCheckboxChecked ? 'bg-primary' : 'bg-red'} transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2`}
                            > <MdOutlineBookmarkRemove className='text-2xl ' /><span className='font-medium'>Delete</span></button>
                        </form>
                    </div>
                </div>
            )}

            <div className=' h-full w-full flex items-center justify-center'>

            </div>

            <div className='flex flex-col flex-wrap  w-full'>
            {loading ? <Loader/> : 
                projects.length > 0 ? projects.map((project, index) => (
                    <div key={project.uid} className={`h-full w-full flex animate-${index} `}>
                        <div className={`h-[120px] w-full  bg-white shadow-1 hover:shadow-xl md:mt-4 my-11 md:my-0  rounded-lg transition-all ease-in-out duration-300 flex flex-col dark:bg-dark dark:text-white  `}
                        >
                            <div className='h-[60px] w-full bg-gradient-to-r from-primary to-primary dark:bg-dark dark:text-white  rounded-t-lg justify-between flex items-center px-5'>

                                <div className="flex items-center gap-2">
                                    <div className='bg-white p-1 rounded-full flex items-center justify-center'>
                                        <ProjectImage
                                            src={`https://www.google.com/s2/favicons?domain=${project.url}`}
                                            alt={project.title}
                                        />
                                    </div>

                                    <h4 className="text-white font-medium flex items-center">
                                        {project.title}
                                    </h4>
                                </div>

                                <h4 className='text-white font-medium flex gap-2'>
                                    <Link title="Edit This Project" id="t-1" placement='top'><TbEdit className='text-2xl' onClick={() => openEditModal(project)} /></Link>
                                    <Link title="Delete This Project" id="t-1" placement='top'><MdDeleteOutline className='text-2xl' onClick={() => openDeleteModal(project)} /></Link>
                                </h4>
                            </div>
                            <div className='md:h-[60px] w-full bg-white to-primary gap-1 flex items-center px-5 rounded-b-lg dark:bg-dark dark:text-white '>

                                <div className='text-black font-medium w-full flex md:flex-row flex-col justify-between items-center'>


                                    <div className='h-6 rounded-md  flex items-center gap-2 justify-center text-sm'>
                                        <span className='text-base dark:bg-dark dark:text-white font-medium'>Not Started</span>
                                        <span className='bg-[#F3F4F6] text-primary dark:bg-dark dark:text-white px-2 rounded'>{project.task_counts.not_started}</span></div>


                                    <div className='h-6 rounded-md flex items-center gap-2  justify-center text-sm'>
                                        <span className='text-base dark:bg-dark dark:text-white font-medium'>In Progress</span>
                                        <span className='bg-[#F3F4F6] text-primary dark:bg-dark dark:text-white px-2 rounded'>{project.task_counts.in_progress}</span></div>


                                    <div className='h-6 rounded-md flex items-center gap-2  justify-center text-sm'>
                                        <span className='text-base dark:bg-dark dark:text-white font-medium'>Waiting Approval</span>
                                        <span className='bg-[#F3F4F6] text-primary dark:bg-dark dark:text-white px-2 rounded'>{project.task_counts.pending_approval}</span></div>


                                    <div className='h-6 rounded-md flex items-center gap-2  justify-center text-sm'>
                                        <span className='text-base dark:bg-dark dark:text-white font-medium'>In Improvement</span>
                                        <span className='bg-[#F3F4F6] text-primary dark:bg-dark dark:text-white px-2 rounded'>{project.task_counts.improvement}</span></div>


                                    <div className='h-6 rounded-md flex items-center gap-2  justify-center text-sm'>
                                        <span className='text-base dark:bg-dark dark:text-white font-medium'>In Awaiting</span>
                                        <span className='bg-[#F3F4F6] text-primary dark:bg-dark dark:text-white px-2 rounded'>{project.task_counts.awaiting}</span></div>


                                    <div className='h-6 rounded-md flex items-center gap-2  justify-center text-sm'>
                                        <span className='text-base dark:bg-dark dark:text-white font-medium'>Completed</span>
                                        <span className='bg-[#F3F4F6] text-primary dark:bg-dark dark:text-white px-2 rounded'>{project.task_counts.completed}</span></div>


                                    <div className='h-6 rounded-md flex items-center gap-2  justify-center text-sm'>
                                        <span className='text-base dark:bg-dark dark:text-white font-medium'>Rejected</span>
                                        <span className='bg-[#F3F4F6] text-primary dark:bg-dark dark:text-white px-2 rounded'>{project.task_counts.rejected}</span></div>
                                </div>
                            </div>

                        </div>
                    </div>
                )) :
                    <>
                        <div className="flex items-center justify-center md:h-[60vh] w-full "  >
                            <div className="modal-content dark:bg-dark dark:text-white" onClick={e => e.stopPropagation()} data-aos='fade'>
                                <div className='w-full bg-gray-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center dark:bg-dark dark:text-white'>
                                    Add Project</div>
                                <form className="modal-form" onSubmit={handleCreateProject}>
                                    <div>
                                        <label className="mb-3 block text-body-lg font-semibold text-primary  dark:text-white">
                                            Project Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                        />
                                    </div>


                                    <div>
                                        <label className="mb-3 block text-body-lg font-semibold text-primary  dark:text-white">
                                            Project URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="http://www.example.com"
                                            value={projectUrl}
                                            onChange={(e) => setProjectUrl(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <button
                                        type='submit'

                                        className='bg-primary hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                                    > <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Create project</span></button>
                                </form>
                            </div>
                        </div>
                    </>
                 }
            </div>




        </DefaultLayout>
    )
}

export default AllMyProjects
