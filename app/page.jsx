import Image from "next/image";
import community from "@/public/peoples.png";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import PostsListClient from "./Postlist";
import Link from "next/link";
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
      <img
        src="/gradient.jpg"
        alt=""
        className="relative h-[40rem] lg:h-[32rem] w-full object-cover"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5  place-items-center absolute top-0 p-4 gap-4 bg-gradient-to-b from-background/10 via-background/40 to-background h-[40rem] lg:h-[32rem] w-full">
        <div className="flex flex-col justify-center items-center lg:items-start p-4 col-span-3 w-full">
          <span className="flex justify-center items-center gap-1  font-bold font-poppins py-2 text-4xl lg:text-5xl text-center lg:text-left uppercase w-md xl:w-xl">
            AI-Powered Insights with TRENDWISE
          </span>

          <p className="text-sm font-poppins font-normal mt-2 text-center lg:text-left w-sm lg:w-md text-primary ">
            Stay ahead with the latest stories, viral trends, and insightful
            blogs — all powered by artificial intelligence.
          </p>
          <div className="flex justify-center items-center gap-6 mt-6">
            {session ? (
              <Link href="/dashboard">
                <button className="flex gap-1 p-2.5 rounded-2xl backdrop-blur-lg border border-[rgba(255,255,255,0.20)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] w-40 justify-center items-center  text-sm">
                  Explore now
                </button>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <button className="flex gap-1 p-2.5 rounded-2xl backdrop-blur-lg border border-[rgba(255,255,255,0.20)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] w-40 justify-center items-center  text-sm font-poppins text-white">
                  Explore now
                </button>
              </Link>
            )}
            <Link href="/new">
              <button className="flex justify-center gap-1 p-2.5 rounded-2xl text-sm font-poppins font-medium bg-muted w-40 text-background ">
                Create Post
              </button>
            </Link>
          </div>
        </div>
        <Image
          src={community}
          alt="peoples"
          className="w-[300px] xl:w-[400px] col-span-2"
          property=""
        ></Image>
      </div>

      <PostsListClient posts={post} users={users} />
    </div>
  );
}
