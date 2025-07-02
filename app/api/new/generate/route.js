import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
import cloudinary from "@/lib/cloudinary.js";

const prisma = new PrismaClient();

export async function POST(req) {
  const { title, category } = await req.json();
  const session = await getServerSession(authOptions);

  if (!title || !category) {
    return NextResponse.json({ error: "Title and category required" }, { status: 400 });
  }

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "user",
            content: `Write a high-quality blog post titled "${title}". Include an introduction, 2-3 informative paragraphs, and a conclusion.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = groqRes.data.choices[0].message.content;
    let imageUrl = "/oops.jpg";

    try {
      const hfRes = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        {
          inputs: `Illustration for blog titled "${title}"`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          },
          responseType: "arraybuffer",
        }
      );

      const buffer = Buffer.from(hfRes.data);

      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "trendwise-ai",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      imageUrl = uploadRes.secure_url;
    } catch (imgErr) {
      console.warn("Image generation or upload failed:", imgErr.message);
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        image: imageUrl,
        published: false,
        author: { connect: { id: session.user.id } },
        category:category
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error("Blog generation failed:", err.message);
    return NextResponse.json({ error: "Blog generation failed" }, { status: 500 });
  }
}
