"use client"
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { BiLogoLinkedin } from "react-icons/bi";
import { PiInstagramLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";


const Page = () => {
    const [firstName, setFirstName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [messageError, setMessageError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateName = (name) => {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(name) && name.trim() !== '';
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^[0-9\s]+$/;
        return regex.test(phoneNumber) && phoneNumber.trim() !== '';
    };

    const validateMessage = (message) => {
        return message.trim() !== '';
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        if (!validateEmail(emailValue)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleNameChange = (e, setName) => {
        const nameValue = e.target.value;
        setName(nameValue);

        if (!validateName(nameValue)) {
            setNameError('Name should only contain letters and spaces and not be empty');
        } else {
            setNameError('');
        }
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        setPhoneNumber(phoneValue);

        if (!validatePhoneNumber(phoneValue)) {
            setPhoneError('Phone number should only contain numbers and spaces and not be empty');
        } else {
            setPhoneError('');
        }
    };

    const handleMessageChange = (e) => {
        const messageValue = e.target.value;
        setMessage(messageValue);

        if (!validateMessage(messageValue)) {
            setMessageError('Message cannot be empty');
        } else {
            setMessageError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email) || !validateName(firstName) || !validatePhoneNumber(phoneNumber) || !validateMessage(message)) {
            alert('Please fix the errors before submitting');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}contact-form/`,
                {
                    name: firstName,
                    email: email,
                    message: message,
                    phone_number: phoneNumber
                }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Message Sent Successfully.");
            setFirstName("")
            setPhoneNumber("")
            setEmail("")
            setMessage("")

        } catch (error) {
            console.error('Error Message', error.response || error);
        }
    };

    return (
        <div className="custom-form-container flex md:flex-row flex-col w-full xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px] py-30">
            <div className=' items-center md:justify-center  flex md:w-1/4 w-full '>
                <h3 className='  text-white font-semibold leading-tight'>
                    <span className='text-base'>Think Success, Think Us!</span><br /> <span className='text-5xl font-extrabold'>Let&apos;s get in <br /> touch.</span>

                </h3>
            </div>


            <div className=' flex md:w-3/4 w-full justify-center items-center'>
                <form className="custom-form w-full" onSubmit={handleSubmit}>
                    <div className='flex md:flex-row flex-col  gap-4 w-full'>
                        <div className="custom-form-group flex-1">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="custom-form-input"
                                placeholder='Name'
                                value={firstName}
                                onChange={(e) => handleNameChange(e, setFirstName)}
                                required
                            />
                            {nameError && <p className="text-red-400 text-base">{nameError}</p>}
                        </div>
                        <div className="custom-form-group flex-1">
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="custom-form-input"
                                placeholder='Contact No.'
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                required
                            />
                            {phoneError && <p className="text-red-400 text-base">{phoneError}</p>}
                        </div>
                        <div className="custom-form-group flex-1">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="custom-form-input"
                                placeholder='Email'
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            {emailError && <p className="text-red-400 text-base">{emailError}</p>}
                        </div>

                    </div>



                    <div className="flex flex-col gap-0.5">
                        <textarea
                            name="message"
                            id="message"
                            rows="10"
                            cols="50"
                            className="custom-form-textarea"
                            placeholder='Message...'
                            value={message}
                            onChange={handleMessageChange}
                            required
                        />
                        {messageError && <p className="text-red-400 text-base">{messageError}</p>}
                    </div>

                    <div className='flex justify-between md:flex-row flex-col gap-4 md:gap-0'>
                        <button className="w-50 rounded-lg border border-white py-3 px-4 text-lg smooth hover:text-primary hover:bg-white " type="submit" disabled={emailError || nameError || phoneError || messageError}>
                            <span className="">Submit</span>
                        </button>

                        <div className='flex gap-2'>
                            <div className='h-12 w-12 rounded-full flex items-center justify-center text-xl bg-white cursor-pointer group hover:bg-[#D62976] smooth'>
                                <a target='_blank' href="https://www.instagram.com/vefogix/"><PiInstagramLogo className='text-xl text-primary group-hover:text-white group-hover:scale-110 smooth' /></a>
                            </div>
                            <div className='h-12 w-12 rounded-full flex items-center justify-center text-xl bg-white cursor-pointer group hover:bg-[#0077B5] smooth'>
                                <a target='_blank' href="https://www.linkedin.com/company/vefogix/">                            <BiLogoLinkedin className='text-2xl text-primary group-hover:text-white group-hover:scale-110 smooth' /></a>
                            </div>
                            <div className='h-12 w-12 rounded-full flex items-center justify-center text-xl bg-white cursor-pointer group hover:bg-[#E60023] smooth'>
                                <a target='_blank' href="https://www.pinterest.com/VefoGix/">                            <FaPinterestP className='text-xl text-primary group-hover:text-white group-hover:scale-110 smooth' /></a>
                            </div>
                            <div className='h-12 w-12 rounded-full flex items-center justify-center text-xl bg-white cursor-pointer group hover:bg-[#25D366] smooth'>
                                <a target='_blank' href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0">                            <FaWhatsapp className='text-xl text-primary group-hover:text-white group-hover:scale-110 smooth' /></a>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page;
