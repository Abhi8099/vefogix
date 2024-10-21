"use client"

import { Input, Modal } from 'antd';
import Image from 'next/image'
import React, { useState } from 'react'
import styles from "./styles.module.css";
import styled from "styled-components";
import Script from 'next/script';
import { Link as ScrollLink } from "react-scroll";
import { RiTwitterXLine } from "react-icons/ri";
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';

export function FooterFour() {
    const [email, setEmail ] = useState('')

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (email) {
                try {
                    const response = await axios.post(`${BASE_URL}newsletter/`, { email: email ,is_subscribed: true});
                    toast.success("Added Favourite Site");
                    console.log('Subscribed email:', response.data);
                    return response;
                } catch (error) {
                    // console.error('Error ', error.response.data.email );
                    toast.error(error?.response?.data?.email);
                }
        } else {
          console.log('Please enter a valid email address.');
        }
      };
    return (
        <>


            <section className="relative overflow-hidden py-10 ">
                <div className="relative z-10 mx-auto max-w-[100rem] px-4 ">
                    <div className="-m-6 flex flex-wrap">
                        <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                            <div className="flex h-full flex-col justify-between">
                                <div className="mb-4 inline-flex items-center">
                                    <Image
                                        src="/images/new/Group 1000003985.svg"
                                        height={70}
                                        width={200}
                                        alt="Logo"
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="mb-4  text-base font-medium">Top #1 SEO & Guest Post Agency</p>
                                    <p className="text-sm text-gray-600">
                                        &copy; Copyright 2024. All Rights Reserved by Vefogix.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-black">
                                    Company
                                </h3>
                                <ul>
                                    <li className="mb-4 slide_btn group slide_btn group">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary  " href="#">
                                            Features
                                        </a>
                                    </li>
                                    <li className="mb-4 slide_btn group">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="/payment">
                                            Payment
                                        </a>
                                    </li>
                                    <li className="mb-4 slide_btn group">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="/refund-policy">
                                            Refund Policy
                                        </a>
                                    </li>
                                    <li className=" slide_btn group cursor-pointer">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="/press-release   ">
                                            Press Release
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-black">
                                    Support
                                </h3>
                                <ul>
                                    <li className="mb-4 slide_btn group">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="#">
                                            Account
                                        </a>
                                    </li>
                                    <li className="mb-4 slide_btn group">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="#">
                                            Help
                                        </a>
                                    </li>
                                    <li
                                        className="mb-4 slide_btn group cursor-pointer">
                                        <a
                                            href='#contact'
                                            className=" text-base font-medium text-gray-900 group-hover:text-primary" >
                                            Contact Us
                                        </a>
                                    </li>
                                    <li className=" slide_btn group cursor-pointer">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="#">
                                            Customer Support
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-black">
                                    Legals
                                </h3>
                                <ul>
                                    <li className="mb-4 slide_btn group">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="/terms-and-conditions">
                                            Terms &amp; Conditions
                                        </a>
                                    </li>
                                    <li className="mb-4 slide_btn group">
                                        <a className=" text-base font-medium text-gray-900 group-hover:text-primary" href="/privacy-policy">
                                            Privacy Policy
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-black">
                                    Get In Touch
                                </h3>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex flex-col xl:flex-row '>
                                        <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" 
                                        name="" 
                                        id="" 
                                        className='py-3 bg-[#f5f5f5] px-3 border xl:w-2/3 text-black outline-none' placeholder='Your Email' />
                                        <button 
                                        onClick={handleSubscribe}
                                        className=' py-3 px-4 xl:w-1/3 bg-primary text-white hover:scale-110 hover:rounded-md duration-100 ease-in-out transition-all active:scale-95'>Subscribe</button>
                                    </div>
                                    <h3>Subscribe to Vefogix and get distinction without even asking. Sign in Today!</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


const StyledWrapper = styled.div`
/* From Uiverse.io by ubaidi10 */ 
.card {
  width: fit-content;
  height: fit-content;
  background-color: rgba(238, 238, 238,0);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055);
}

/* for all social containers*/
.socialContainer {
  width: 40px;
  height: 40px;
  background-color: rgb(44, 44, 44);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition-duration: 0.3s;
}
/* instagram*/
.containerOne:hover {
  background-color: #d62976;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 10px;
}
/* twitter*/
.containerTwo:hover {
  background-color: #00acee;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 10px;
}
/* linkdin*/
.containerThree:hover {
  background-color: #0072b1;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 10px;
}
/* Whatsapp*/
.containerFour:hover {
  background-color: #25d366;
  transition-duration: 0.3s;
  transform: scale(1.5);
  border-radius: 10px;
}

.socialContainer:active {
  transform: scale(0.9);
  transition-duration: 0.3s;
}

.socialSvg {
  width: 17px;
}

.socialSvg path {
  fill: rgb(255, 255, 255);
}

.socialContainer:hover .socialSvg {
  animation: slide-in-top 0.3s both;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


`;

