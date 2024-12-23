import { auth } from "@/auth";
import Board from "@/models/Board";
import Post from "@/models/Post";
import User from "@/models/User";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { boardId: string; postId: string } }
) {
  const { boardId, postId } = params;
  // Validate request body
  if (!req.body) {
    return { status: 400, json: { error: "No body provided" } };
  }
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You are not authorized to update the post" },
      { status: 401 }
    );
  }
  // Get the board
  const board = Board.findOne({ _id: boardId, userId: session.user.id });
  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }
  const { status } = await req.json();
  const updates: any = {};
  if (status) {
    if (!["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided" },
        { status: 400 }
      );
    }
    updates["status"] = status;
  }
  try {
    // Update the post
    const post = await Post.findOneAndUpdate({ _id: postId }, updates);
    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string; postId: string } }
) {
  const { boardId, postId } = params;
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You are not authorized to delete the post" },
      { status: 401 }
    );
  }
  const user = await User.findOne({ _id: session.user.id });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const post = await Post.findById(postId);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const boards = user.boards.map((board: ObjectId) => board.toString());
  if (!boards.includes(boardId)) {
    return NextResponse.json(
      { error: "User does not have access to this board" },
      { status: 401 }
    );
  }
  try {
    // Delete the post
    await Post.deleteOne({
      _id: postId,
    });
    return NextResponse.json({}, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
