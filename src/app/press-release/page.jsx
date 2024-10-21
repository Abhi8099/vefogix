import React from 'react'
import HeaderComp from "@/components/HeaderComp";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FooterFour } from '@/components/Footer';
import Image from 'next/image';
import Page from '@/components/Contactus';
import Link from 'next/link';

const Pricing = () => {
  return (
    <>
<HeaderComp/>


<div className='pt-20 flex flex-col gap-10'>
<h3 className='text-primary font-bold text-4xl text-center' >
    Choose a plan when you&apos;re ready
    </h3>

<div className='flex flex-col gap-10 items-center justify-center'>
    <div className='flex gap-10'>
    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group  hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>APnews </h3>
<h3 className='text-4xl font-extrabold'>$68.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Your article will be featured on APnews , APnews  press release giving your website a potential boost in its SERP ranking and driving a significant amount of traffic to it.</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />APnews <Image src={"https://dashboard.kingnewswire.com/uploads/packages/1685784843647b090bb1d74.png"} alt='' width={100} height={100}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $68.00</option>
    <option value="">5 press release for $332.00</option>
    <option value="">10 press release for $646.00</option>
    <option value="">20 press release for $1224.00</option>
    <option value="">100 press release for $5870.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>
    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5  pb-4'>
<h3 className='text-xl font-semibold '>Yahoo Press Release + 300 Distribution</h3>
<h3 className='text-4xl font-extrabold'>$190.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Your article will be featured on APnews , APnews  press release giving your website a potential boost in its SERP ranking and driving a significant amount of traffic to it.</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-2xl text-green-800 ' />Yahoo Press Release + 300 Distribution <Image src={"https://dashboard.kingnewswire.com/uploads/packages/1685787982647b154e1de0a.png"} alt='' width={70} height={70}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4' ><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $190.00</option>
    <option value="">5 press release for $931.00</option>
    <option value="">10 press release for $1805.00</option>
    <option value="">100 press release for $16150.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>
    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>Yahoo + Business insider + 400 outlets</h3>
<h3 className='text-4xl font-extrabold'>$280.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Your article will be featured on APnews , APnews  press release giving your website a potential boost in its SERP ranking and driving a significant amount of traffic to it.</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-2xl text-green-800 ' />Yahoo + Business insider + 400 outlets <Image src={"https://dashboard.kingnewswire.com/uploads/packages/1685787982647b154e1de0a.png"} alt='' width={70} height={70}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $280.00</option>
    <option value="">5 press release for $1372.00</option>
    <option value="">10 press release for $2660.00</option>
    <option value="">20 press release for $5040.00</option>
    <option value="">100 press release for $23800.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>


    </div>
    <div className='flex gap-10'>
    
    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>APnews + 400 Outlets</h3>
<h3 className='text-4xl font-extrabold'>$100.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Your article will be featured on APnews , APnews  press release giving your website a potential boost in its SERP ranking and driving a significant amount of traffic to it.</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />APnews + 400 Outlets <Image src={"https://dashboard.kingnewswire.com/uploads/packages/1685784843647b090bb1d74.png"} alt='' width={100} height={100}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $100.00</option>
    <option value="">5 press release for $490.00</option>
    <option value="">10 press release for $950.00</option>
    <option value="">20 press release for $1800.00</option>
    <option value="">100 press release for $8500.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>Silver</h3>
<h3 className='text-4xl font-extrabold'>$20.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Guaranteed News Distribution with Media Coverage</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Google Inclusion <Image src={"/images/brand/brand-09.svg"} alt='' width={24} height={24}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />150 Guaranteed Placements</h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' />Google News Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164265861361e8fb351ada7.png"} alt='' width={30} height={30}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Yahoo Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241834761e550ab324af.png"} alt='' width={50} height={50}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Bing Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241889961e552d3e944f.png"} alt='' width={50} height={50}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Financial Feeds</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Online Newspaper</h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' />Market Watch  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164265831661e8fa0cd5db3.png"} alt='' width={100} height={100}/></h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' />Digital Journal <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241917061e553e20b64e.png"} alt='' width={130} height={130}/></h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' />Fox Media Outlets<Image src={"https://mma.prnewswire.com/media/2378299/Fox_Corporation_Logo.jpg?w=200"} alt='' width={40} height={40}/></h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' /> NBC Media Outlets<Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/567px-NBC_logo.svg.png"} alt='' width={30} height={30}/></h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' /> CBS Media Outlets<Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241943061e554e651d33.jpg"} alt='' width={70} height={70}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' /> Anchor Text Links within PR-10</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' /> 800 word count limit</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' /> Images-5</h3>
</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $20.00</option>
    <option value="">5 press release for $98.00</option>
    <option value="">10 press release for $190.00</option>
    <option value="">20 press release for $360.00</option>
    <option value="">100 press release for $1700.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>Gold</h3>
