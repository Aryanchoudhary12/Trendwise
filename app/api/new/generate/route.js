import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";
const prisma = new PrismaClient();

export async function POST(req) {
  const { title, category } = await req.json();
  console.log("title", typeof title, "category :", category);

  const session = await getServerSession(authOptions);

  if (!title || !category) {
    return NextResponse.json(
      { error: "Title and category required" },
      { status: 400 }
    );
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

    let base64Image = "";
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

      base64Image = hfRes.data
        ? `data:image/png;base64,${Buffer.from(hfRes.data).toString("base64")}`
        : "/oops.jpg";
    } catch (imgErr) {
      console.warn("Image generation failed:", imgErr.message);
      base64Image = "/oops.jpg"
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        image: base64Image,
        published: false,
        author: {
          connect: { id: session.user.id },
        },
        categories: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    if (err.response) {
      console.error("Groq API Error:", err.response.data);
    } else {
      console.error("Unexpected Error:", err.message);
    }
    return NextResponse.json(
      { error: "Blog generation failed" },
      { status: 500 }
    );
  }
}
