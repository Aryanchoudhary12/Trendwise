import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const category = formData.get("category")?.toString();
    const description = formData.get("description")?.toString();
    const base64Image = formData.get("image")?.toString(); 

    if (!title || !category || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content: description,
        image:base64Image, 
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

    return NextResponse.json(newPost,{message:"Post added Successfully"}, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
