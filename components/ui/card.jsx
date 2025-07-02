"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
function Card({id, image, title, description, category, time, published }) {
   const router = useRouter()
  return (
   
    <div className="h-full w-64 bg-secondary-foreground p-2 rounded-md border-2 border-secondary/15 shadow-md shadow-secondary/10 hover:shadow-secondary/20 transition-all duration-300  hover:scale-101">
      <div className="flex flex-col items-start gap-1">
        <Image
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-md"
          width={200}
          height={200}
        />
        <div className="flex flex-col items-center justify-center w-full"></div>
        <p className="text-base font-medium font-poppins">{title}</p>
        <span className="text-xs font-medium p-1 px-3 rounded-xl text-muted-foreground bg-muted-foreground/20 w-fit">
          {category}
        </span>
        <p className="text-sm font-normal font-roboto">{description}</p>
        {!published && (
          <div className="flex justify-start items-center gap-1 font-roboto text-sm text-blue-300">
            <Sparkles className="h-4 w-4"/> Groq AI
          </div>
        )}
        <p className="text-xs font-roboto text-muted ">{time}</p>
        <button className="p-2 px-4 rounded-sm bg-button font-roboto text-sm" onClick={()=>router.push(`/blog/${id}`)}>
          View full Post
        </button>
      </div>
    </div>
  );
}

export default Card;
