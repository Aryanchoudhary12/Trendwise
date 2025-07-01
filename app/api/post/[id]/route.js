import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
const prisma = new PrismaClient();

export async function GET(_, context) {
  const { params } = context;
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      categories: true,
      comments: {
        include: { author: true },
      },
    },
  });
  return NextResponse.json(post);
}

export async function POST(req, context) {
  try {
    const { params } = context;
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    const formData = await req.formData();
    const content = formData.get("content")?.toString();
    const authorId = formData.get("authorId").toString();
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        content: content,
        post: {
          connect: { id },
        },
        author: {
          connect: { id: authorId },
        },
      },
    });
    return NextResponse.json(newComment,{message:"Successfully poasted"},{ status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(_,context) {
  try {
    const { params } = context;
    const id = parseInt(params?.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    await prisma.post.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Something went wrong", error);
    return NextResponse.json({error:"An internal error occur."},{status:500})
  }
}

export async function PATCH(req,context) {
  try {
    const { params } = context;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = parseInt(params?.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const category = formData.get("category")?.toString();
    const description = formData.get("description")?.toString();
    const base64Image = formData.get("image")?.toString();

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        content: description,
        image: base64Image,
        published: true,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        categories: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      },
    });

    return NextResponse.json(newPost,{message:"Post edited Successfully"},{ status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
