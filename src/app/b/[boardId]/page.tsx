import CardPost from "@/components/CardPost";
import FormAddPost from "@/components/FormAddPost";
import { connectToMongo } from "@/lib/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import { redirect } from "next/navigation";

async function getData(boardId: string) {
  await connectToMongo();
  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId }).sort({ votesCounter: -1 });
  if (!board) {
    redirect("/");
  }
  return {
    board,
    posts: posts.map((post) => {
      return {
        ...post._doc,
        _id: post._id.toString(),
        votesCounter: post.votesCounter ?? 0,
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
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">{board.name}</h1>
      </section>
      <section className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row gap-12 pb-12 items-start top-6">
        <FormAddPost boardId={boardId} />
        <ul className="flex-grow w-full space-y-8">
          {posts.map(
            (post: {
              _id: string;
              title: string;
              description: string;
              status: string;
              boardId: string;
              userId?: string;
              votesCounter: number;
            }) => {
              return <CardPost key={post._id} post={post} />;
            }
          )}
        </ul>
      </section>
    </main>
  );
}
