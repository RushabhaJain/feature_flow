import { connectToMongo } from "@/lib/mongoose";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { searchParams } = req.nextUrl;
  const postId: string = searchParams.get("postId");
  try {
    await connectToMongo();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    post.votesCounter += 1;
    await post.save();
    return NextResponse.json({}, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: any) {
  const { searchParams } = req.nextUrl;
  const postId: string = searchParams.get("postId");
  try {
    await connectToMongo();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    post.votesCounter -= 1;
    await post.save();
    return NextResponse.json({}, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
