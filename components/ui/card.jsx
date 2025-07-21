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
        <div className="flex flex-row justify-between w-full h-fit items-center gap-4 border-b-2 border-muted-foreground py-2">
          <span className="flex justify-center items-center text-xs font-roboto font-medium p-1 px-3 rounded-sm bg-button w-fit text-black">
            {category}
          </span>
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
          className="flex justify-center items-center gap-1 p-2 px-4 rounded-md font-medium text-black bg-lime-300 transition-colors font-roboto text-sm"
          onClick={() => router.push(`/blog/${id}`)}
        >
          Continue Reading <MdDoubleArrow className="size-4"/>
        </button>
      </div>
    </div>
  );
}

export default Card;
