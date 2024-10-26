"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/BuyerSidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { IoPersonAdd } from "react-icons/io5";
import { IoBagAdd } from "react-icons/io5";
import axios from "axios";
import { GoProject } from "react-icons/go";
import { MdFavorite } from "react-icons/md";
import { useSidebarProjects } from "@/helpers/SidebarProjectContext";
import { MdOutlineBrowserNotSupported } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { TbInvoice } from "react-icons/tb";
import { useWebsites } from "@/helpers/WebsiteContext";
import Aos from "aos";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { GrDocumentConfig } from "react-icons/gr";
import { BASE_URL } from "@/utils/api";
import { TbTools } from "react-icons/tb";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdContentPasteSearch } from "react-icons/md";
import { RiLogoutBoxLine, RiArrowDownSLine, RiToolsLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";
import { IoPulseOutline } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import { LuWholeWord } from "react-icons/lu";
import { MdChecklistRtl } from "react-icons/md";
import { MdNetworkCheck } from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { MdOutlineSchema } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { motion, useAnimation } from 'framer-motion';
import { PiShoppingCartSimpleBold } from "react-icons/pi";




interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface Project {
  id: number;
  name: string;
  status: boolean;
  title: any;
}



const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {


  const router = useRouter()
  const handleLogout = async () => {
    const token = Cookies.get("login_access_token");
    const refresh_token = Cookies.get("login_refresh_token");
    try {
      await axios.post(`${BASE_URL}auth/logout/`, {"refresh_token":refresh_token}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
      },
      });
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove('login_access_token');
      localStorage.removeItem("login_access_token");
      localStorage.removeItem("login_refresh_token");
      localStorage.removeItem("login_user");
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", () => {
          window.history.pushState(null, "", window.location.href);
      });
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("An error occurred during logout");
    }
    finally{

        window.location.reload();

    }
  }


  useEffect(() => {
    Aos.init({});
    buyer_Tasks();
    // fetchFav();
    // fetchBlack();
  }, []);

  const { buyerTasks, buyer_Tasks } = useWebsites();

  const sum1 = buyerTasks.reduce((sum: any, publisherTasks: any) => {
    return publisherTasks.task_status.title === "Pending Approval" ? sum + 1 : sum;
  }, 0)
  const sum2 = buyerTasks.reduce((sum: any, publisherTasks: any) => {
    return publisherTasks.task_status.title === "Not Started" ? sum + 1 : sum;
  }, 0)
  const s_u_m = sum1 + sum2
  // console.log(s_u_m);

  const { projects } = useSidebarProjects();

  const checkedProjects = projects.filter((project:any) => project.status);

  const menuGroups = [
    {
      name: "BUYER MENU",
      menuItems: [
        {
          icon: (
            <svg
              className="text- fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00009 17.2498C8.58588 17.2498 8.25009 17.5856 8.25009 17.9998C8.25009 18.414 8.58588 18.7498 9.00009 18.7498H15.0001C15.4143 18.7498 15.7501 18.414 15.7501 17.9998C15.7501 17.5856 15.4143 17.2498 15.0001 17.2498H9.00009Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1.25C11.2749 1.25 10.6134 1.44911 9.88928 1.7871C9.18832 2.11428 8.37772 2.59716 7.36183 3.20233L5.90622 4.06943C4.78711 4.73606 3.89535 5.26727 3.22015 5.77524C2.52314 6.29963 1.99999 6.8396 1.65907 7.55072C1.31799 8.26219 1.22554 9.0068 1.25519 9.87584C1.2839 10.717 1.43105 11.7397 1.61556 13.0219L1.90792 15.0537C2.14531 16.7036 2.33368 18.0128 2.61512 19.0322C2.90523 20.0829 3.31686 20.9169 4.05965 21.5565C4.80184 22.1956 5.68984 22.4814 6.77634 22.6177C7.83154 22.75 9.16281 22.75 10.8423 22.75H13.1577C14.8372 22.75 16.1685 22.75 17.2237 22.6177C18.3102 22.4814 19.1982 22.1956 19.9404 21.5565C20.6831 20.9169 21.0948 20.0829 21.3849 19.0322C21.6663 18.0129 21.8547 16.7036 22.0921 15.0537L22.3844 13.0219C22.569 11.7396 22.7161 10.717 22.7448 9.87584C22.7745 9.0068 22.682 8.26219 22.3409 7.55072C22 6.8396 21.4769 6.29963 20.7799 5.77524C20.1047 5.26727 19.2129 4.73606 18.0938 4.06943L16.6382 3.20233C15.6223 2.59716 14.8117 2.11428 14.1107 1.7871C13.3866 1.44911 12.7251 1.25 12 1.25ZM8.09558 4.51121C9.15309 3.88126 9.89923 3.43781 10.5237 3.14633C11.1328 2.86203 11.5708 2.75 12 2.75C12.4293 2.75 12.8672 2.86203 13.4763 3.14633C14.1008 3.43781 14.8469 3.88126 15.9044 4.51121L17.2893 5.33615C18.4536 6.02973 19.2752 6.52034 19.8781 6.9739C20.4665 7.41662 20.7888 7.78294 20.9883 8.19917C21.1877 8.61505 21.2706 9.09337 21.2457 9.82469C21.2201 10.5745 21.0856 11.5163 20.8936 12.8511L20.6148 14.7884C20.3683 16.5016 20.1921 17.7162 19.939 18.633C19.6916 19.5289 19.3939 20.0476 18.9616 20.4198C18.5287 20.7926 17.9676 21.0127 17.037 21.1294C16.086 21.2486 14.8488 21.25 13.1061 21.25H10.8939C9.15124 21.25 7.91405 21.2486 6.963 21.1294C6.03246 21.0127 5.47129 20.7926 5.03841 20.4198C4.60614 20.0476 4.30838 19.5289 4.06102 18.633C3.80791 17.7162 3.6317 16.5016 3.3852 14.7884L3.10643 12.851C2.91437 11.5163 2.77991 10.5745 2.75432 9.82469C2.72937 9.09337 2.81229 8.61505 3.01167 8.19917C3.21121 7.78294 3.53347 7.41662 4.12194 6.9739C4.72482 6.52034 5.54643 6.02973 6.71074 5.33615L8.09558 4.51121Z"
                fill=""
              />
            </svg>
          ),
          label: "Dashboard",
          route: "/buyer-dashboard",
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M2,9H9V2H2Zm0,9H9V11H2ZM18,2H11V9h7Zm-8,9,5,8,5-8Z" />
              </g>
            </svg>
          ),
          label: "All my projects",
          route: "/projects",
        },

        //         ...checkedProjects.map((project:any) => ({
        //           icon: (
        // <GoProject className="text-xl"/>
        //           ),
        //           label: project.title,
        //           route: ``,
        //                     children: [
        //             { label: "All Publisher Sites", route: `/projects/${project.id}/publishers` },
        //             { label: "Verified Website", route: `/projects/${project.id}/recommended` },
        //             { label: "Favourite Publishers", route: `/projects/${project.id}/favourite-publishers` },
        //             { label: "Link Insertions", route: `/projects/${project.id}/link-insertion/` },
        //           ],
        //         })),

        {
          icon: (
            <FaListUl className="" />
          ),
          label: "All Publisher Sites",
          route: "/all-publisher-sites",
        },
        {
          icon: (
            <RiVerifiedBadgeLine  className=" text-xl" />
          ),
          label: "Verified Sites",
          route: "/verified-websites",
        },
        {
          icon: (
            <PiShoppingCartSimpleBold  className=" text-xl" />
          ),
          label: "Press Releases",
          route: "/press-release",
        },
        {
          icon: (
            <BsCartCheck className=" text-xl" />
          ),
          label: `My Orders (${s_u_m})`,
          route: "/buyer-orders",
        },
        {
          icon: (
            <TbInvoice className=" text-xl" />
          ),
          label: "Invoices",
          route: "/invoices",
        },
        {
          icon: (
            <MdFavorite className=" text-xl" />
          ),
          label: `Favourite Sites`,
          route: "/favorite-sites",
        },
        {
          icon: (
            <MdOutlineBrowserNotSupported className=" text-xl" />
          ),
          label: `Blacklisted Sites`,
          route: "/blacklisted-sites",
        },
      ],

    },
    {
      name: "OTHERS",
      menuItems: [

        {
          icon: (
            <GrDocumentConfig className="text-xl" />

          ),
          label: "Support Tickets",
          route: "/support-tickets",
        },
        {
          icon: (
            <IoBagAdd className="text-xl" />

          ),
          label: "Add Funds",
          route: "/buyer-add-funds",
        },
        //faq
        {
          icon: (
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm1-4.5v2H11v-2Zm3-7a3.984,3.984,0,0,1-1.5,3.122A3.862,3.862,0,0,0,13.063,15H11.031a5.813,5.813,0,0,1,2.219-3.936A2,2,0,0,0,13.1,7.832a2.057,2.057,0,0,0-2-.14A1.939,1.939,0,0,0,10,9.5,1,1,0,0,1,8,9.5V9.5a3.909,3.909,0,0,1,2.319-3.647,4.061,4.061,0,0,1,3.889.315A4,4,0,0,1,16,9.5Z" />
            </svg>
          ),
          label: "FAQ",
          route: "/FAQ",
        },
        {
          icon: (
            <VscFeedback  className="text-xl" />

          ),
          label: "Feedback",
          route: "/feedback",
        },
      ],
    },

  ];

  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  useEffect(() => {
    // Normalize pathname by removing trailing slashes
    const normalizedPathname = pathname.replace(/\/+$/, "");
  
    // console.log("Normalized pathname:", normalizedPathname); 
    const activeMenu = menuGroups.flatMap(group => group.menuItems)
      .find(item => item.route === normalizedPathname);
  
    // console.log(activeMenu);
    
    if (activeMenu) {
      localStorage.setItem("selectedMenu", `"${activeMenu.label.toLowerCase()}"`);
      // console.log(activeMenu.label);
      setPageName(activeMenu.label.toLowerCase());
    } else {
      console.log("No active menu found."); 
    }
  }, [pathname, setPageName]);
  
  


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the last item smoothly when dropdown opens
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const lastItem = dropdownRef.current.lastElementChild;
      lastItem?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isOpen]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index:any) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.3 },
    }),
  };
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute  left-0 top-0 z-9999 flex h-screen w-65 flex-col overflow-y-hidden border-r border-stroke bg-[#122031] dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${sidebarOpen
          ? "translate-x-0 duration-300 ease-linear"
          : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10">
          <Link href="/">
            <Image
              src={"/images/new/whitelogo2.svg"}
              height={1}
              width={200}
              alt='Invoice Image'
              className="object-contain min-w-[104.67px] h-[40px] -mb-2"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-2 ">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-white">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {/* {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))} */}
                  {group.menuItems.map((item) => (
                    <SidebarItem key={item.label} item={item} pageName={pageName} setPageName={setPageName} />
                  ))}
                </ul>
              </div>
            ))}
   <div className="relative inline-block text-left w-full">
      <button
        onClick={toggleDropdown}
        className="text-gray-5 w-full hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white group relative flex items-center gap-3 rounded-[7px] px-3.5 py-3 font-medium duration-300 ease-in-out -mt-5"
      >
        <TbTools className="text-xl" />
        Free Tools
        <RiArrowDownSLine className="ml-auto text-xl" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <motion.div
          className="my-2 w-full rounded-md shadow-lg bg-white/10 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
          initial="hidden"
          animate="visible"
          variants={dropdownVariants}
          ref={dropdownRef}
        >
          <div className="py-1">
            {[
              {
                href: "https://portyourdoc.com/",
                text: "File Convertor",
                icon: <SlRefresh className="text-lg" />,
              },
              {
                href: "https://onpageinsights.com/",
                text: "SEO Audit Report",
                icon: <IoPulseOutline className="text-lg" />,
              },
              {
                href: "/seo-tools/word-counter",
                text: "Word Counter",
                icon: <LuWholeWord className="text-lg" />,
              },
              {
                href: "/seo-tools/keyword-density-report",
                text: "Keyword Density Report",
                icon: <TbReportAnalytics className="text-lg" />,
              },
              {
                href: "/seo-tools/keyword-suggestions",
                text: "Keyword Suggestions",
                icon: <VscSymbolKeyword className="text-lg" />,
              },
              {
                href: "/seo-tools/schema-generator",
                text: "Schema Generator",
                icon: <MdOutlineSchema className="text-lg" />,
              },
              {
                href: "/seo-tools/opengraph-generator",
                text: "Opengraph Generator",
                icon: <MdChecklistRtl className="text-lg" />,
              },
              {
                href: "/seo-tools/bulk-checker",
                text: "Bulk DA, PA, Spam Score Checker",
                icon: <MdNetworkCheck className="text-lg" />,
              },
              {
                href: "/seo-tools/dummy-content-checker",
                text: "Dummy Content Checker",
                icon: <MdContentPasteSearch className="text-lg" />,
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                target="_blank"
                href={item.href}
                className="text-gray-5 dark:text-gray-5 flex items-center gap-3 px-4 py-2 rounded-[7px] text-base font-medium hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700"
                variants={listItemVariants}
                custom={index}
              >
                {item.icon}
                {item.text}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
            <button
              onClick={handleLogout}
              className="text-gray-5 w-full hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white group relative flex items-center gap-3 rounded-[7px] px-3.5 py-3  font-medium duration-300 ease-in-out"><RiLogoutBoxLine className="text-xl" />Logout</button>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
