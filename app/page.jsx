import { CornerDownRight } from "lucide-react";
import Image from "next/image";
import community from "@/public/peoples.png";
import { PrismaClient } from "@/lib/generated/prisma";
import PostsListClient from "./Postlist";
const prisma = new PrismaClient();
export default async function Home() {
  const post = await prisma.post.findMany({
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
  const users = await prisma.user.findMany();
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
        <div className="flex flex-col justify-center items-center md:items-start p-4">
          <p className="text-lg font-bold font-roboto">
            Stay Ahead of the Curve with AI-Powered Insights with
          </p>
          <p className="text-6xl  font-extrabold -mt-2 ">
            TREND
            <span className="text-muted ">WISE</span>
          </p>
          <p className="text-base font-roboto font-medium mt-4 border-l-3 border-muted p-2 pl-4 w-5/6">
            Stay ahead with the latest stories, viral trends, and insightful
            blogs — all powered by artificial intelligence. Our smart engine
            scans thousands of sources to bring you real-time, personalized
            content that matters.
          </p>
          <button className="flex gap-1 p-2 rounded-full bg-button font-roboto w-32 justify-center items-center mt-4">
            <CornerDownRight className="h-5 w-5" />
            Explore now
          </button>
        </div>
        <div className="flex h-fit justify-center relative p-4">
          <div className="absolute bg-secondary/40 h-full w-6/12 -z-10 rounded-full animate-pulse"></div>
          <Image
            src={community}
            alt="peoples"
            className="w-10/12 "
            property=""
          ></Image>
        </div>
      </div>

      <PostsListClient posts={post} users={users} />
    </div>
  );
}
