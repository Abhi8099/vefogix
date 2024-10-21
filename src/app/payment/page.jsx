"use client";
import React, { useEffect, useState } from 'react';
import HeaderComp from "@/components/HeaderComp";
import { FooterFour } from "@/components/Footer";
import { Table, Typography } from 'antd';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';
import Image from 'next/image';
import Aos from "aos";
import "aos/dist/aos.css";

const { Title } = Typography;

const Page = () => {
  
  useEffect(() => {
    Aos.init({});
  }, []);

  const[isClicked, setIsClicked] = useState(false)


  const [payMet, setPayMet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}common-website-details/`);
        setPayMet(response.data.payment_methods);
      // console.log(response.data.payment_methods);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Method',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Title level={5} className='text-blue-600'>{text}</Title>,
    },
    {
      title: 'Detail',
      dataIndex: 'details',
      key: 'details',
      render: (text) => <Title level={5} className='text-gray-700'>{text}</Title>,
    },

  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <HeaderComp />
      <div className='flex items-center justify-center w-full h-full  lg:px-25 md:px-12.5 xl:px-50 mt-10 '>

      <div className='flex flex-col h-auto gap-10 justify-center px-6 py-10 '>
        <h1 className='text-center text-2xl md:text-3xl text-primary font-bold mb-8'>
          Direct Payment Details
        </h1>

        <div className='flex flex-col md:flex-row gap-8 justify-center' data-aos="fade-up" data-aos-delay="150">
          <Table
            className='w-full md:w-2/3 bg-white shadow-md rounded-lg'
            columns={columns}
            dataSource={payMet}
            pagination={false}
            rowKey="uid"
            scroll={{ x: 'max-content' }}
          />

<div
        className='w-full  md:w-1/3 bg-white shadow-md rounded-lg flex flex-col items-center hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'
        onClick={handleOpenModal}
      >
        <h1 className='text-xl font-bold mb-4 w-full text-center bg-primary text-white py-2 rounded-t-lg'>
          UPI
        </h1>
        <div className='w-full flex justify-center'>
          <Image
            className="object-cover"
            src="/images/new/image-1.png"
            alt="UPI"
            width={194} 
            height={100}
          />
        </div>
        <div className='w-full  bg-white  rounded-lg flex flex-col items-center p-6'>
            <h1 className=' text-lg md:text-xl font-bold text-black mb-4 text-center'>
              If you use these methods to pay directly, mention the following transaction details after the transaction to confirm:
            </h1>
            <p className='text-center'>
              - Mail ID/Number you paid from
            </p>
            <p className='text-center'>
              - Transaction ID
            </p>
            <p className='text-center'>
              - Transaction Screenshot
            </p>
          </div>

          <div className='w-full  bg-white  rounded-lg flex flex-col items-center p-6'>
            <h1 className='text-lg md:text-xl font-bold  text-black mb-4 text-center'>
              Payment
            </h1>
            <p
            className='text-center'>
              - Email us: <a href="mailto:support@guestpostsale.com" className='text-primary underline'>support@vefogix.com</a>
            </p>
            <p
            className='text-center'>
              - WhatsApp: <a href="tel:+918949272273" className='text-primary underline'>+91-8949272273</a>
            </p>
          </div>


      </div>
      {isModalOpen && (

          <div className='relative' data-aos="fade-up">
            <Image
              className='object-contain z-10'
              src="/images/new/image-1.png"
              alt="UPI"
              layout='intrinsic'
              width={400} 
              height={400} 
            />
            <button
              onClick={handleCloseModal}
              className='absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300'
            >
              &times;
            </button>
          </div>

      )}

        </div>

        {/* <div className='flex flex-col md:flex-row gap-6' data-aos="fade-up" data-aos-delay="300">
          <div className='w-full md:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center p-6'>
            <h1 className=' text-lg md:text-xl font-bold text-black mb-4 text-center'>
              If you use these methods to pay directly, mention the following transaction details after the transaction to confirm:
            </h1>
            <p className='text-center'>
              - Mail ID/Number you paid from
            </p>
            <p className='text-center'>
              - Transaction ID
            </p>
            <p className='text-center'>
              - Transaction Screenshot
            </p>
          </div>

          <div className='w-full md:w-1/2 bg-white shadow-md rounded-lg flex flex-col items-center p-6'>
            <h1 className='text-lg md:text-xl font-bold  text-black mb-4 text-center'>
              Payment
            </h1>
            <p className='text-center'>
              - Email us: <a href="mailto:support@guestpostsale.com" className='text-primary underline'>support@vefogix.com</a>
            </p>
            <p className='text-center'>
              - WhatsApp: <a href="tel:+918949272273" className='text-primary underline'>+91-8949272273</a>
            </p>
          </div>
        </div> */}
      </div>
      </div>
      <FooterFour />
    </>
  );
};

export default Page;
