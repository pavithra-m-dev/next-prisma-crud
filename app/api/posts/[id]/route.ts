import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH( request: Request, { params }: Context) {
  try {

    const { id } = await params;
    const data = await request.json();

    const postUpdatedData = await prisma.post.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(postUpdatedData);
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE( request: Request,{ params }: Context) {
  try {
    const { id } = await params;
    const deletePost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletePost);
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
