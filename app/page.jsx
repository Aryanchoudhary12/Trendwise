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
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
        <div className="flex flex-col justify-center items-center md:items-start p-4">
          <span className="flex gap-1 pl-1 font-bold font-roboto py-2 text-lg">
            <Sparkles className="stroke-blue-300 " /> AI-Powered Insights with
          </span>
          <p className="text-6xl font-extrabold -mt-2 ">
            TREND
            <span className="text-muted ">WISE</span>
          </p>
          <p className="text-base font-roboto font-medium mt-4 border-l-3 border-muted p-2 pl-4 w-5/6">
            Stay ahead with the latest stories, viral trends, and insightful
            blogs — all powered by artificial intelligence. Our smart engine
            scans thousands of sources to bring you real-time, personalized
            content that matters.
          </p>
          {session ? (
            <Link href="/dashboard">
              <button className="flex gap-1 p-3 rounded-full  bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 font-poppins w-40 justify-center items-center mt-4 text-sm">
                Explore now
              </button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <button className="flex gap-1 p-3 rounded-full  bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 font-poppins w-40 justify-center items-center mt-4 text-sm">
                Explore now
              </button>
            </Link>
          )}
        </div>
        <Image
          src={community}
          alt="peoples"
          className="w-10/12 "
          property=""
        ></Image>
      </div>

      <PostsListClient posts={post} users={users} />
    </div>
  );
}
