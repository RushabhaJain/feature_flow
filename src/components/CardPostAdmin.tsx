import { useRouter } from "next/navigation";
import ButtonDeletePost from "./ButtonDeletePost";
import SelectPostState from "./SelectPostState";

const CardPostAdmin = ({
  post,
  boardId,
}: {
  post: {
    _id: string;
    title: string;
    description: string;
    status: string;
    boardId: string;
    userId?: string;
  };
  boardId: string;
}) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-start w-full ">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1.5 items-center">
          <h3 className="font-bold">{post.title}</h3>
        </div>
        <p className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.description}
        </p>
      </div>
      <div className="flex flex-col gap-1 items-start shrink-0">
        <SelectPostState
          boardId={boardId}
          postId={post._id}
          status={post.status}
        />
        <ButtonDeletePost boardId={boardId} postId={post._id} />
      </div>
    </li>
  );
};

export default CardPostAdmin;
