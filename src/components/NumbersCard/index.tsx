"use client";
import React,{useRef, useState} from 'react'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Statistic, type StatisticProps } from 'antd';

const NumbersCard = () => {
    
    const [startCount, setStartCount] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,  // Only trigger once when it enters the viewport
        onChange: (inView) => {
            if (inView) {
                setStartCount(true);
            }
        },
    });

    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp end={value as number} separator="," start={startCount ? 0 : undefined} />
    );

    return (
        <div
        ref={ref}
        className='w-full flex items-center justify-center  border-[#ABABAB] mt-25 mb-10 pb-10  xl:px-50 lg:px-[80px]  sm:px-[40px] px-[20px] flex-wrap gap-10 md:gap-0'>
            <div className=" md:border-r-1 md:border-l-1 border-[#ABABAB] flex flex-col  items-center justify-center md:px-5 lg:px-10 xl:px-20 mb-8 md:mb-0  " >

            <h3 className="flex items-center text-[38px] font-extrabold text-primary ">
  <Statistic 
    className="" 
    value={41563}
    formatter={formatter}
    valueStyle={{ color: 'rgb(52,76,146 )', fontSize: '38px', fontWeight: '700' }}
  />+
</h3>

                <p className="text-xl font-semibold ">Registered Websites</p>
            </div>
            <div className=" md:border-r-1 border-[#ABABAB] flex flex-col gap-3 items-center justify-center md:px-5 lg:px-10 xl:px-20 mb-8 md:mb-0 " >


                <h3 className="flex items-center text-[38px] font-extrabold text-primary ">
  <Statistic 
    className=""
    value={26630}
    formatter={formatter}
    valueStyle={{ color: 'rgb(52,76,146 )', fontSize: '38px', fontWeight: '700' }}
  />+
</h3>
                <p className="text-xl font-semibold">Publishers & Writers</p>
            </div>
            <div className=" md:border-r-1 border-[#ABABAB] flex flex-col gap-3 items-center justify-center md:px-5 lg:px-10 xl:px-20  md:mb-0 " >


                <h3 className="flex items-center text-[38px] font-extrabold text-primary ">
  <Statistic 
    className=""
    value={204938}
    formatter={formatter}
    valueStyle={{ color: 'rgb(52,76,146 )', fontSize: '38px', fontWeight: '700' }}
  />+
</h3>
                <p className="text-xl font-semibold">Tasks Completed</p>
            </div>
        </div>
    )
}

export default NumbersCard
