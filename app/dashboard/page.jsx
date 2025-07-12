import React from "react";
import Blogtable from "./component.jsx/blogtable";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import Commenttable from "./component.jsx/commenttable";
import { Inbox, MessageCircleCode } from "lucide-react";
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

  return (
    <div>
      <div className="p-4">
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
            <Inbox className=" h-8 w-8 rounded-md stroke-secondary"></Inbox>
              <h1 className=" text-3xl font-poppins font-black">Posts.</h1>
          </div>
        </div>
        <Blogtable posts={post} />
        <div className="flex justify-start items-center gap-1 p-2">
          <MessageCircleCode className=" h-10 w-10 rounded-md stroke-secondary" />
          <h1 className=" text-3xl font-poppins font-black">Comments.</h1>
        </div>
        <Commenttable comments={comment} />
      </div>
    </div>
  );
}

export default Dashboard;