<h3 className='text-4xl font-extrabold'>$50.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6 '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Guaranteed News Distribution with Media Coverage</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Google Inclusion <Image src={"/images/brand/brand-09.svg"} alt='' width={24} height={24}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />150 Guaranteed Placements</h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' />Google News Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164265861361e8fb351ada7.png"} alt='' width={30} height={30}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Yahoo Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241834761e550ab324af.png"} alt='' width={50} height={50}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Bing Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241889961e552d3e944f.png"} alt='' width={50} height={50}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Financial Feeds</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Online Newspaper</h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' />Market Watch  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164265831661e8fa0cd5db3.png"} alt='' width={100} height={100}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800' />Digital Journal <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241917061e553e20b64e.png"} alt='' width={130} height={130}/></h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' />Fox Media Outlets<Image src={"https://mma.prnewswire.com/media/2378299/Fox_Corporation_Logo.jpg?w=200"} alt='' width={40} height={40}/></h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' /> NBC Media Outlets<Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/567px-NBC_logo.svg.png"} alt='' width={30} height={30}/></h3>
<h3 className='flex gap-2 items-center '><MdCancel className='text-2xl text-red-600' /> CBS Media Outlets<Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241943061e554e651d33.jpg"} alt='' width={70} height={70}/></h3>
<h3 className='flex gap-2 '><FaCheckCircle className='text-xl text-green-800 ' /> Anchor Text Links within PR-10</h3>
<h3 className='flex gap-2 '><FaCheckCircle className='text-xl text-green-800 ' /> 800 word count limit</h3>
<h3 className='flex gap-2 '><FaCheckCircle className='text-xl text-green-800 ' /> Images-5</h3>
</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $50.00</option>
    <option value="">5 press release for $245.00</option>
    <option value="">10 press release for $475.00</option>
    <option value="">20 press release for $900.00</option>
    <option value="">100 press release for $4250.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    </div>

    <div className='flex gap-10'>
    


    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>Diamond</h3>
<h3 className='text-4xl font-extrabold'>$100.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Guaranteed News Distribution with Media Coverage</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />450 Guaranteed Placements</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Benzinga <Image src={"https://dashboard.kingnewswire.com/uploads/packages/170784591665cba91c8f802.png"} alt='' width={70} height={70}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800' />Digital Journal <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241917061e553e20b64e.png"} alt='' width={130} height={130}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800' />Fox Media Outlets<Image src={"https://mma.prnewswire.com/media/2378299/Fox_Corporation_Logo.jpg?w=200"} alt='' width={40} height={40}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' /> TV Station Media Sites
</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Google Inclusion <Image src={"/images/brand/brand-09.svg"} alt='' width={24} height={24}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Yahoo Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241834761e550ab324af.png"} alt='' width={50} height={50}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Bing Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241889961e552d3e944f.png"} alt='' width={50} height={50}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800' />Google News Inclusion  <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164265861361e8fb351ada7.png"} alt='' width={30} height={30}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' /> Radio & Broadcast Media Stations

</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' /> Anchor Text Links within PR-5

</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' /> TV Station Media Sites
</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Financial Feeds</h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800' /> NCN Central 
<Image src={"https://dashboard.kingnewswire.com/uploads/packages/1645310717621172fd445a1.png"} alt='' width={70} height={70}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Online Newspaper</h3>

<h3 className='flex gap-2 '><FaCheckCircle className='text-xl text-green-800 ' /> Anchor Text Links within PR-10</h3>
<h3 className='flex gap-2 '><FaCheckCircle className='text-xl text-green-800 ' /> 1500 word count limit</h3>
</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $100.00</option>
    <option value="">5 press release for $490.00</option>
    <option value="">10 press release for $950.00</option>
    <option value="">20 press release for $1800.00</option>
    <option value="">100 press release for $8500.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>Digital Journal Press release</h3>
<h3 className='text-4xl font-extrabold'>$25.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Publish your article on Digital Journal. Digital journal is a Google News website that it cannot only boost your Website SERP rank</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Digital Journal <Image src={"https://dashboard.kingnewswire.com/uploads/packages/164241917061e553e20b64e.png"} alt='' width={130} height={130}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $25.00</option>

</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>US Times Now</h3>
<h3 className='text-4xl font-extrabold'>$30.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Publish your article on US Times Now. It is a Premium Google News website that it cannot only boost your website SERP rank, it also provides lots of traffic to your website</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />US Times Now <Image src={"https://dashboard.kingnewswire.com/uploads/packages/165508649962a69da371a34.PNG"} alt='' width={130} height={130}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $30.00</option>

