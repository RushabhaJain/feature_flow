import { auth } from "@/auth";
import { connectToMongo } from "@/lib/mongoose";
import Board from "@/models/Board";
import User from "@/models/User";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json(
        {
          error: "Board name is required!",
        },
        {
          status: 400,
        }
      );
    }

    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        {
          error: "Not authorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectToMongo();
    // TODO:: Check if the user is authenticated
    // TODO:: Connect to mongo
    // TODO:: Get the current user by id
    const user = await User.findById(session.user.id);
    const board = await Board.create({
      name: body.name,
      userId: user._id,
    });
    user.boards.push(board._id);
    await user.save();
    return NextResponse.json({});
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  if (!boardId) {
    return NextResponse.json(
      {
        error: "Please provide boardId",
      },
      {
        status: 400,
      }
    );
  }
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const user = await User.findById(session.user?.id);

    await Board.deleteOne({
      _id: boardId,
      userId: session?.user?.id,
    });
    user.boards = user.boards.filter(
      (board: ObjectId) => board.toString() !== boardId
    );
    await user.save();
    return NextResponse.json({});
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
