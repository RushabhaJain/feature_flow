import { auth } from "@/auth";
import { connectToMongo } from "@/lib/mongoose";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";
import { Filter as BadWordsFilter } from "bad-words";
import Board from "@/models/Board";

export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  // Validate request body
  if (!req.body) {
    return NextResponse.json({ error: "No body provided" }, { status: 400 });
  }
  const { title, description } = await req.json();
  if (!title.trim() || !description.trim()) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }

  const session = await auth();

  const badWordFilter = new BadWordsFilter();
  const sanitizedTitle = badWordFilter.clean(title);
  const sanitizedDescription = badWordFilter.clean(description);

  try {
    await connectToMongo();
    const board = await Board.findById(boardId);
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    // Create a new post
    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