</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>



    </div>
    <div className='flex gap-10'>
    


    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>Benzinga Press Release</h3>
<h3 className='text-4xl font-extrabold'>$30.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Your article will be featured on Benzinga, Bezninga press release giving your website a potential boost in its SERP ranking and driving a significant amount of traffic to it.</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Benzinga <Image src={"https://dashboard.kingnewswire.com/uploads/packages/170784591665cba91c8f802.png"} alt='' width={70} height={70}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $30.00</option>

</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>Street Insider Press Release</h3>
<h3 className='text-4xl font-extrabold'>$40.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Street Insider is a top-tier financial website approved by Google News. Press releases on Street Insider can elevate your website&apos;s ranking and drive significant traffic.</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Street Insider <Image src={"https://dashboard.kingnewswire.com/uploads/packages/1715188680663bb3c867a0e.png"} alt='' width={130} height={130}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $25.00</option>

</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group  hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>ANI News</h3>
<h3 className='text-4xl font-extrabold'>$68.00</h3>
<h3 className='text-xl font-semibold '>1 Press Release</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Your article will be featured on ANI news , ANI news  press release giving your website a potential boost in its SERP ranking and driving a significant amount of traffic to it.</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />ANI news <Image src={"https://fullforms.com/images/image/ANI_5911.jpg"} alt='' width={30} height={30}/></h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $68.00</option>
    <option value="">5 press release for $332.00</option>
    <option value="">10 press release for $646.00</option>
    <option value="">20 press release for $1224.00</option>
    <option value="">100 press release for $5780.00</option>
</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>



    </div>


    <div className='flex gap-10'>
    
    <div className='h-[658px] w-[377px] border-1 border-gray-5 smooth bg-white hover:bg-primary group hover:text-white text-black rounded-lg flex flex-col items-center gap-2 justify-center'>
<div className='flex flex-col items-center gap-2 justify-center border-b-1 w-full border-gray-5 pb-4'>
<h3 className='text-xl font-semibold '>200+ Media Platforms</h3>
<h3 className='text-4xl font-extrabold'>$120.00</h3>
<h3 className='text-base text-center  font-semibold '>Get Noticed by Millions! Leverage 200+ Digital Press Releases at an Unbeatable Price including:</h3>
</div>

<div className='h-1/2 w-full overflow-y-auto flex flex-col gap-2 font-medium text-lg px-6   '>
<h3 className='text-center  text-blue-500 group-hover:text-blue-100 '>Achieve High Google Visibility with an Article on Top Sites:</h3>

<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Daily Hunt <Image src={"https://img1.wsimg.com/isteam/ip/ff64b9cf-4395-4f49-b925-84582cf7b90f/file.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:365,h:365,cg:true"} alt='' width={40} height={40}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Flipboard <Image src={"https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/131_Flipboard_logo_logos-512.png"} alt='' width={20} height={20}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />BizzSight <Image src={"https://bizzsight.com/wp-content/uploads/2023/06/bizzsight-.png"} alt='' width={70} height={70}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Uni India <Image src={"https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/United_News_of_India_Logo.svg/220px-United_News_of_India_Logo.svg.png"} alt='' width={30} height={30}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Prime News Tv <Image src={"https://static.wikia.nocookie.net/logopedia/images/d/d4/Prime-news.png/revision/latest?cb=20230126193306"} alt='' width={40} height={40}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />The Nation Times </h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />National Insight <Image src={"https://nationalinsightnews.com/wp-content/uploads/2020/08/NI_logo.png"} alt='' width={70} height={70}/></h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />And 193+ Media Sites </h3>
<h3 className='flex gap-2 items-center '><FaCheckCircle className='text-xl text-green-800 ' />Total Reach: 200+ Premium Platforms </h3>

</div>
<div className='flex flex-col items-center gap-4 justify-center w-full mt-1'>
<h3 className='text-xl font-semibold '>For Demo PR Report: <button className='underline underline-offset-4'><a href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"> Click here</a></button></h3>
<select name="" id="" className='rounded-lg py-2 text-black border-gray-5  border px-2 outline-none w-3/4 '>
    <option value="">1 press release for $120.00</option>

</select>
<button className='text-white bg-primary px-6 py-2 rounded-lg hover:scale-110 smooth active:scale-95 group-hover:bg-white group-hover:text-primary' ><Link href={'#contact'}>Buy Now</Link></button>
</div>
    </div>

    </div>


</div>
<div id='contact'>
<Page />
</div>
</div>

<FooterFour/>
    </>
  )
}

export default Pricing