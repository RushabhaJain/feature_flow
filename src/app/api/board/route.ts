import Board from "@/models/Board";
import User from "@/models/User";
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
    // TODO:: Check if the user is authenticated
    // TODO:: Connect to mongo
    // TODO:: Get the current user by id
    const user = await User.findById("");
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
