import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import cloudinary from "@/lib/cloudinary";
const prisma = new PrismaClient();

export async function GET(_, context) {
  const { id } = await context.params;
  const parseid = parseInt(id, 10);
  if (isNaN(parseid)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parseid,
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
    const { id } = await context.params;
    const parseid = parseInt(id, 10);
    if (isNaN(parseid)) {
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
          connect: { id: parseid },
        },
        author: {
          connect: { id: authorId },
        },
      },
    });
    return NextResponse.json(
      newComment,
      { message: "Successfully poasted" },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    const parseid = parseInt(id, 10);
    if (isNaN(parseid)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    await prisma.post.delete({
      where: {
        id: parseid,
      },
    });
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Something went wrong", error);
    return NextResponse.json(
      { error: "An internal error occur." },
      { status: 500 }
    );
  }
}

export async function PATCH(req, context) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const parseid = parseInt(id, 10);
    if (isNaN(parseid)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const category = formData.get("category")?.toString();
    const description = formData.get("description")?.toString();
    const imageFile = formData.get("image");

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    let imageUrl = "/oops.jpg";

    if (imageFile && typeof imageFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      try {
        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: "image" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        imageUrl = uploaded.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed:", err.message);
      }
    }

    const newPost = await prisma.post.update({
      where: { id: parseid },
      data: {
        title,
        content: description,
        image: imageUrl,
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

    return NextResponse.json(
      newPost,
      { message: "Post edited Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
