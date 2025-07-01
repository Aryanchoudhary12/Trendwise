import React from "react";
import Blogtable from "./component.jsx/blogtable";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import Commenttable from "./component.jsx/commenttable";
import { Inbox,MessageCircleCode } from "lucide-react";
const prisma = new PrismaClient();
async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.id);
  const post = await prisma.post.findMany({
    where: {
      authorId: session?.user?.id,
    },
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });
  const comment = await prisma.comment.findMany({
    where: {
      authorId: session?.user?.id,
    },
    include: {
      author: true,
      post:true,
    },
  });
  const postCount = await prisma.post.count({
    where: {
      authorId: session?.user?.id,
    }
  });
  const commentCount = await prisma.comment.count({
    where: {
      authorId: session?.user?.id,
    }
  });
  console.log(comment);
  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-start gap-4 p-2">
            <div className="flex justify-center items-center gap-2 p-3 bg-primary/50 border-2 border-primary rounded-md">
              <Inbox className="h-8 w-8 stroke-muted"/>
              <div>
                <p className="font-roboto font-semibold">Posts</p>
                <p className="text-lg font-bold -mt-2">{postCount}</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 p-3 bg-primary/50 border-2 border-primary rounded-md">
              <MessageCircleCode className="h-8 w-8 stroke-muted"/>
              <div>
                <p className="font-roboto font-semibold">Comments</p>
                <p className="text-lg font-bold -mt-2">{commentCount}</p>
              </div>
            </div>
        </div>
        <div className="p-2">
          <h1 className="text-2xl font-bold font-roboto">Blogs</h1>
          <hr className="border-2 w-12 border-primary rounded-md" />
        </div>
        <Blogtable posts={post} />
        <div className="p-2">
          <h1 className="text-2xl font-bold font-roboto">Comments</h1>
          <hr className="border-2 w-28 border-primary rounded-md" />
        </div>
        <Commenttable comments={comment}/>
      </div>
    </div>
  );
}

export default Dashboard;
