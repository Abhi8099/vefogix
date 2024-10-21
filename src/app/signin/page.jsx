"use client";
import { Metadata } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import SigninWithPassword from "../../components/Auth/SigninWithPassword";
import Signin from "@/components/Auth/Signin";
import Image from "next/image";
import HeaderComp from "@/components/HeaderComp";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import { FooterFour } from "@/components/Footer";




export default function Signinin() {
  useEffect(() => {
    Aos.init({});
}, []);
  return (
    <>



<div className="rounded-[10px] bg-white h-[90vh] shadow-1 dark:bg-gray-dark dark:shadow-card ">
<HeaderComp/>
        <div className="flex flex-wrap items-center justify-center h-full">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-2 sm:p-12.5 xl:p-15">
              <Signin />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2 " data-aos="zoom-out">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 py-12.5 dark:!bg-dark-2 dark:bg-none flex flex-col items-center justify-center ">
              <Link className="mb-10 inline-block" href="">
                <Image
                  className="dark:hidden size-60"
                  src={"/images/new/Group 1000003985.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign in to your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6 text-center">
                Please sign in to your account by completing the necessary
                fields.
              </p>

            </div>
          </div>
        </div>
        <FooterFour />
      </div>



</>
  );
}
