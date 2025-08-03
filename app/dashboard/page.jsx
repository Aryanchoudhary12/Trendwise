import React from "react";
import Blogtable from "./component.jsx/blogtable";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import Commenttable from "./component.jsx/commenttable";
import { Inbox, MessageCircleCode } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { SiReactivex } from "react-icons/si";
import Image from "next/image";
async function Dashboard() {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const post = await prisma.post.findMany({
    where: {
      authorId: session?.user?.id ?? undefined,
    },
  });
  const comment = await prisma.comment.findMany({
    where: {
      authorId: session?.user?.id ?? undefined,
    },
    include: {
      author: true,
      post: true,
    },
  });
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id ?? undefined },
  });

  const postCount = await prisma.post.count({
    where: {
      authorId: session?.user?.id,
    },
  });
  const commentCount = await prisma.comment.count({
    where: {
      authorId: session?.user?.id,
    },
  });
  console.log(user);
  return (
    <div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4 flex flex-col justify-center items-start ">
            <h1 className="text-2xl font-poppins font-bold">
              Personal <span className="text-primary">Information</span>
            </h1>
            <div className="mt-4 flex justify-center items-center gap-4 w-full">
              <Image
                src={user.image || "/oops.jpg"}
                alt="userimage"
                width={400}
                height={400}
                className="h-36 w-36 object-cover rounded-full"
              ></Image>
              <div className="flex flex-col justify-center items-start gap-2 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex  items-center gap-2 font-semibold font-inter text-base ml-1">
                    <FaUser /> Username :
                  </div>
                  <div className="font-medium font-inter p-2 rounded-md bg-base-200 w-full border border-base-content/10 text-sm pl-6">
                    {user.name}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex  items-center gap-2 font-semibold font-inter text-base ml-1">
                    <MdEmail /> Email :
                  </div>
                  <div className="font-medium font-inter p-2 rounded-md bg-base-200 w-full border border-base-content/10 text-sm pl-6">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-poppins font-bold">
              Account <span className="text-primary">Details</span>
            </h1>
            <div className="flex flex-col justify-center items-start gap-2 w-full mt-4">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex  items-center gap-2 font-semibold font-inter text-base ml-1">
                  <HiCalendarDateRange /> Created At :
                </div>
                <div className="font-medium font-inter p-2 rounded-md bg-base-200 w-full border border-base-content/10 text-sm pl-6">
                  {new Date(user.createdAt).toDateString()}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex  items-center gap-2 font-semibold font-inter text-base ml-1">
                  <SiReactivex /> Status :
                </div>
                <div className="font-medium font-inter p-2 rounded-md bg-base-200 w-full border border-base-content/10 text-sm pl-6 text-success">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4 p-2">
          <div className="flex justify-center items-center gap-2 p-3 bg-secondary-foreground rounded-md border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]">
            <Inbox className="h-8 w-8 stroke-secondary stroke-1" />
            <div className="flex flex-col gap-1">
              <p className="font-poppins font-medium">Posts</p>
              <p className="text-lg font-bold -mt-2 font-poppins">
                {postCount}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 p-3 bg-secondary-foreground rounded-md border border-[rgba(255,255,255,0.10)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]">
            <MessageCircleCode className="h-8 w-8 stroke-secondary stroke-1" />
            <div className="flex  flex-col gap-1">
              <p className="font-poppins font-medium ">Comments</p>
              <p className="text-lg font-bold -mt-2 font-poppins">
                {commentCount}
              </p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex justify-start items-center gap-2 mt-4">
            <Inbox className=" h-7 w-7 rounded-md stroke-secondary stroke-1"></Inbox>
            <h1 className=" text-2xl font-poppins font-semibold">Posts.</h1>
          </div>
          <p className="mt-2 font-poppins text-sm text-gray-300">
            Browse all posts created by you including articles, updates, and
            more.
          </p>
        </div>
        <Blogtable posts={post} />
        <div className="flex justify-start items-center gap-1 p-2 my-2">
          <MessageCircleCode className=" h-7 w-7 rounded-md stroke-secondary stroke-1" />
          <h1 className=" text-2xl font-poppins font-semibold">Comments .</h1>
        </div>
        <p className="mb-2 font-poppins text-sm text-gray-300 px-2">
          Browse all your comments various posts.
        </p>
        <Commenttable comments={comment} />
      </div>
    </div>
  );
}

export default Dashboard;
