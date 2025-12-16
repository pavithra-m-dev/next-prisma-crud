import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  console.log("UPDATE function called with id:", params.id);
  try {
   const data = await request.json(); 
   console.log("Yesss it's comes inside try block");
   const postUpdatedData = await prisma.post.update({
    where: { id: Number(params.id)},
    data,
    });
    console.log("Updated post data:", postUpdatedData);
    return NextResponse.json(postUpdatedData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  console.log("DELETE function called with id:", params.id);
  try {
    const deletePost  = await prisma.post.delete({
    where: { id: Number(params.id)},
    })
    console.log("Deleted post data:", deletePost);
    return NextResponse.json(deletePost);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
