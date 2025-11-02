import { useQuery } from "@tanstack/react-query";
import contentServices from "@/services/content.service";
import Image from "next/image";
import { IComment } from "@/types/Home";

interface IPropTypes {
  postId: string;
}

const CommentSection = ({ postId }: IPropTypes) => {
  const { data: comments = [], isLoading } = useQuery<IComment[]>({
    queryKey: ["comments", postId],
    queryFn: () => contentServices.getCommentsByPostId(postId),
  });

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading comments...</p>;
  }

  if (comments.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <div key={comment._id} className="flex flex-row gap-4">
          <Image
            src={
              `http://localhost:3001${comment.id_user?.profilePicture}` ||
              "/images/logo.png"
            }
            alt={comment.id_user?.fullName || "User"}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-black object-cover"
          />
          <div className="flex flex-col items-start rounded-lg bg-gray-100 px-4 py-2">
            <div className="flex items-center gap-x-2">
              <h3 className="text-sm font-semibold text-gray-900">
                {comment.id_user?.fullName || "Unknown User"}
              </h3>
              <span className="text-xs text-gray-500">
                •{" "}
                {new Date(comment.created_at_comment).toLocaleDateString(
                  "id-ID",
                  { day: "numeric", month: "short" },
                )}
              </span>
            </div>
            <p className="text-sm text-gray-800">{comment.text_comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
