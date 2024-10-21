"use client"
import React, { useEffect, useState } from 'react'
import HeaderComp from "@/components/HeaderComp";
import { BASE_URL } from '@/utils/api';
import axios from 'axios';
import { LinkPreview } from '@/components/ui/link-preview';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegEye } from 'react-icons/fa';
import { Table, Input, Button, Space, Popover, Modal, Checkbox, Select } from 'antd';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { Tabs } from 'antd';
import { formated_date } from '@/utils/custom-functions';


const Page = () => {

  const [payMet, setPayMet] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}common-website-details/`, {

        });
        setPayMet(response.data.payment_methods);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

  const captureScreenshot = () => {
    const element = document.getElementById('content');
    const excludeElement = document.getElementById('exclude');
    const upBtns = document.querySelectorAll('.upBtn');

    if (excludeElement) {
      excludeElement.style.display = 'none';
    }

    if (upBtns.length > 0) {
      upBtns.forEach(btn => {
        btn.style.backgroundColor = 'transparent';
        btn.style.color = 'rgb(87, 80, 241)';
      });
    }

    const options = {
      margin: 0,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'px', format: [window.innerWidth, window.innerHeight], orientation: 'landscape' }
    };

    html2pdf().from(element).set(options).save().finally(() => {
      if (excludeElement) {
        excludeElement.style.display = '';
      }
      if (upBtns.length > 0) {
        upBtns.forEach(btn => {
          btn.style.backgroundColor = '';
          btn.style.color = '';
        });
      }
    });
  };



  const router = useRouter();

  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => {
        return (
          <h3>{formated_date(text)}</h3>);    
      },
    },
    {
      title: 'Price',
      dataIndex: 'total_buyer_amount',
      key: 'total_buyer_amount',
      render: (text) => "$" + text
    },
    {
      title: 'Status',
      dataIndex: 'paid_status',
      key: 'paid_status',
      render: (text) => (
        <span
          className={`font-semibold w-[200px] text-center px-5 py-1 rounded-md ${text ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'
            }`}
        >
          {text ? 'Paid' : 'Unpaid'}
        </span>
      ),

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
              onClick={() => {
                setUid(record.uid);
                router.push(`/all-invoices?uid=${record.uid}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const [invoice, setInvoice] = useState("")
  // console.log(invoice);

  const [uid, setUid] = useState("")

  const [invoice_data, setInvoice_Data] = useState()
  // console.log(invoice_data);
  

  const [all_invoice_data, setAll_Invoice_Data] = useState()

  const[totalUpAmt, setTotalUpAmt] = useState("")
  const[totalPAmt, setTotalPAmt] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('uid');
    if (id) {
      setUid(id);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(`${BASE_URL}invoice/?invoice_id=${uid}`);
          setInvoice(response.data);
          // console.log(response.data);


          const unpaidInvoices = response.data.filter(invoice => !invoice.paid_status);
          const totalUnpaidAmount = unpaidInvoices.reduce((sum, invoice) => {
              const invoiceTotalBuyerAmount = invoice.tasks.reduce((taskSum, task) => {
                  return taskSum + parseFloat(task.buyer_amount);
              }, 0);
              
              return sum + invoiceTotalBuyerAmount;
          }, 0);
          setTotalUpAmt(totalUnpaidAmount.toFixed(2));

          const paidInvoices = response.data.filter(invoice => invoice.paid_status);
          const totalPaidAmount = paidInvoices.reduce((sum, invoice) => {
              const invoiceTotalBuyerAmount = invoice.tasks.reduce((taskSum, task) => {
                  return taskSum + parseFloat(task.buyer_amount);
              }, 0);
              
              return sum + invoiceTotalBuyerAmount;
          }, 0);
          setTotalPAmt(totalPaidAmount.toFixed(2));


          const invoiceData = response.data.find(item => item.uid === uid);
          setInvoice_Data(invoiceData);

          const allInvoiceData = response.data.filter(item => item.uid !== uid);
          const transformedData = allInvoiceData.map(invoice => {
            const totalBuyerAmount = invoice.tasks.reduce((sum, task) => sum + parseFloat(task.buyer_amount), 0);
            return {
              ...invoice,
              total_buyer_amount: totalBuyerAmount.toFixed(2)
            };
          });
          setAll_Invoice_Data(transformedData);

        } catch (error) {
          console.error('Failed to fetch invoice:', error);
        }

      };

      fetchInvoice();
    }
  }, [uid]);






  const headers = [
    'uid',
    'task_status',
    'publishersite_domain',
    'created_at',
    'task_type',
    'buyer_amount',
    'paid_status'
  ];
  const subtotal = invoice_data?.tasks?.reduce((sum, task) => sum + parseFloat(task.buyer_amount || 0), 0).toFixed(2);






  return (
    <div>
      <HeaderComp />

      <div className="container mx-auto p-4 "  >
        <div className='flex justify-start w-full mx-auto h-full px-4  py-8 flex-col gap-2 ' id="content">
          <h1 className=' py-2 w-full text-2xl font-medium text-primary  '>Invoice Id: {invoice_data?.uid}</h1>
          <div className=' flex justify-between'>
            <h1
              className='upBtn text-xl font-semibold px-6 py-2 rounded-md text-white bg-primary w-[200px] text-center'>
              VefoGix
            </h1>
            <h1
              id='exclude'
              onClick={captureScreenshot}
              className='text-base  px-6 justify-center items-center flex rounded-md text-white bg-primary w-[200px] text-center cursor-pointer hover:text-lg hover:bg-primary/80 transition-all ease-in-out duration-300'>
              Download
            </h1>
          </div>
          <h1 className=' py-2 w-full text-base font-bold text-red '>Invoice Date: {new Date(invoice_data?.invoice_date).toLocaleDateString()}</h1>
          <div className=' flex justify-between '>
            <div className=''>
              <span className='text-base font-semibold text-black'>To:</span> <br />
              <span className=" text-base text-black">Name:{" "}{invoice_data?.user_details?.username}</span><br />
              <span className=" text-base text-black">Email:{" "}{invoice_data?.user_details?.email}</span><br />
            </div>
            <div className='text-black flex flex-col gap-2'>
              <h1
                className={`text-${invoice_data?.paid_status ? 'green-600' : 'red-600'} upBtn font-semibold w-[200px]  text-center px-10 py-2 rounded-md bg-${invoice_data?.paid_status ? 'green-200' : 'red-200'} `}>
                {invoice_data?.paid_status ? 'Paid' : 'Unpaid'}
              </h1>
            </div>
          </div>


          <div className='w-full mt-4'>
            <div className='w-full mx-auto border border-gray-300 rounded-lg shadow-md overflow-hidden text-black'>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">ORDER ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DOMAIN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">TASK TYPE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">QUANTITY</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice_data?.tasks?.map(task => (
                    <tr key={task.uid}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.uid}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.publishersite_domain}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {task.task_type === "cp" && "Content Placement" ||
                          task.task_type === "ccp" && "Content Creation And Placement" ||
                          task.task_type === "li" && "Link Insertion" || "Unknown Task Type"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${task.buyer_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className=' flex justify-between mt-2'>
            <table className='w-[300px] table-auto divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-md overflow-hidden text-black'>
              <tbody className='divide-y divide-gray-200'>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium'>Total unpaid</td>
                  <td className='px-4 py-2 '>{invoice_data?.invoice_count?.unpaid}</td>
                </tr>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium'>Total paid</td>
                  <td className='px-4 py-2 '>{invoice_data?.invoice_count?.paid}</td>
                </tr>
              </tbody>
            </table>


            <table className='w-[300px] table-auto divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-md overflow-hidden text-black'>
              <tbody className='divide-y divide-gray-200'>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium'>Sub Total</td>
                  <td className='px-4 py-2 '>${subtotal}</td>
                </tr>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium'>Tax</td>
                  <td className='px-4 py-2 '>$0.00</td>
                </tr>
                <tr className='bg-white'>
                  {invoice_data?.paid_status ?
                    <td className='px-4 py-2 font-medium'>Total </td> :
                    <td className='px-4 py-2 font-medium'>Total Due</td>}
                  <td className='px-4 py-2 text-blue-600 font-semibold'>${subtotal}</td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>

        <div className='rounded-lg shadow-md overflow-hidden text-black bg-white mx-4'>
          <Tabs defaultActiveKey="1" centered>
            {payMet?.map((method) => (
              <Tabs.TabPane
                tab={method.title}
                key={method.id}
              >
                <h3 className='text-base font-medium text-center pb-4'>{method.details}</h3>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>


        <div className='flex flex-col gap-4 my-4 mx-4'>
          <h1 className='text-2xl text-center font-medium text-primary '>Other Invoices</h1>
<div className=' flex w-full gap-2'>


<Table
            columns={columns}
            dataSource={all_invoice_data}
            rowKey="uid"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
            className='w-full '
          />

<table className='w-[400px] h-[175px] table-auto divide-y border rounded-lg   overflow-hidden text-black'>
              <tbody className='divide-y divide-gray-200'>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium'>Unpaid Sub Total</td>
                  <td className='px-4 py-2 text-blue-600 font-semibold'>${totalUpAmt}</td>
                </tr>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium'>Discount</td>
                  <td className='px-4 py-2 text-blue-600 font-semibold'>${0.00}</td>
                </tr>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium'>Unpaid Total Due</td>
                  <td className='px-4 py-2 text-blue-600 font-semibold'>${totalUpAmt}</td>
                </tr>
              </tbody>
            </table>


</div>


        </div>

      </div>






      {/* Footer */}
      <footer className="foo_ter">
        <p>Thanks for choosing Vefogix |
          <LinkPreview
            url="http://vefogix.com/"
            className="cursor-pointer mx-3 hover:text-white text-white hover:scale-105 transition-all ease-in-out duration-300 "
          >
            <Link target='_blank' href={"mailto:support@Vefogix.com"} className='hover:text-white text-white'>
              support@Vefogix.com
            </Link>

          </LinkPreview>
          </p>
      </footer>


    </div>
  )
}

export default Page
