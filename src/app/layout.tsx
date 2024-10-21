"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const currentUrl = `https://www.vefogix.com${pathname}`;
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <html lang="en">
      <MetaTags/>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="canonical" href={currentUrl} />
        <link rel="apple-touch-icon" href="/images/favicon.ico" />
        <Script 
        id="gtm"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5W5VZCM7');`,
          }}
        /> 
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VEFOGIX",
              "alternateName": "VEFOGIX",
              "url": "https://vefogix.com/",
              "logo": "https://vefogix.com/",
            }),
          }}
        />

<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "VEFOGIX",
              "url": "https://vefogix.com/",
            }),
          }}
        />

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6BF8XH1GYF"></Script>
<Script
        id="gtag"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6BF8XH1GYF');
          `,
        }}
      />
{/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What do I Deal with?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VefoGix is a site that simply sells guest articles with no minimum guest post requirements or SEO analytics. Furthermore, there is no assessment of home page features or other needs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How considerably cash can I earn?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This depends on you because many merchants work full-time while others consider this platform to be part-time. You can utilise the VefoGix platform as often as you like to earn extra money."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does it cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There are no membership costs for the VefoGix, and there are no monthly fees to advertise your websites. We take 10% of each transaction, and the remaining 90% is yours."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long will it take to transfer my profits to my withdrawing account?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your profits will be paid to your VefoGix account as soon as you finish your transaction. It would take 30 days for it to be transferred into your withdrawing account through PayPal or Payoneer. Please keep in mind that we examine each money withdrawal request. Please ensure that your provided hyperlinks remain active for your payment to be processed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What should I look for in a guest posting website?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Look for websites with high domain authority (DA), relevant content to your niche, active engagement from users, and a track record of publishing quality guest posts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What payment methods do you accept?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can pay using a number of various ways, including PayPal, 10 different cryptocurrencies, and credit cards (with or without PayPal)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much effect does SEO have on subdomains or subdirectories?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While subdirectories work well for smaller websites with less diversity of material, subdomains can be helpful for larger websites with varied content because they offer structure and order. Subdomain and subdirectory usage is common in the content publication industry; both are part of the main domain ecosystem and preserve the overall branding and authority for SEO."
                  }
                }
              ]
            }),
          }}
        /> */}

      </head>
      <body suppressHydrationWarning={true}>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5W5VZCM7"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
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

                  {loading ? <Loader /> : children}

                </RecordProvider>
              </WebsiteProvider>
            </SidebarProjectProvider>
          </ProjectProvider>
        </LayoutProvider>

      </body>
    </html>
  );
}

