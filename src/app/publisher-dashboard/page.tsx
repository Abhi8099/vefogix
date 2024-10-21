"use client"
import DefaultLayout from '@/components/PublisherLayouts/DefaultLaout'
import React, { useEffect, useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { BsExclamationDiamond } from 'react-icons/bs'
import { MdOutlineSpeakerNotesOff } from 'react-icons/md'
import { TbListCheck } from 'react-icons/tb'
import { BsListTask } from "react-icons/bs";
import Aos from "aos";
import { HiOutlineBanknotes } from "react-icons/hi2";
import "aos/dist/aos.css";
import { GrMoney } from "react-icons/gr";
import { useWebsites } from '@/helpers/WebsiteContext'
import axios from 'axios'
import { BASE_URL } from '@/utils/api'
import Cookies from 'js-cookie';
import { gsap } from 'gsap';


const Page = () => {
  useEffect(() => {
    Aos.init({});
    publisher_Tasks();
    gsap.fromTo(
      ".projectElements",
      { opacity: 0, x: -200 },
      {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.1
      }
  );
}, []);



const { publisherTasks, publisher_Tasks } = useWebsites();
const sumOfNotStartedTask = publisherTasks.reduce((sum:any, publisherTasks:any) => {
    return publisherTasks.task_status.title === "Not Started" ? sum + 1 : sum;
}, 0);
const sumOfImprovementTask = publisherTasks.reduce((sum:any, publisherTasks:any) => {
    return publisherTasks.task_status.title === "Improvement" ? sum + 1 : sum;
}, 0);


const[data, setData] = useState<any>();
useEffect(() => {
  const fetchUsers = async () => {
      const token = Cookies.get("login_access_token");
      if (!token) {
          alert('You need to log in first.');
          return;
      }
      try {
          const response = await axios.get(`${BASE_URL}profile/`, {
              headers: {
                  'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",

              },
          });
          const data = response.data;
          // console.log(data);
          setData(data);
      } catch (error:any) {
          console.error('Error fetching projects:', error.response);
      }
  };
  fetchUsers();
}, []);
  return (
<>
<DefaultLayout>
<div className='h-full w-full flex items-center justify-center gap-4 flex-col md:flex-row'>
<div className='bg-white h-[180px] md:w-[400px] w-[350px] rounded-xl shadow-xl flex flex-col gap-2 p-4 dark:bg-dark dark:text-white projectElements'>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>{sumOfNotStartedTask}</h3>
  <BsListTask className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>Open Tasks</h3>
  <h3>Tasks waiting for your acceptance or rejection. Please accept or reject it within 3 days</h3>
</div>

   </div>
<div className='bg-white h-[180px] md:w-[400px] w-[350px] rounded-xl shadow-xl flex flex-col gap-2 p-4 dark:bg-dark dark:text-white  projectElements'>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>{sumOfImprovementTask}</h3>
  <TbListCheck className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>For Improvement</h3>
  <h3>Tasks send back to be improved by you. Please revisit it as soon as possible</h3>
</div>

   </div>
<div className='bg-white h-[180px] md:w-[400px] w-[350px] rounded-xl shadow-xl flex flex-col gap-2 p-4 dark:bg-dark dark:text-white  projectElements'>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>$ {data && data.publisher_wallet.reserved_balance}</h3>
  <HiOutlineBanknotes className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>Reserved</h3>
  <h3>The Total amount that have been reserved for incompleted tasks</h3>
</div>

   </div>
<div className='bg-white h-[180px] md:w-[400px] w-[350px] rounded-xl shadow-xl flex flex-col gap-2 p-4 dark:bg-dark dark:text-white  projectElements'>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>$ {data && data.publisher_wallet.remain_balance}</h3>
  <GrMoney className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>Current Balance</h3>
  <h3>The Total amount you have armed for completed tasks.</h3>
</div>

   </div>
    </div>
</DefaultLayout>
</>
  )
}

export default Page
