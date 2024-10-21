"use client"
import React, { useEffect, useState } from 'react'
import styles from './CustomCursor.module.css';
import HeaderComp from "@/components/HeaderComp";
import { BASE_URL } from '@/utils/api';
import axios, { Axios } from 'axios';
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
import { FiDownload } from "react-icons/fi";
import { VscEye } from "react-icons/vsc";
import styled from 'styled-components';
import { SiRazorpay } from "react-icons/si";
import toast from 'react-hot-toast';


const Page = () => {

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true); 

    try {
        const response = await axios.post(`${BASE_URL}paynow/`, { invoice_id: uid });
        console.log('API Response:', response.data);

        if (response.status === 200) {
            const paymentDetails = response.data.payment;

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
                amount: paymentDetails.amount, 
                currency: paymentDetails.currency, 
                name: 'Vefogix',
                description: 'Test Transaction',
                order_id: paymentDetails.id, 
                handler: function (response) {
                  console.log(' Response:', response);
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                    console.log('Payment Response:', response);

                    axios.post(`${BASE_URL}payment-verify/`, {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                        invoice_id: uid, 
                    }).then(verificationResponse => {
                        if (verificationResponse.status === 200) {
                            alert('Payment verified successfully: ' + razorpay_payment_id);
                        } else {
                            alert('Payment verification failed');
                        }
                    }).catch(verificationError => {
                        console.error('Verification Error:', verificationError.response || verificationError);
                        alert('An error occurred while verifying payment. Please contact support.');
                    });

                    setLoading(false); 
                },
                // prefill: {
                //     name: 'Customer Name',
                //     email: 'customer@example.com',
                //     contact: '9999999999',
                // },
// },
theme: {
  color: '#344C92',

},

            };

            console.log('Razorpay options:', options); // Debugging log

            // Ensure Razorpay is loaded
            if (typeof window !== 'undefined' && window.Razorpay) {
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                console.error('Razorpay SDK not loaded');
                alert('Razorpay SDK is not loaded. Please try again later.');
                setLoading(false); // Stop loading state if Razorpay is not loaded
            }
        } else {
            throw new Error('Failed to retrieve payment details');
        }
    } catch (error) {
        console.error('Error:', error.response || error);
        alert('Payment initiation failed. Please try again.'); // Inform user about failure
        setLoading(false); // Stop loading state on error
    }
};






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
      jsPDF: { unit: 'px', format: [window.innerWidth, window.innerHeight], orientation: 'portrait' }
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
      dataIndex: ['invoice_items', '0'],
      key: 'rate',
      render: (item) =>{
  return(
    <span className='text-[#344C92] font-medium'>{(invoice_data?.user_details?.currency) + (item.rate * item.quantity)}</span>
    
  )
}
        
    },    
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <span
          className={`font-semibold w-[200px] text-center px-5 py-1 rounded-md ${text === "paid" ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'
            }`}
        >
{text?.charAt(0).toUpperCase() + text?.slice(1)}
        </span>
      ),

    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <div className='flex gap-2' >
            <VscEye
className='bg-[#344C92] text-white text-2xl'
              style={{

                border: '1px solid #344C92',
                padding: '3px',
                cursor: 'pointer',
                height: '27px',
                width: '40px',
                borderRadius: '5px',
              }}
              onClick={() => {
                setUid(record.uid);
                router.push(`/invoice?id=${record.uid}`);
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
  

  const payMet = invoice_data?.payment_methods || [];

  // console.log(invoice_data);


  const [all_invoice_data, setAll_Invoice_Data] = useState()
  // console.log(all_invoice_data);
  

  const [totalUpAmt, setTotalUpAmt] = useState("")
  const [totalPAmt, setTotalPAmt] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setUid(id);
    }
  }, []);
  const [dis, setDis] = useState(0.00);

