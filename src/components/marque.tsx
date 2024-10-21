import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { FaRegUserCircle } from "react-icons/fa";

const reviews = [
    {
        name: "Michael J., Content Creator",
        username: "Unbelievable Service",
        body: "I am blown away by this guest post service! The quality is unbelievable, and the results speak for themselves. I have seen a significant boost in my site is traffic. Highly recommend!",
        img: "./images/user/user-01.png",
    },
    {
        name: "Sophia L., Travel Blogger",
        username: "Truly Exceptional",
        body: "This service is truly exceptional. The guest posts were delivered on time and exceeded all my expectations. My website is rankings have improved dramatically. I could not be happier!",
        img: "./images/user/user-02.png",
    },
    {
        name: "Daniel M., SEO Specialist",
        username: "Top-Notch Quality",
        body: "I am amazed by the top-notch quality of this guest post service. The posts were well-written and perfectly targeted. My site is visibility has soared since using this service. Absolutely love it!",
        img: "./images/user/user-03.png",
    },
    {
        name: "Emily W., Small Business Owner",
        username: "Fantastic Results",
        body: "The results from this guest post service are fantastic! My website is traffic has increased significantly, and the quality of the backlinks is outstanding. Highly recommend to anyone looking to boost their online presence.",
        img: "./images/user/user-04.png",
    },
    {
        name: "Oliver K., Fitness Enthusiast",
        username: "A True Game-Changer",
        body: "This guest post service is a true game-changer. The posts were placed on high-quality sites that are relevant to my niche. The impact on my website is rankings has been incredible. Love it!",
        img: "./images/user/user-05.png",
    },
    {
        name: "Grace F., Fashion Designer",
        username: "Incredible Attention to Detail",
        body: "I am thoroughly impressed with the attention to detail in this service. The guest posts were well-crafted and tailored to my brand is voice. My site is SEO has never been better. Amazing work!",
        img: "./images/user/user-06.png",
    },
    {
        name: "Liam P., Digital Entrepreneur",
        username: "Outstanding Service",
        body: "The service provided was outstanding! The guest posts were well-researched, and the placement was on authoritative sites. I have noticed a huge improvement in my website is traffic and rankings. Could not ask for more!",
        img: "./images/user/user-07.png",
    },
    {
        name: "Ella H., Marketing Consultant",
        username: "Highly Recommended",
        body: "I highly recommend this guest post service. The quality of the posts and the relevance of the sites they were published on are top-tier. My website is authority has grown tremendously!",
        img: "./images/user/user-08.png",
    },
    {
        name: "Rajesh K., Tech Blogger",
        username: "Excellent Service in India",
        body: "This service is excellent! The guest posts were published on top sites in India, and the quality of the content was outstanding. My website is performance has improved dramatically. Very satisfied!",
        img: "./images/user/user-09.png",
    },
    {
        name: "Mia R., Health Coach",
        username: "Phenomenal Quality",
        body: "The quality of the guest posts provided was phenomenal. The posts were insightful and engaging, and the sites they were published on were well-chosen. My site is visibility has improved significantly. Love it!",
        img: "./images/user/user-10.png",
    },
    {
        name: "Sanjay B., E-commerce Specialist",
        username: "Exceptional for Indian Market",
        body: "This guest post service is exceptional, especially for the Indian market. The posts were highly relevant to my audience, and the impact on my website is traffic and SEO has been tremendous. Highly recommended!",
        img: "./images/user/user-11.png",
    },
    {
        name: "Chloe N., Food Blogger",
        username: "Brilliant Results",
        body: "I am thrilled with the results of this service. The guest posts were brilliant, and they were placed on reputable sites that drove quality traffic to my site. My rankings have never been better!",
        img: "./images/user/user-12.png",
    },
    {
        name: "Ryan T., Financial Advisor",
        username: "Unparalleled Service",
        body: "This guest post service is unparalleled. The quality of the posts and the sites they were published on were beyond my expectations. My website is SEO has improved significantly. Absolutely amazing!",
        img: "./images/user/user-13.png",
    },
    {
        name: "Isabella C., Online Store Owner",
        username: "Perfectly Executed",
        body: "This service was perfectly executed. The guest posts were not only well-written but also strategically placed. My website is visibility has increased, and I could not be more pleased with the results!",
        img: "./images/user/user-14.png",
    },
    {
        name: "Lucas J., Fitness Blogger",
        username: "Amazing Experience",
        body: "My experience with this guest post service has been amazing. The posts were tailored to my niche, and the impact on my site is traffic and rankings was immediate. I highly recommend this service!",
        img: "./images/user/user-15.png",
    },
    {
        name: "Priya S., Digital Marketer",
        username: "Impressive Results in India",
        body: "I am impressed by the results this guest post service delivered. The posts were published on high-quality websites, which significantly boosted my site is traffic and authority. Exceptional service!",
        img: "./images/user/user-16.png",
    },
    {
        name: "Jack D., Real Estate Investor",
        username: "Outstanding Performance",
        body: "The performance of this guest post service was outstanding. The posts were relevant, well-written, and published on authoritative sites. My website is SEO has seen a significant boost. Love it!",
        img: "./images/user/user-17.png",
    },
    {
        name: "Ava M., Beauty Blogger",
        username: "Unique and Effective",
        body: "This guest post service is unique and highly effective. The posts were customized to fit my brand, and the results have been nothing short of phenomenal. My website is rankings have improved dramatically!",
        img: "./images/user/user-18.png",
    },
    {
        name: "Amit R., Business Consultant",
        username: "Excellent Indian Market Focus",
        body: "The service was excellent, particularly for the Indian market. The guest posts were published on reputable Indian sites, and the quality was top-notch. My website is presence has grown significantly!",
        img: "./images/user/user-19.png",
    },
    {
        name: "Lily B., E-commerce Entrepreneur",
        username: "Exceptional Quality",
        body: "The quality of the guest posts was exceptional. They were engaging, well-researched, and published on authoritative sites. My website is traffic and rankings have improved significantly. Highly recommended!",
        img: "./images/user/user-20.png",
    },
    {
        name: "Harry P., Tech Enthusiast",
        username: "Fantastic Service",
        body: "This guest post service was fantastic! The quality of the content and the selection of sites were both top-notch. My website is visibility has improved, and I have seen a noticeable increase in traffic.",
        img: "./images/user/user-21.png",
    },
    {
        name: "Emily T., Marketing Specialist",
        username: "Reliable and Effective",
        body: "This service is reliable and incredibly effective. The guest posts were well-crafted and placed on relevant sites, resulting in a significant boost to my website is rankings. I am very pleased with the outcome!",
        img: "./images/user/user-22.png",
    },
    {
        name: "Nisha M., Lifestyle Blogger",
        username: "Top-Quality Service in India",
        body: "This guest post service is top-quality, especially for the Indian market. The posts were published on high-authority sites that are perfect for my audience. The results have been outstanding!",
        img: "./images/user/user-23.png",
    },
    {
        name: "Ethan S., Finance Blogger",
        username: "Incredible Attention to Detail",
        body: "The attention to detail in this guest post service was incredible. The posts were tailored to my specific needs, and the results have been remarkable. My website is SEO has never been better!",
        img: "./images/user/user-24.png",
    },
    {
        name: "Ravi J., Entrepreneur",
        username: "Excellent Experience in India",
        body: "My experience with this guest post service in India was excellent. The posts were high-quality, and the placement was on relevant Indian sites. My site is visibility and traffic have increased dramatically!",
        img: "./images/user/user-25.png",
    },
];



const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-[500px] h-[142.82px] ml-[47px]  cursor-pointer overflow-hidden rounded-xl border p-4  bg-white",
                // light styles
                "border-gray-950/[.1] bg-white hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2 ">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-xs font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-sm font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent gap-[52px]">
            <Marquee pauseOnHover className="[--duration:70s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:70s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3  dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3  dark:from-background"></div>
        </div>
    );
}