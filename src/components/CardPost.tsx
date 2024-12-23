import ButtonVote from "./ButtonVote";

const CardPost = ({
  post,
}: {
  post: {
    _id: string;
    title: string;
    description: string;
    status: string;
    boardId: string;
    userId?: string;
    votesCounter: number;
  };
}) => {
  console.log(post);
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-center w-full ">
      <div className="flex flex-col gap-1">
        <div className="flex gap-3 items-center">
          <h3 className="font-bold">{post.title}</h3>
          {post.status === "IN_PROGRESS" && (
            <div className="flex gap-1.5 items-center">
              <span className="uppercase text-xs text-yellow-500 font-semibold tracking-wide">
                In progress
              </span>
              <span className="relative w-2 h-2">
                <span className="absolute w-full h-full bg-yellow-500 opacity-65 rounded-full animate-ping"></span>
                <span className="absolute w-2 h-2 bg-yellow-500 rounded-full"></span>
              </span>
            </div>
          )}
        </div>
        <p className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.description}
        </p>
      </div>
      <ButtonVote
        postId={post._id}
        initialVotesCounter={post.votesCounter ?? 0}
      />
    </li>
  );
};

export default CardPost;
