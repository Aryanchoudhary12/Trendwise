import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import cloudinary from "@/lib/cloudinary";

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
    const imageFile = formData.get("image"); // <-- fix here

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

    const newPost = await prisma.post.create({
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

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
