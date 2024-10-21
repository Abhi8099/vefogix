
"use client"
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import React, { useEffect } from 'react'
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { BiLoaderCircle } from "react-icons/bi";
import { TbListCheck } from "react-icons/tb";
import { BsExclamationDiamond } from "react-icons/bs";
import BoxReveal from "@/components/magicui/box-reveal";
import { gsap } from 'gsap';
import { useWebsites } from '@/helpers/WebsiteContext';
import { usePathname } from 'next/navigation';

const Page = () => {

  const { buyerTasks, buyer_Tasks } = useWebsites();
  const sumOfRejectedTask = buyerTasks.reduce((sum:any, buyerTasks:any) => {
      return buyerTasks.task_status.title === "Rejected" ? sum + 1 : sum;
  }, 0);
  const sumOfCompletedTask = buyerTasks.reduce((sum:any, buyerTasks:any) => {
      return buyerTasks.task_status.title === "Completed" ? sum + 1 : sum;
  }, 0);
  const sumOfInProgressTask = buyerTasks.reduce((sum:any, buyerTasks:any) => {
      return buyerTasks.task_status.title === "In Progress" ? sum + 1 : sum;
  }, 0);
  const sumOfPendingApprovalTask = buyerTasks.reduce((sum:any, buyerTasks:any) => {
      return buyerTasks.task_status.title === "Pending Approval" ? sum + 1 : sum;
  }, 0);
  const sumOfAwaitingTask = buyerTasks.reduce((sum:any, buyerTasks:any) => {
      return buyerTasks.task_status.title === "Awaiting" ? sum + 1 : sum;
  }, 0);
  const sumOfNotStartedTask = buyerTasks.reduce((sum:any, buyerTasks:any) => {
      return buyerTasks.task_status.title === "Not Started" ? sum + 1 : sum;
  }, 0);
  const sumOfImprovementTask = buyerTasks.reduce((sum:any, buyerTasks:any) => {
      return buyerTasks.task_status.title === "Improvement" ? sum + 1 : sum;
  }, 0);

const pathName = usePathname()

  useEffect(() => {
    if (pathName  === "/buyer-dashboard/") {
localStorage.setItem("selectedMenu",'"dashboard"')
    }
    Aos.init({});
    buyer_Tasks();
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
  return (
<>
<DefaultLayout>
<div className='flex flex-col gap-4' >

    <div className='h-full w-full md:flex-row items-center justify-center gap-4 flex flex-col'>
<div className='bg-white h-[180px] w-[350px] md:w-[400px] rounded-xl shadow-xl flex flex-col gap-2 p-4   dark:bg-dark dark:text-white  projectElements '>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>{sumOfNotStartedTask}</h3>
  <MdOutlineSpeakerNotesOff className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>Not Started</h3>
  <h3>Tasks waing for acceptances or rejections, you will receive netfications once an action is taken</h3>
</div>
</div>

<div className='bg-white h-[180px] w-[350px] md:w-[400px] rounded-xl shadow-xl flex flex-col gap-2 p-4 dark:bg-dark dark:text-white projectElements'>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>{sumOfInProgressTask}</h3>
  <BiLoaderCircle className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>In Progress</h3>
  <h3>Tasks in progress, you will receive notifications once they are sompleted</h3>
</div>

   </div>
<div className='bg-white h-[180px] w-[350px] md:w-[400px] rounded-xl shadow-xl flex flex-col gap-2 p-4 dark:bg-dark dark:text-white projectElements'>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>{sumOfPendingApprovalTask}</h3>
  <TbListCheck className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>Pending Approval</h3>
  <h3>Tasks waiting for your approval, if you do naming they will be marked as complete after 03 days</h3>
</div>

   </div>
<div className='bg-white h-[180px] w-[350px] md:w-[400px] rounded-xl shadow-xl flex flex-col gap-2 p-4 dark:bg-dark dark:text-white projectElements'>

<div className='flex justify-between'>
  <h3 className='text-3xl font-medium'>{sumOfImprovementTask}</h3>
  <BsExclamationDiamond className='text-3xl' />
</div>

<div className='flex items-start flex-col'>
  <h3 className='font-semibold'>In Improvement</h3>
  <h3>Tasks you have sens for improvement, you will get them as soon as they are completed.</h3>
</div>

   </div>
    </div>

<div className='flex gap-4 md:flex-row flex-col items-center md:items-start'>
<div className='flex-1 bg-newcolor h-[350px] rounded-xl flex flex-col gap-4 dark:bg-dark dark:text-white  transition-all ease-in-out duration-300 md:py-0 py-4 w-[350px] md:w-full '>
<div className='h-1/3 flex items-center justify-center '>
<BoxReveal boxColor={"#5046e6"} duration={0.5}>
<h3 className='text-white text-xl text-center font-medium px-4'>Guest Posting & Link Insertions Services<br/> Starting From $4.99 Per Placement</h3></BoxReveal>
</div>
<div className='h-2/3 flex items-center justify-center flex-col gap-2 px-4'>
<span className='text-white text-base text-center'>✔ Reseller-Friendly  ✔ 100% Satisfaction Guaranteed</span>
<span className='text-white text-base text-center'>✔ Genuine Websites With Traffic </span>
<span className='text-white text-base text-center'>✔ Only Pay If You Are Satisfied With The Results </span> 
<span className='text-white text-base text-center'>✔ White hat link building ✔ Track Within Dashboard </span>
<span className='text-white text-base text-center'>✔ Unlimited Revisions</span>
</div>
</div>

<div className='flex-1 bg-newcolor h-[350px] rounded-xl flex flex-col gap-4 dark:bg-dark dark:text-white   transition-all ease-in-out duration-300 md:py-0 py-4 w-[350px] md:w-full'>
<div className='h-1/3 flex items-center justify-center '>
<BoxReveal boxColor={"#5046e6"} duration={0.5}>

<h3 className='text-white text-xl text-center font-medium px-4'>Professional Content Writing Services<br/> From $15.00 Per Blog Post</h3></BoxReveal>
</div>
<div className='h-2/3 flex items-center justify-center flex-col gap-2 px-4'>
<span className='text-white text-base text-center'>✔ Fast Delivery  ✔ 100% Satisfaction Guaranteed ✔ SEO Friendly</span>
<span className='text-white text-base text-center'>✔ Track Within Dashboard</span>
<span className='text-white text-base text-center'>✔ Only Pay If You Are Satisfied With The Results ✔ Unlimited Revisions </span>
<span className='text-white text-base text-center'>✔ High-Quality Copy ✔ Checked by Grammarly </span>
<span className='text-white text-base text-center'>✔ Checked by Copyscape</span>
</div>

</div>

</div> 

    </div>
</DefaultLayout>
</>
  )
}

export default Page
