"use client"

import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Space, Popover, Modal, Checkbox, Select } from 'antd';
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout';
import { FaRegEye } from 'react-icons/fa';
import { TbInvoice } from 'react-icons/tb';
import { BASE_URL } from '@/utils/api';
import { formated_date } from '@/utils/custom-functions';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Page = () => {

const router = useRouter();

const [Invoice, setInvoice] = useState()
useEffect(() => {
  fetchInvoice(); 
}, []) 

const fetchInvoice = async () => {
    const token = Cookies.get("login_access_token");
    try {
        const response = await axios.get(`${BASE_URL}invoice/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        
        // Transform the data
        const transformedData = response.data.map(invoice => {
            const totalBuyerAmount = invoice.tasks.reduce((sum, task) => sum + parseFloat(task.buyer_amount), 0);
            return {
                ...invoice,
                total_buyer_amount: totalBuyerAmount.toFixed(2) // Format to 2 decimal places
            };
        });

        setInvoice(transformedData);
        const unpaidInvoices = transformedData.filter(invoice => !invoice.paid_status);
        const totalUnpaidAmount = unpaidInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.total_buyer_amount), 0);

        // console.log("Total amount for unpaid invoices:", totalUnpaidAmount.toFixed(2));
        // console.log("transformed data",transformedData);
    } catch (error) {
        console.error('Failed to fetch invoice:', error);
    }
};

  const columns = [
    {
        title: 'Invoice ID',
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
        }
        
    },
    {
        title: 'Price',
        dataIndex: 'total_buyer_amount',
        key: 'total_buyer_amount',
        render: (text) => {
            return (
                <h3 className='dark:text-blue-500'>{"$" + (text)}</h3>);    
        },
        
    },
    {
      title: 'Status',
      dataIndex: 'paid_status',
      key: 'paid_status',
      render: (text) => {
          return (        
          <span
          className={`font-semibold w-[200px] text-center px-5 py-1 rounded-md ${
            text ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'
          }`}
        >
          {text ? 'Paid' : 'Unpaid'}
        </span>)
      }



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
                        onClick={() => router.push(`/all-invoices?uid=${record.uid}`)}
                    />
                </div>
            );
        },
    },
];

  return (


    <DefaultLayout>
<div className='flex flex-col gap-4'>
<h1 className='text-center text-lg md:text-xl font-bold '>Invoices</h1>

<Table
                    columns={columns}
                    dataSource={Invoice}
                    rowKey="uid"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />

</div>


    </DefaultLayout>
  )
}

export default Page
