"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Loader from "@/components/common/Loader";
import { Toaster } from 'react-hot-toast';
import { LayoutProvider } from "@/helpers/LayoutContext";
import { ProjectProvider } from "@/helpers/CheckedProjectsContext";
import { SidebarProjectProvider } from "@/helpers/SidebarProjectContext";
import { WebsiteProvider } from "@/helpers/WebsiteContext";
import { RecordProvider } from "@/helpers/RecordContext";
import Head from 'next/head';
import Script from "next/script";
import { Popover } from "antd";
import Link from "next/link";
import Image from "next/image";
import MetaTags from "@/components/metadata";

export default function Providers({ children }: { children: React.ReactNode }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname();
    const currentUrl = `https://www.vefogix.com${pathname}`;
    return <>

        <Popover
            title="Whatsapp Chat"
            trigger="hover"
            placement="left"
        >
            <Link
                href="https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0"
                passHref
                target="_blank"
                className='fixed bottom-22 right-3 sm:right-7 z-999 cursor-pointer hover:scale-110 active:scale-90 transition-all ease-in-out duration-100  ' >
                <Image src="/images/new/whatsapp.png" alt="he" width={50} height={50} className="rounded-full size-15" />
            </Link>
        </Popover>
        <Toaster />
        <LayoutProvider>
            <ProjectProvider>
                <SidebarProjectProvider>
                    <WebsiteProvider>
                        <RecordProvider>
                            {children}
                        </RecordProvider>
                    </WebsiteProvider>
                </SidebarProjectProvider>
            </ProjectProvider>
        </LayoutProvider>
    </>


}