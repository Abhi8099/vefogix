import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import SearchForm from "@/components/BuyerHeader/SearchForm";
import { Popover } from 'antd';
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from 'js-cookie';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

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
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.png"}
              alt="Logo"
            />
          </Link> */}
        </div>

        <div className="hidden xl:block">
          <div>
            <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
            Hello Publisher!
            </h1>
            {/* <p className="font-medium">Next.js Admin Dashboard Solution</p> */}
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Search Form --> */}
            {/* <SearchForm /> */}
            {/* <!-- Search Form --> */}



            <div className='flex gap-2'>
            <Popover title="Balance" >
            <p className='flex items-center justify-center md:px-3 px-1 bg-[#00d27a] text-black rounded-full text-sm font-semibold py-1 hover:scale-110 transition-all ease-in-out duration-300'>$ {data && data.publisher_wallet.remain_balance}</p>
            </Popover>
            <Popover title="Awaiting" >
            <p className='flex items-center justify-center md:px-3 px-1 bg-[#ffdb4a] text-black rounded-full text-sm font-semibold py-1 hover:scale-110 transition-all ease-in-out duration-300'>$ {data && data.publisher_wallet.awaiting_balance}</p>
            </Popover>
            <Popover title="Reserved" >
            <p className='flex items-center justify-center md:px-3 px-1 bg-[#27bcfd] text-black rounded-full text-sm font-semibold py-1 hover:scale-110 transition-all ease-in-out duration-300'>$ {data && data.publisher_wallet.reserved_balance}</p>
            </Popover>

            </div>

            

            {/* <!-- Dark Mode Toggle --> */}
            <div className='hidden md:block'>
            <DarkModeSwitcher  />
            </div>
            {/* <!-- Dark Mode Toggle --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
