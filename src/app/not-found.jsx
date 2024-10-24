
import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function ErrorTwo() {

    return (
        <div className="flex flex-col px-2 lg:flex-row lg:items-center h-screen w-screen justify-center">
            <div>
                <div>
                    <p className="text-sm font-semibold text-black">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                        We can&apos;t find that page
                    </h1>
                    <p className="mt-4 text-gray-500">
                        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
                    </p>
                    <div className="mt-6 flex items-center gap-x-3">
                        <a
                            href='/'
                            type="button"
                            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Home
                        </a>
                        <a
                            href='https://api.whatsapp.com/send/?phone=918949272273&text&type=phone_number&app_absent=0'
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Contact us
                        </a>
                    </div>
                </div>
                <div className="mt-10 space-y-6">
                    <div>
                        <a
                            href="/signin"
                            className="hover:underlin inline-flex items-center gap-x-2 text-sm font-semibold text-black"
                        >
                            <span>Dashbord</span>
                            <ArrowRight size={16} />
                        </a>
                        <p className="mt-2 text-sm text-gray-500">Sign in to learn all about our product.</p>
                    </div>
                    <div>
                        <a
                            href="/blogs"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold text-black hover:underline"
                        >
                            <span>Our blog</span>
                            <ArrowRight size={16} />
                        </a>
                        <p className="mt-2 text-sm text-gray-500">Read the latest posts on our blog.</p>
                    </div>
                    <div>
                        <a
                            href="/"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold text-black hover:underline"
                        >
                            <span>Chat to support</span>
                            <ArrowRight size={16} />
                        </a>
                        <p className="mt-2 text-sm text-gray-500">Our friendly team is here to help.</p>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block  w-[30%]">
                <Image
                    src="/images/new/pana.svg"
                    height={500}
                    width={500}
                    sizes=''
                    alt="404"
                    className="h-full w-full rounded-md object-cover"
                />
            </div>
        </div>
    )
}
