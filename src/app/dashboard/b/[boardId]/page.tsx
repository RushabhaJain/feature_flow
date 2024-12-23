import { auth } from "@/auth";
import ButtonDeleteBoard from "@/components/ButtonDeleteBoard";
import CardPostAdmin from "@/components/CardPostAdmin";
import CopyBoardLink from "@/components/CopyBoardLink";
import { connectToMongo } from "@/lib/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(boardId: string) {
  const session = await auth();
  await connectToMongo();
  // We have added logic to verify user in the layout.tsx file, that will redirect user to home page
  const board = await Board.findOne({
    _id: boardId,
    userId: session?.user?.id,
  });
  if (!board) {
    redirect("/");
  }
  const posts = await Post.find({ boardId }).sort({ votesCounter: -1 });

  return {
    board,
    posts: posts.map((post) => {
      return {
        _id: post._id.toString(),
        title: post.title,
        description: post.description,
        status: post.status,
        boardId: post.boardId.toString(),
        userId: post.userId.toString(),
      };
    }),
  };
}

export default async function Page({
  params,
}: {
  params: { boardId: string };
}) {
  const { boardId } = params;
  const { board, posts } = await getData(boardId);

  return (
    <main className="bg-base-200 min-h-screen">
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-5 py-3 ">
          <Link href="/dashboard" className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            Back
          </Link>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-5 py-12 space-y-12 flex gap-12">
        <div className="w-full md:sticky top-6 md:w-96 shrink-0 flex flex-col gap-12 items-start">
          <h1 className="font-extrabold text-xl mb-4">{board.name}</h1>
          <CopyBoardLink boardId={boardId} />
          <ButtonDeleteBoard boardId={boardId} />
        </div>
        <ul className="flex-grow w-full space-y-8">
          {posts.map(
            (post: {
              _id: string;
              title: string;
              description: string;
              status: string;
              boardId: string;
              userId?: string;
            }) => {
              return (
                <CardPostAdmin
                  key={post._id.toString()}
                  post={post}
                  boardId={boardId}
                />
              );
            }
          )}
        </ul>
      </section>
    </main>
  );
}
