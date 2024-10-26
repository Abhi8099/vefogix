import { Metadata } from "next";
import React, { useEffect } from "react";
import Homie from "@/components/Home";
import HeaderComp from "@/components/HeaderComp";
import Page from "@/components/Contactus";
import { FooterFour } from "@/components/Footer";
// import { usePathname } from 'next/navigation';
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import { MarqueeDemo } from '../components/marque'
import AnimatedText from '../components/animatedtext'
import SimpleSlider from '../components/slider'
import FadeInSection from '../components/FadeInSection';
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import Faq from "../components/Faq";
import CardSlider from "../components/CardSlider";
import Reviews from "../components/Reviews";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import Head from "next/head";
import NumbersCard from "@/components/NumbersCard";
import Script from "next/script";
import { fetchMeta } from "./action";




// export const metadata: Metadata = {
//   title: "Premium Guest Posting Services for SEO Success",
//   description: "Elevate your search engine rankings with our top-tier guest posting services. Quality placements for enhanced visibility and traffic.",
//   icons: { icon: "/images/favicon.ico", apple: "/images/favicon.ico" },
// };


export default function Home() {
  // const pathname = usePathname();
  // const currentUrl = `https://www.vefogix.com${pathname}`;


  const people = [
    {
      id: 1,
      name: "Oliver Dawson",
      designation: "Content Strategist",
      image:
        "/images/user/user-01.png",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Blog Editor-in-Chief",
      image:
        "/images/user/user-02.png",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "SEO Specialist",
      image:
        "/images/user/user-03.png",
    },
    {
      id: 4,
      name: "Ethan Harrison",
      designation: "Blog Post Writer",
      image:
        "/images/user/user-04.png",
    },
    {
      id: 5,
      name: "Samuel Brooks",
      designation: "Social Media Manager",
      image:
        "/images/user/user-05.png",
    },
  ];


  return (

    <>
    <Script
        id="crisp"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
window.$crisp=[];window.CRISP_WEBSITE_ID="eda735e2-38d7-4dd5-9523-f20a0084f3bc";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
          `,
        }}
      />
      {/* <Head>
      <link rel="canonical" href={currentUrl} />
      </Head> */}


      <div className="bg-img-home flex flex-col">

        <HeaderComp />
 
        {/* Your DA40+ */}
        <FadeInSection>

        <div className='xl:py-[100px] lg:py-[80px] md:py-[60px] sm:py-[40px] py-[100px] w-full 2xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px] flex  ' id="home">

          <div className='flex-1 justify-center flex flex-col  gap-6 md:items-start items-center'>
            <h3 className="h-[30px] rounded-[45px] flex items-center justify-center text-sm md:text-base font-medium text-black ">Top #1 SEO & Guest Post Agency</h3>

              <AnimatedText />

            <h3 className="md:text-start text-center text-base md:text-lg text-black  leading-[1.30] ">Get recognised for the unmatchable quality of backlinks and guest posts. Fix your buffering SEO with our team of experts. At Vefogix, you invest in trust, we build quality!
            </h3>
            <h3 className="md:text-start font-bold text-center text-lg md:text-[24px] text-black  leading-[1.30] ">Boost Your Rankings And Drive Real Traffic.</h3>
            <div className='flex md:flex-row flex-col gap-3 items-center'>
              <Link href="/buyer-dashboard" className="bg-primary py-1 md:py-3 rounded-lg px-2 xl:px-8 text-white text-lg flex gap-2 items-center hover:text-primary hover:bg-transparent font-medium smooth hover:border-2 hover:border-primary border-2 border-primary "><FiLogIn className="text-xl" />Sign Up Now</Link>
              <Link href="/signup" className="bg-transparent hover:bg-primary hover:text-white border-primary border-2 py-1 md:py-3 rounded-lg px-2 xl:px-8 text-primary text-lg flex gap-2 font-medium smooth ">View Pricing</Link>
              <h3 className="text-sm font-medium leading-tight text-black md:text-start text-center ">Quality Unveiling <br />at $4.99 </h3>
            </div>
          </div>

          <div className='flex-1 items-center justify-center  hidden md:flex'>
            <Image src={"/images/new/Group 1000003839.svg"} alt="" height={500} width={500} />
          </div>

        </div>        </FadeInSection>
        {/* brands */}
        <div className='w-full 2xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px] flex md:flex-row flex-col md:gap-0 gap-4'>
          <div className="flex-1 flex flex-col">
            <h3 className="text-primary text-lg font-semibold md:text-start text-center ">We Collaborate with</h3>
            <div className="flex gap-3 flex-wrap items-center justify-center md:items-start md:justify-start">
              <Image src={"/images/new/semrush.svg"} alt=" " width={162.1} height={100} className="h-[21.6px] " />
              <Image src={"/images/new/majestic.svg"} alt=" " width={26.93} height={100} className="h-[21.6px] " />
              <Image src={"/images/new/bing.svg"} alt=" " width={53.47} height={100} className="h-[21.6px] " />
              <Image src={"/images/new/yahoo.svg"} alt=" " width={77.87} height={100} className="h-[21.6px] " />
              <Image src={"/images/new/aherfs.svg"} alt=" " width={83.95} height={100} className="h-[21.6px] " />

            </div>
          </div>
          <div className="flex-1 flex  md:justify-end justify-center ">
            <div className='flex gap-7 items-center justify-center'>
              <div className="flex ">
                <AnimatedTooltip items={people} />
              </div>
              <h3 className='flex items-center justify-center text-sm font-medium leading-tight text-black'>Trusted by 6K+ <br /> customers</h3>
            </div>
          </div>

        </div>

        {/* table */}
        <div className='flex flex-col items-center justify-center mt-[100px] w-full 2xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px]' id="websites">
          <h3 className=" text-center text-[20px] lg:text-[24px] xl:text-[48px] text-black font-extrabold leading-tight ">Explore Our Pantry For <br /> <span className="text-primary">Premium Backlinks </span> And <span className="text-primary">Packages</span></h3>
          <h3 className=" text-center text-[16px] text-black my-[29px] leading-tight">We Provide Excellent Guest Posting Service Along With Quality Backlinks, Regardless Of Your Chosen Package. </h3>
          <Homie />
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
          <Link href="/buyer-dashboard" className=" flex items-center justify-center w-[266px] font-medium rounded-full text-primary border-1 border-primary py-3 px-4 hover:bg-primary hover:text-white smooth">Go to Dashboard</Link>
        </div>

<NumbersCard/>

        {/* hover cards */}
        <FadeInSection>
          <div className='flex flex-col gap-4 items-center justify-center w-full 2xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px]' id="packages">
            <h2 className="text-center text-[20px] lg:text-[24px] xl:text-[48px] text-black font-extrabold md:leading-[3.75rem]">
              Choose Us For A Reason!
            </h2>
            <h2 className="text-center text-[14px] lg:text-[16px]  text-black font-medium leading-tight ">
              From Driving Traffic To Building Goodwill, We Can Be Your Partner-In-Growth.
            </h2>

            <div className="md:mt-10 lg:mt-[60px] flex flex-wrap justify-center  gap-5  z-10 2xl:flex-nowrap flex-col">
              <div className='flex flex-1 gap-8 flex-wrap w-full items-center justify-center'>
                <div className="flex flex-col md:w-full lg:w-103 text-black gap-2 hover:bg-[#FAF9F6] group md:px-10 px-4 py-6 rounded-xl items-center justify-center md:items-start md:justify-start">
                  <Image src={"/images/new/Group 1000003842.svg"} alt=" " height={80} width={80} />
                  <h3 className="font-semibold text-2xl group-hover:text-primary">High-Quality Content </h3>
                  <h4 className="font-medium text-lg text-center md:text-start">Our passionate team of writers and marketers ensures that every word penned down aligns with your brand&apos;s voice and objectives, enhancing your online presence and authority.</h4>
                </div>
                <div className="flex flex-col md:w-full lg:w-103 text-black gap-2 hover:bg-[#FAF9F6] group md:px-10 px-4 py-6 rounded-xl items-center justify-center md:items-start md:justify-start ">
                  <Image src={"/images/new/Group 1000003843.svg"} alt=" " height={80} width={80} />
                  <h3 className="font-semibold text-2xl text-center sm:text-start group-hover:text-primary">White-Hat Backlink Strategies</h3>
                  <h4 className="font-medium text-lg text-center md:text-start">As a white-label link-building agency, we passionately knit white-hat SEO practices for your business, ensuring that all backlinks we generate are ethical and comply with search engine policies. </h4>
                </div>
                <div className="flex flex-col md:w-full lg:w-103 text-black gap-2 hover:bg-[#FAF9F6] group md:px-10 px-4 py-6 rounded-xl items-center justify-center md:items-start md:justify-start ">
                  <Image src={"/images/new/Group 1000003844.svg"} alt=" " height={80} width={80} />
                  <h3 className="font-semibold text-2xl group-hover:text-primary">Private Label Services</h3>
                  <h4 className="font-medium text-lg text-center md:text-start">We provide private label options for agencies or businesses seeking to offer guest posting services under their brand via our expertise and reputed resources. This means that now transforming yourself as a Guest Post Service Provider, is not a tough code to crack.</h4>
                </div>

                <div className="flex flex-col md:w-full lg:w-103 text-black gap-2 hover:bg-[#FAF9F6] group md:px-10 px-4 py-6 rounded-xl items-center justify-center md:items-start md:justify-start">
                  <Image src={"/images/new/Group 1000003846.svg"} alt=" " height={80} width={80} />
                  <h3 className="font-semibold text-2xl group-hover:text-primary">Comprehensive Reporting</h3>
                  <h4 className="font-medium text-lg text-center md:text-start">We provide in-depth reports on the performance of your backlinks and guest posts, including metrics such as referral traffic, engagement levels, and SEO impact.</h4>
                </div>
                <div className="flex flex-col md:w-full lg:w-103 text-black gap-2 hover:bg-[#FAF9F6] group md:px-10 px-4 py-6 rounded-xl items-center justify-center md:items-start md:justify-start ">
                  <Image src={"/images/new/Group 1000003848.svg"} alt=" " height={80} width={80} />
                  <h3 className="font-semibold text-2xl group-hover:text-primary">Customised Approach</h3>
                  <h4 className="font-medium text-lg text-center md:text-start">We provide personalized strategies by targeting the most relevant website, heading you towards valuable SEO opportunities that align with your brand value.</h4>
                </div>
                <div className="flex flex-col md:w-full lg:w-103 text-black gap-2 hover:bg-[#FAF9F6] group md:px-10 px-4 py-6 rounded-xl items-center justify-center md:items-start md:justify-start ">
                  <Image src={"/images/new/Group 1000003849.svg"} alt=" " height={80} width={80} className="" />
                  <h3 className="font-semibold text-2xl group-hover:text-primary">SEO Optimization</h3>
                  <h4 className="font-medium text-lg text-center md:text-start">SEO is in our veins. We devote our efforts to SEO best practices to ensure your guest posts are optimized for search engines like Google.</h4>
                </div>
              </div>

            </div>
          </div>
          <hr className="mt-10 " />
        </FadeInSection>


        {/* Why Choose Vefogix?*/}
        <FadeInSection>
 
        <div className='' >
          <CardSlider />

        </div>
        </FadeInSection>
        {/* 20%off */}
        <FadeInSection>

        <div className='w-full 2xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px]'>
          <div
            className="bg-[#344C92]  py-10 px-8 lg:px-16 text-white rounded-2xl justify-between items-center gap-7 flex-wrap md:flex-nowrap  flex">
            <div className="md:w-[60%]">
              <p className=" text-[20px] lg:text-[24px] xl:text-[48px] font-extrabold text-white text-center md:text-start  capitalize leading-tight">Let&apos;s Connect!</p>
              <p className="font-medium text-[16px] mt-4  text-center md:text-start ">At Vefogix, a reputed SEO Backlink Agency, we conduct initial consultations directed by our digital marketing experts. We perform in-depth analysis to navigate your current linking needs, optimally utilising our resources and driving higher traffic to your station. <br />

                Connect us to leverage high-authority backlinks at minimal rates!
              </p>
              <a href="#contact" className="scroll-smooth flex items-center justify-center md:items-start md:justify-start">
                <button
                  className="text-[20px] border-white border-2 font-semibold text-white rounded-lg mt-8 py-1 md:py-3 px-6 hover:bg-white hover:text-[#344C92] duration-300 ease-in-out">
                  Contact Us
                </button>

              </a>
            </div>
            <div className=" flex justify-center items-center">
              <Image src="/images/new/Group 1000003874.svg" alt="finding" width={300} height={300}       layout="responsive" />
            </div>
          </div>


        </div>

        </FadeInSection>

        <FadeInSection>
        {/* reviews */}
        <div className=' w-full py-[25px]  mt-7' id="reviews">
          <h3 className=" text-center text-[20px] lg:text-[24px] xl:text-[48px] text-black font-extrabold leading-tight  mb-[54px]"><span className="text-primary">
            What</span> people are saying</h3>
          {/* <MarqueeDemo /> */}
          <Reviews />
        </div>
        </FadeInSection>


        <FadeInSection>
        {/* faqs */}
        <div className="py-[100px] px-[20px] xl:px-[250px]  flex-col xl:flex xl:flex-row  items-center justify-center bg-[#F4F4F4]" id="faqs">
          <div className='flex-1 flex flex-col gap-4 items-start justify-center'>
            <h3 className="text-[20px] lg:text-[24px] xl:text-[48px] leading-tight text-black font-extrabold text-center xl:text-start w-full">
              Most Frequently Asked<br className="mb-2" />
              <span className="text-primary">Questions</span>
            </h3>
            <div className='flex gap-7 items-center justify-center xl:justify-start w-full '>
              <div className="flex ">
                <AnimatedTooltip items={people} />
              </div>
              <h3 className='flex items-center justify-center text-black font-medium text-sm  '>More Than 5000 <br /> Active Users.</h3>
            </div>
            <Link href="/signin" className="nav_Button py-3 px-3 group w-[200px] mt-19 hidden xl:flex  ">
              <span className="">Sell Guest Post </span>
              <span className="h-[30px] w-[30px] rounded-full bg-white flex justify-center items-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all ease-in-out duration-300"><FiArrowUpRight className="text-xl font-bold " /></span>
            </Link>
          </div>
          <div className='flex-1 mt-4 xl:mt-0'>
            <Faq />
          </div>
        </div>
        </FadeInSection>
        {/* blogs */}
        <div className='w-full 2xl:px-50 lg:px-[80px] md:px-[60px] sm:px-[40px] px-[20px] overflow-hidden'>

          <FadeInSection>
            <SimpleSlider />
          </FadeInSection>
        </div>




        {/* contact */}
        <div className='w-full ' id="contact">
          <FadeInSection>
            <Page />
          </FadeInSection>
        </div>



        <FooterFour />

      </div>
    </>
  );
}

export async function generateMetadata( ){
  let metaTitle = '';
  let metaDescription = '';
  let metaKeyword = '';
  let index = false;
  try {
    const metaData = await fetchMeta("home");

    // Set metadata based on the fetched data
    metaTitle = metaData.metaTitle || metaTitle;
    metaDescription = metaData.metaDescription || metaDescription;
    metaKeyword = metaData.metaKeywords || metaKeyword;
    index = metaData.index;
  } catch (error) {
    console.error('Error fetching meta data:', error);
  }
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeyword,
    robots: index ? 'index,follow' : 'noindex,nofollow',
  };
}