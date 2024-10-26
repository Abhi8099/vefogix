"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie';
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
import { MenuIcon } from "@heroicons/react/outline"; 
import { MdOutlineCancel } from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
 const [isClient, setIsClient] = useState(false)
  const [publisher, setPublisher] = useState(false)

  useEffect(() => {
    setIsClient(true)
    Aos.init({})
    const isPublisher = localStorage.getItem("isPublisher") === "true"
    setPublisher(isPublisher)
  }, [])

    const token = Cookies.get('login_access_token');
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { page: "Home", link: "home",href:"/" },
        { page: "Websites", link: "websites",href:"/" },
        {
            page: "Free Tools",
            submenu: [
                { page: "File Convertor", link: "https://portyourdoc.com/" },
                { page: "SEO Audit Report", link: "https://onpageinsights.com/"},
                { page: "Word Counter", link: "/seo-tools/word-counter"},
                { page: "Keyword Density Report", link: "/seo-tools/keyword-density-report"},
                { page: "Keyword Suggestions", link: "/seo-tools/keyword-suggestions"},
                { page: "Schema Generator", link: "/seo-tools/schema-generator"},
                { page: "Opengraph Generator", link: "/seo-tools/opengraph-generator"},
                { page: "Twitter Card Generator", link: "/seo-tools/twitter-card-generator"},
                { page: "Bulk DA, PA, Spam Score Checker", link: "/seo-tools/bulk-checker"},
                
                { page: "Dummy Content Checker", link: "/seo-tools/dummy-content-checker"},
            ],
            href:"/seo-tools"
        },
        { page: "Blogs", link: "blogs",href:"/blogs" },
        { page: "Press Release",href:"/press-release", link: "press-release" },
        { page: "Contact Us", link: "contact",href:"/" },
    ];

    return (
        <>
            <nav className="sticky top-7 z-50 bg-white shadow-lg  px-4 py-3 md:px-8 md:py-4  rounded-2xl  xl:mx-50 ">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center ">
                        <Link href="/">
                            <Image
                                src="/images/new/Group 1000003985.svg"
                                height={1}
                                width={1}
                                alt="Logo"
                                className="object-contain min-w-[104.67px] h-[40px] -mb-2"
                                unoptimized
                            />
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:space-x-6">
                    {menuItems.map((item) => (
                        <div className="relative group" key={item.page}>
                            <ScrollLink
                                activeClass="active"
                                to={item.link}
                                smooth={true}
                                duration={500}
                                className={`navLink ${pathname === `/${item.link}/` ? "active" : ""}`}
                            >
                                <Link href={item.href}>
                                    {item.page}
                                </Link>

                            </ScrollLink>

                            {item.submenu && (
    <div className="absolute  hidden group-hover:block bg-white shadow-lg mt-1 rounded-lg w-80 rounded-b-lg"> {/* Increase width here */}
        {item.submenu.map((subItem) => (
            <Link
                href={`${subItem.link}`}
                key={subItem.page}
                target="_blank"
                className="block px-4 rounded-lg py-2 hover:bg-primary transition-all duration-100 ease-in-out hover:text-white text-black"
            >
                {subItem.page}
            </Link>
        ))}
    </div>
)}
                        </div>
                    ))}
                    {/* <div className={`navLink -mt-1 ${pathname === `/press-release/` ? "active" : ""}`}>
                        <Link href={"/press-release"}>Press Release</Link>
                    </div> */}
                </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {!token ? (
                            <>
                                <Link href="/signin" className="btn-nav">Sign In</Link>
                                <Link href="/signup" className="btn-nav">Sign Up</Link>
                            </>
                        ) : (
<Link href={publisher ? "/publisher-dashboard/" : "/buyer-dashboard/"} className="btn-nav">
    Dashboard
</Link>
                        )}
                    </div>

                    <button
                        className="lg:hidden flex items-center transition-all ease-in-out duration-300"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <MdOutlineCancel className="text-3xl text-black" /> 
                        :<MenuIcon className="h-6 w-6 text-gray-700" /> }

                    </button>
                </div>


            </nav>
            {menuOpen && (
    <div className="lg:hidden fixed inset-0 bg-white shadow-lg overflow-auto z-40" data-aos="slide-up">
        <div className="flex flex-col items-center justify-center mt-40 mx-10">
            {menuItems.map((item) => (
                <div key={item.page} className="w-full shadow mb-2">
                    <ScrollLink
                        to={item.link}
                        smooth={true}
                        duration={500}
                        className={`text-gray-700 hover:text-blue-500 flex items-center justify-center py-3 rounded-lg ${pathname === `/${item.link}` ? "font-bold" : ""}`}
                        onClick={() => setMenuOpen(false)}
                    >
                                <Link href={`/`}>
                                    {item.page}
                                </Link>
                    </ScrollLink>

                    {item.submenu && (
                        <div className="bg-gray-1 mt-2 rounded-lg w-full flex items-center justify-center flex-col  ">
                            {item.submenu.map((subItem) => (
                                <Link
                                href={`${subItem.link}`}
                                    key={subItem.page}
                                    target="_blank"
                                    className="block px-4 py-2 hover:bg-gray-100 border-b"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {subItem.page}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            
            {/* Other Links */}
            <Link href="/press-release" className="text-gray-700 py-4 w-full shadow items-center mb-2 justify-center flex rounded-lg">
                Press Release
            </Link>
            <Link href="tel:+91-8949272273" className="text-gray-700 py-4 w-full shadow items-center mb-2 justify-center flex rounded-lg">
                <span className="mr-2">📞</span>+91-8949272273
            </Link>
            <Link href="mailto:support@Vefogix.com" className="text-gray-700 py-4 w-full shadow items-center mb-2 justify-center flex rounded-lg">
                <span className="mr-2">📧</span>support@Vefogix.com
            </Link>

            {/* Authentication Links */}
            <div className="flex items-center space-x-4 my-4">
                {!token ? (
                    <>
                        <Link href="/signin" className="btn-nav">Sign In</Link>
                        <Link href="/signup" className="btn-nav">Sign Up</Link>
                    </>
                ) : (
                    <Link href={publisher ? "/publisher-dashboard" : "/buyer-dashboard"} className="btn-nav">
                        Dashboard
                    </Link>
                )}
            </div>
        </div>
    </div>
)}


            <style jsx>{`
                .btn-nav {
                    background-color: #344C92;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                    transition: background-color 0.3s, color 0.3s;
                }
                .btn-nav:hover {
                    background-color: white;
                    color: #344C92;
                }
                .btn-nav span {
                    background-color: white;
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    margin-left: 0.5rem;
                    font-weight: bold;
                    transition: background-color 0.3s, color 0.3s;
                }
                .btn-nav:hover span {
                    background-color: #344C92;
                    color: white;
                }

            `}</style>
        </>
    );
}
