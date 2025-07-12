"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
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
    <div className="flex flex-col justify-between h-full min-h-[25.6rem] w-72 bg-secondary-foreground p-3 rounded-2xl hover:shadow-secondary/20 transition-all duration-300  hover:scale-101 border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]">
      <div className="flex flex-col items-start gap-1">
        <Image
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-md"
          width={200}
          height={200}
        />
        <p className="text-lg font-semibold font-poppins mt-1">{title}</p>
        <div className="flex flex-row justify-between w-full h-fit items-center gap-4">
          <span className="flex justify-center items-center text-xs font-medium p-1 px-3 rounded-xl text-secondary bg-muted-foreground/20 w-fit">
            {category}
          </span>
          {!published && (
            <div className="flex justify-start items-center gap-1 font-roboto text-xs text-blue-300  rounded-xl bg-blue-300/20 p-1 px-2">
              <Sparkles className="h-3 w-3" /> Groq AI
            </div>
          )}
        </div>
        <p className="text-sm font-normal font- ">
          {description}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex justify-between w-full">
          <p className="text-xs font-poppins text-secondary pt-1">{time}</p>
        </div>
        <button
          className="p-2 px-4 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 transition-colors font-roboto text-sm"
          onClick={() => router.push(`/blog/${id}`)}
        >
          View full Post
        </button>
      </div>
    </div>
  );
}

export default Card;
