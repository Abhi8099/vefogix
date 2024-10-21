
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import React from 'react'
import { AnimatedTooltip } from "../../components/ui/animated-tooltip";
import Faq from "../../components/Faq";
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

const Page = () => {
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }
  ];
  return (
<>
<DefaultLayout>
    <div className='h-[80vh] w-full flex items-center  flex-col gap-4 dark:text-blue-500'>
    <h3 className="text-[#876DF2] font-medium text-[25px] selection:bg-pink-500 dark:text-blue-500">FAQ</h3>
    <h3 className="text-[35px] text-black font-semibold leading-tight selection:bg-pink-500 dark:text-blue-500 hidden md:block">Most Frequently Asked Questions</h3>
<div className='bg-white rounded-xl p-4 w-full dark:bg-dark-6'>
<Faq/>


</div>

    </div>
</DefaultLayout>
</>
  )
}

export default Page
