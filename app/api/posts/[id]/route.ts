import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();

    const postUpdatedData = await prisma.post.update({
      where: { id: Number(params.id) },
      data,
    });

    return NextResponse.json(postUpdatedData);
  } catch {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deletePost = await prisma.post.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deletePost);
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
