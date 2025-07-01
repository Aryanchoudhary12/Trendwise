import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
const prisma = new PrismaClient();

export async function DELETE(_, context) {
  const session = await getServerSession(authOptions);
  try {
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params;
    const parseid = parseInt(id, 10);
    if (isNaN(parseid)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    await prisma.comment.delete({
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