useEffect(() => {
  const fetchInvoices = async () => {
    if (uid) {
      try {
        const response = await axios.get(`${BASE_URL}invoices/?id=${uid}`);
        const data = response.data;
        // console.log("Fetched Data:", data);

        // Find and set the specific invoice
        const invoice = data.find(item => item.uid === uid);
        setInvoice_Data(invoice);
        // console.log("Invoice Data:", invoice);

        // Filter out other invoices
        const otherInvoices = data.filter(item => item.uid !== uid);
        setAll_Invoice_Data(otherInvoices);
        // console.log("Other Invoices:", otherInvoices);

        // Calculate total unpaid amount
        const unpaidInvoices = data.filter(invoice => invoice.status === "unpaid");
        const totalUnpaidAmount = unpaidInvoices.reduce((sum, invoice) => { 
          const invoiceTotalBuyerAmount = (invoice.invoice_items || []).reduce((taskSum, task) => {
            return taskSum + parseFloat((task.rate * task.quantity) || 0);
          }, 0);
          return sum + invoiceTotalBuyerAmount;
        }, 0);
        setTotalUpAmt(totalUnpaidAmount.toFixed(2));
        
        // Calculate total discount on unpaid invoices
        const totalDiscountOnUnpaidInvoices = unpaidInvoices.reduce((totalDiscount, invoice) => {
          const discountValue = parseFloat(invoice.discount);
          const discountType = invoice.discount_type;
          
          // Calculate subtotal for this specific invoice
          const subtotal = (invoice.invoice_items || []).reduce((taskSum, task) => {
              return taskSum + parseFloat((task.rate * task.quantity) || 0);
          }, 0);
      
          // Apply discount
          const discount = getDiscount(discountType, discountValue, subtotal);
      
          // Accumulate the total discount
          return totalDiscount + discount;
      }, 0);
      
      // console.log("Total Discount on Unpaid Invoices:", totalDiscountOnUnpaidInvoices.toFixed(2));
      setDis(totalDiscountOnUnpaidInvoices.toFixed(2));
        // Calculate total paid amount
        const paidInvoices = data.filter(invoice => invoice.status === "paid");
        const totalPaidAmount = paidInvoices.reduce((sum, invoice) => {
          const invoiceTotalBuyerAmount = (invoice.invoice_items || []).reduce((taskSum, task) => {
            return taskSum + parseFloat((task.rate * task.quantity) || 0);
          }, 0);
          return sum + invoiceTotalBuyerAmount;
        }, 0);
        setTotalPAmt(totalPaidAmount.toFixed(2));

      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    }
  };

  fetchInvoices();
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
  const subtotal = invoice_data?.invoice_items?.reduce((sum, item) => sum + parseFloat(item.rate * item.quantity || 0), 0).toFixed(2);

  const getDiscount = (type, value, amount) => {
    if (type === "percent") {
      return ((amount * value) / 100)
    }
    else if (type === "amount") {
      return (value)
    }
  }

  useEffect(() => {
    const updateCursorPosition = (e) => {
        const cursorElements = ['cursor', 'cursor2', 'cursor3'].map(id => document.getElementById(id));
        cursorElements.forEach(cursor => {
            if (cursor) {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            }
        });
    };

    const handleMouseOver = () => {
        document.getElementById("cursor2")?.classList.add(styles.hover);
        document.getElementById("cursor3")?.classList.add(styles.hover);
    };

    const handleMouseOut = () => {
        document.getElementById("cursor2")?.classList.remove(styles.hover);
        document.getElementById("cursor3")?.classList.remove(styles.hover);
    };

    document.body.addEventListener('mousemove', updateCursorPosition);

    const hoverTargets = document.querySelectorAll(".hover-target, .hover-target-2");
    hoverTargets.forEach(target => {
        target.addEventListener('mouseover', handleMouseOver);
        target.addEventListener('mouseout', handleMouseOut);
    });

    const handleClassChange = (selector, className) => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('mouseenter', () => document.body.classList.add(className));
            element.addEventListener('mouseleave', () => document.body.classList.remove(className));
        }
    };

    handleClassChange('.logo', 'logo-wrap');
    handleClassChange('.img-1', 'img-1-wrap');
    handleClassChange('.img-2', 'img-2-wrap');
    handleClassChange('.img-3', 'img-3-wrap');
    handleClassChange('.img-4', 'img-4-wrap');

    // Cleanup event listeners on unmount
    return () => {
        document.body.removeEventListener('mousemove', updateCursorPosition);
        hoverTargets.forEach(target => {
            target.removeEventListener('mouseover', handleMouseOver);
            target.removeEventListener('mouseout', handleMouseOut);
        });
    };
}, []);


  return (
    <div className='bg-white'>
      <HeaderComp />

      <div className="container mx-auto md:my-10 md:p-10 bg-white rounded-lg shadow-lg"  >
        <div className='flex justify-start w-full mx-auto h-full px-4  py-8 flex-col gap-2 ' id="content">
        <div className='gap-4 text-[38px] text-black font-semibold flex  '>
            {/* <h1
              className='upBtn text-xl font-semibold px-6 py-2 rounded-md text-white bg-primary w-[200px] text-center'>
              VefoGix
            </h1> */}
            <h1>Invoice</h1>
            <h1
              id='exclude'
              onClick={captureScreenshot}
              className='flex items-center justifyce hover-target justify-center px-3 py-1  rounded-md  bg-[#4e2fda21]  text-center cursor-pointer hover:text-lg hover:bg-primary/80 hover:text-white gap-2 transition-all ease-in-out duration-300 text-[#344C92] text-lg'>

              Download
              <FiDownload />
            </h1>
            {/* {invoice_data?.status === "unpaid" ?
                        <h1
                        id='exclude'
                        onClick={handlePayment} disabled={loading}
                        className='flex items-center justifyce hover-target justify-center px-3 py-1  rounded-md  bg-[#4e2fda21]  text-center cursor-pointer hover:text-lg hover:bg-primary/80 hover:text-white gap-2 transition-all ease-in-out duration-300 text-[#344C92] text-lg'>
          
          {loading ? 'Processing...' : 'Pay Now'}
                        <SiRazorpay />
                      </h1>
            : 
            ""
            } */}

          </div>
          <hr className='mt-2 mb-6' />


          <div className='flex justify-between'>
  <div className='flex-1 flex flex-col gap-2'>

 <h1 className='text-black text-base '>To: <span className=" font-bold text-black">{invoice_data?.user_details?.name}</span></h1>  
 <h1 className='text-black text-base '>Email: <span className=" font-bold text-black"> {invoice_data?.user_details?.email}</span></h1>
 <h1 className='text-black text-base '>Total Unpaid: <span className=" font-bold text-black"> {invoice_data?.invoice_count?.unpaid}</span></h1>
 <h1 className='text-black text-base '>Total Paid: <span className=" font-bold text-black"> {invoice_data?.invoice_count?.paid}</span></h1>
  </div>

  <div className='flex-1 flex flex-col items-end justify-end gap-2'>
  <h1 className='text-black text-base '>Invoice ID: <span className='py-2   font-bold'> {invoice_data?.invoice_number}</span></h1> 
   <h1 className='text-black text-base '>Invoice Date: <span className='py-2  font-bold text-black '> {formated_date(invoice_data?.created_at)}</span></h1> 
   <h1 className='text-black text-base '>Status: <span className={`py-1 upBtn px-2 rounded-lg   font-bold ${invoice_data?.status === "paid" ? 'text-white bg-green-500' : 'text-white bg-red-500'}`}>
   {(invoice_data?.status.charAt(0).toUpperCase() + invoice_data?.status.slice(1).toUpperCase())}
    </span></h1>
    <h1 className='text-black text-base '>Due Date: <span className='py-2  font-bold text-red '> {formated_date(invoice_data?.due_date)}</span></h1> 
  </div>
</div>



          <div className='w-full mt-4'>
            <div className='w-full mx-auto border border-gray-300 rounded-lg  overflow-hidden text-black'>
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr className=' text-black font-medium upBtn'>
                    <th className="bg-[#F6F6F6] px-6 py-3 text-left text-xs uppercase tracking-wider border-r-1">ORDER ID</th>
                    <th className="bg-[#ECECEC] px-6 py-3 text-left text-xs uppercase tracking-wider border-r-1">SERVICE</th>
                    <th className="bg-[#F6F6F6] px-6 py-3 text-left text-xs uppercase tracking-wider border-r-1">RATE/PRICE{" "}{invoice_data?.user_details?.currency}</th>
                    <th className="bg-[#ECECEC] px-6 py-3 text-left text-xs uppercase tracking-wider border-r-1">QUANTITY</th>
                    <th className="bg-[#F6F6F6] px-6 py-3 text-left text-xs uppercase tracking-wider border-r-1">SUB TOTAL{" "}{invoice_data?.user_details?.currency}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                  {invoice_data?.invoice_items?.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-1">{invoice_data?.order_number}</td>
                      {/* <td className="px-6 py-4 text-sm text-gray-900 border-r-1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}></td> */}
                      <td className="px-6 py-4 text-sm text-gray-900 border-r-1">
      {item.description.split('\r\n').map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} className='text-sm font-medium py-1'></div>
      ))}
    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r-1">{invoice_data?.user_details?.currency}{item.rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r-1">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r-1">{invoice_data?.user_details?.currency}{item.rate * item.quantity}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>

          <div className=' flex justify-end mt-2 mb-10'>


            <table className='w-[300px] table-auto  border border-gray-300 rounded-lg overflow-hidden text-black '>
              <tbody className=''>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium '>Sub Total</td>
                  <td className='px-4 py-2  '> {invoice_data?.user_details?.currency}{" "}{subtotal}</td>
                </tr>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium '>Tax</td>
                  <td className='px-4 py-2  '> {invoice_data?.user_details?.currency}{" "}0.00</td>
                </tr>
                <tr className='bg-white'>
                  <td className='px-4 py-2 font-medium '>Discount</td>
                  <td className='px-4 py-2 '>
                    {invoice_data?.user_details?.currency}{" "}
                    {(getDiscount(invoice_data?.discount_type, invoice_data?.discount, subtotal))}
                  </td>
                </tr>
                <tr className='bg-[#4e2fda21] text-[#344C92] upBtn '>
                  {invoice_data?.status === "paid" ?
                    <td className='px-4 py-2 font-medium '>Total</td> :
                    <td className='px-4 py-2 font-medium '>Total Due</td>}
                  <td className='px-4 py-2 font-semibold '>
                    {invoice_data?.user_details?.currency}{" "}
                    {(
                      subtotal - getDiscount(invoice_data?.discount_type, invoice_data?.discount, subtotal)
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

<div className=' flex flex-col gap-2'>
{payMet.map((method) => (
          <div key={method.id} className="flex justify-start items-center bg-[#EFEFEF]  px-10 p-4 rounded-lg">
<h1 className='flex items-center text-lg text-black font-medium'>{method.title}: <span className='text-[#344C92]'>{method.details}</span> </h1>
            </div>
        ))}
</div>
        </div>
</div>


<div className="container mx-auto md:my-10 md:p-10 bg-white rounded-lg shadow-lg"  >
        <div className='flex flex-col gap-4 my-4 mx-4'>
          <h1 className='text-2xl text-start text-[38px] text-black font-semibold  '>Other Invoices</h1>
          <div className=' flex w-full gap-2 '>
            <Table
              columns={columns}
              dataSource={all_invoice_data}
              rowKey="uid"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
              className={`w-full `}
            />
          </div>
          <div  className="flex justify-start items-center bg-[#EFEFEF]  px-10 p-4 rounded-lg gap-2" >
            <h1 className='text-black font-medium'>Unpaid Sub Total</h1>
            <span className='bg-[#4e2fda21] text-[#344C92] px-3 py-1 rounded-lg font-medium'>{invoice_data?.user_details?.currency} {totalUpAmt}</span>
            <h1 className='text-black font-medium'>Discount</h1>
            <span className='bg-[#4e2fda21] text-[#344C92] px-3 py-1 rounded-lg font-medium'>{invoice_data?.user_details?.currency}{" "}{dis}</span>
            <h1 className='text-black font-medium'>Unpaid Total Due</h1>
            <span className='bg-[#4e2fda21] text-[#344C92] px-3 py-1 rounded-lg font-medium'>{invoice_data?.user_details?.currency} {(totalUpAmt - dis).toFixed(2) }</span>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="foo_ter">
        <p>Thank you for choosing Vefogix
        </p>
      </footer>

      <div className={`cursor ${styles.cursor}`} id="cursor"></div>
            <div className={`cursor2 ${styles.cursor2}`} id="cursor2"></div>
            <div className={`cursor3 ${styles.cursor3}`} id="cursor3"></div> 
    </div>
  )
}

export default Page

