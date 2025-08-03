import Image from "next/image";
import community from "@/public/peoples.png";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import PostsListClient from "./Postlist";
import Link from "next/link";
import { Sparkles } from "lucide-react";
const prisma = new PrismaClient();
export default async function Home() {
  const session = await getServerSession(authOptions);
  const post = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  const users = await prisma.user.findMany();
  return (
    <div className="relative">
      <img src="/gradient.jpg" alt="" className="relative h-[40rem] sm:h-[32rem] w-full object-cover"/>

      <div className="grid grid-cols-1 sm:grid-cols-2  place-items-center absolute top-0 p-4 gap-4 bg-black/20 h-[40rem] sm:h-[32rem]">
        <div className="flex flex-col justify-center items-center sm:items-start p-4">
          <span className="flex justify-center items-center gap-1  font-bold font-goldman py-2 text-3xl md:text-4xl lg:text-5xl text-center sm:text-left">
            AI-Powered Insights with TRENDWISE
          </span>
          
          <p className="text-sm font-poppins font-normal mt-2 text-center sm:text-left w-5/6   text-gray-300 ">
            Stay ahead with the latest stories, viral trends, and insightful
            blogs — all powered by artificial intelligence.
          </p>
          {session ? (
            <Link href="/dashboard">
              <button className="flex gap-1 p-3 rounded-full backdrop-blur-lg border border-slate-200/50 bg-gradient-to-br from-white/20 via-transparent to-white/20 w-40 justify-center items-center mt-4 text-sm">
                Explore now
              </button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <button className="flex gap-1 p-3 rounded-full backdrop-blur-lg border border-slate-200/50 bg-gradient-to-br from-white/20 via-transparent to-white/20 w-40 justify-center items-center mt-4 text-sm font-poppins text-white">
                Explore now
              </button>
            </Link>
          )}
        </div>
        <Image
          src={community}
          alt="peoples"
          className="w-[300px] lg:w-[400px] "
          property=""
        ></Image>
      </div>

      <PostsListClient posts={post} users={users} />
    </div>
  );
}
