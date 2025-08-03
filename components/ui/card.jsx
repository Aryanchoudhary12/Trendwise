"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar1Icon, Sparkles } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
function Card({
  id,
  image,
  title,
  description,
  category,
  time,
  published,
  author,
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-full min-h-[25.6rem] w-76 bg-secondary-foreground p-4 rounded-2xl hover:shadow-secondary/20 transition-all duration-300  hover:scale-101 border border-[rgba(255,255,255,0.10)]">
      <div className="flex flex-col items-start gap-1">
        <Image
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-md"
          width={200}
          height={200}
        />
        <p className="text-base font-medium font-poppins mt-1">{title}</p>
        <div className="flex flex-row justify-between w-full h-fit items-center gap-4 ">
          <button className="px-4 py-0.5  border border-black dark:border-white uppercase bg-white text-black transition duration-200 text-xs shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
            {category}
          </button>
          {!published && (
            <div className="flex justify-start items-center gap-1 font-roboto text-xs text-blue-200  rounded-sm bg-blue-300/20 p-1 px-2 ">
              <Sparkles className="h-3 w-3" /> Groq AI
            </div>
          )}
        </div>
        <p className="text-xs font-normal font-roboto mt-2">{description}</p>
      </div>
      <div className="flex flex-col justify-center gap-2 mt-2">
        <div className="flex justify-start items-center gap-1 w-full">
          <Calendar1Icon className="size-3 stroke-secondary" />
          <p className="text-xs font-roboto text-secondary pt-1">{time}</p>
        </div>

        <button
          className="px-8 py-2 rounded-md relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 w-full"
          onClick={() => router.push(`/blog/${id}`)}
        >
          <div className="absolute inset-x-0 h-px w-3/4 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          <span className="relative z-20">Continue reading</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
