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
    return <p className="text-sm text-gray-500">Belum ada komentar.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <div key={comment._id} className="mt-3 flex flex-row gap-4">
          <Image
            src={
              comment.id_user?.profilePicture
                ? `http://localhost:3001${comment.id_user.profilePicture}`
                : "/images/logo.png"
            }
            alt={comment.id_user?.fullName || "User"}
            width={48}
            height={48}
            className="h-12 w-12 rounded-lg bg-black object-cover"
          />
          <div className="-mt-1 flex flex-col">
            <div className="flex flex-wrap items-center gap-x-2">
              <h3 className="text-base font-semibold text-[#202020] sm:text-lg">
                {comment.id_user?.fullName || "Unknown User"}
              </h3>
              <h4 className="text-xs text-[#787878] sm:text-sm">
                {new Date(comment.created_at_comment).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </h4>
            </div>
            <p className="text-sm whitespace-pre-wrap text-[#202020]">
              {comment.text_comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
