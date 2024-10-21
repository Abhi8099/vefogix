"use client"
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';

const Page = () => {

  const [payMet, setPayMet] = useState<any>();

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
  return (
<>
<DefaultLayout>
    <div className='h-full w-full flex items-center justify-center'>

    <div className='rounded-lg shadow-md overflow-hidden text-black bg-white mx-4 w-full '>
          <Tabs defaultActiveKey="1" centered>
            {payMet?.map((method:any) => (
              <Tabs.TabPane
                tab={method.title}
                key={method.id}
              >
                <h3 className='text-base font-medium text-center pb-4'>{method.details}</h3>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>

    </div>
</DefaultLayout>
</>
  )
}

export default Page
