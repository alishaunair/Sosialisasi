import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Image from "next/image";
import { IPost } from "@/types/Home";
import CommentSection from "@/components/views/Dashboard/HomePage/CommentSectionPage";
import useHomePage from "@/components/hooks/useHomePage";
import { useQuery } from "@tanstack/react-query";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    currentUserId,
    visibleComments,
    commentInputs,
    isSendingComment,
    handleToggleLike,
    handleToggleComments,
    handleInputChange,
    handleSendComment,
    handleShare,
  } = useHomePage();

  const {
    data: post,
    isLoading: loading,
    error,
  } = useQuery<IPost, Error>({
    queryKey: ["post", id],
    queryFn: async () => {
      const postId = Array.isArray(id) ? id[0] : id;
      if (!postId) throw new Error("Post ID is required");

      const res = await fetch(
        `http://localhost:3001/api/upload/content/${postId}`,
      );
      if (!res.ok)
        throw new Error(`Failed to fetch post. Status: ${res.status}`);

      const data = await res.json();
      if (!data.data) throw new Error("Post not found");
      return data.data as IPost;
    },
    enabled: !!id,
  });

  if (loading)
    return <p className="mt-10 text-center text-gray-500">Loading post...</p>;
  if (error)
    return <p className="mt-10 text-center text-red-500">{error.message}</p>;
  if (!post)
    return <p className="mt-10 text-center text-gray-500">Post not found</p>;

  const hasLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  const showComments = visibleComments[post._id] || false;

  return (
    <DashboardLayout showSearch={false}>
      <div className="mt-4 flex w-full max-w-7xl flex-col gap-4 px-2 sm:mt-6 sm:gap-6 sm:px-4">
        <article className="flex flex-col rounded-lg bg-white p-3 shadow-md sm:rounded-2xl sm:p-4 lg:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="w-full md:w-1/2 lg:w-3/5">
              <Image
                src={`http://localhost:3001${post.attachmentUrl_content}`}
                width={500}
                height={500}
                alt={post.userId?.fullName || "User Avatar"}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-row items-center gap-3 sm:gap-4">
                  <Image
                    src={`http://localhost:3001${post.userId.profilePicture}`}
                    width={100}
                    height={100}
                    alt={post.userId?.fullName || "User Avatar"}
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                  />
                  <div className="flex min-w-0 flex-col">
                    <h1 className="truncate text-base font-bold sm:text-lg lg:text-xl">
                      {post.userId.fullName}
                    </h1>
                    <h4 className="text-xs text-[#787878] sm:text-sm">
                      {new Date(post.created_at_content).toLocaleString(
                        "id-ID",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        },
                      )}
                    </h4>
                  </div>

                  <div
                    className={
                      post.type_content === "Competition"
                        ? "rounded-full bg-[#FFB27C]/10 px-8 py-1 sm:px-8 sm:py-1"
                        : post.type_content === "Project"
                          ? "rounded-full bg-[#16A34A]/10 px-8 py-1 sm:px-8 sm:py-1"
                          : "rounded-full bg-[#5568FE]/10 px-8 py-1 sm:px-8 sm:py-1"
                    }
                  >
                    <h5
                      className={
                        post.type_content === "Competition"
                          ? "text-xs font-medium text-[#FFB27C] sm:text-sm"
                          : post.type_content === "Project"
                            ? "text-xs font-medium text-[#16A34A] sm:text-sm"
                            : "text-xs font-medium text-[#5568FE] sm:text-sm"
                      }
                    >
                      {post.type_content || "Project"}
                    </h5>
                  </div>
                </div>

                <p className="max-h-48 overflow-y-auto text-sm break-words whitespace-pre-wrap text-gray-800 sm:max-h-64 sm:text-base lg:max-h-96 lg:text-lg">
                  {post.text_content}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-3 sm:gap-4">
                <div className="border-t border-gray-200"></div>

                <div className="flex items-center justify-between text-gray-600 sm:justify-start">
                  <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                    <button
                      onClick={() => handleToggleLike(post._id)}
                      className="flex items-center gap-1.5 transition-colors duration-200 hover:text-red-500 sm:gap-2"
                    >
                      <i
                        className={`fa-heart text-lg sm:text-xl ${hasLiked ? "fa-solid text-red-500" : "fa-regular"}`}
                      ></i>
                      <span className="text-xs font-medium sm:text-sm">
                        {post.likes.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleToggleComments(post._id)}
                      className="flex items-center gap-1.5 transition-colors duration-200 hover:text-blue-600 sm:gap-2"
                    >
                      <i className="fa-regular fa-comment text-lg sm:text-xl"></i>
                      <span className="text-xs font-medium sm:text-sm">
                        {post.comments.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleShare(post._id)}
                      className="flex items-center gap-1.5 transition-colors duration-200 hover:text-gray-900 sm:gap-2"
                    >
                      <i className="fa-solid fa-share text-lg sm:text-xl"></i>
                    </button>
                  </div>
                </div>

                <article className="flex w-full flex-col">
                  <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex-1 rounded-lg border-2 border-[#E5E7EB] bg-[#FAFAFF] px-3 sm:px-4">
                      <textarea
                        placeholder="Write a Comment"
                        className="mt-1 mb-1 w-full resize-none overflow-hidden bg-transparent text-sm focus:outline-none sm:text-base"
                        rows={1}
                        value={commentInputs[post._id] || ""}
                        onChange={(e) =>
                          handleInputChange(post._id, e.target.value)
                        }
                        onInput={(e) => {
                          e.currentTarget.style.height = "auto";
                          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                        }}
                      />
                    </div>

                    <button
                      onClick={() => handleSendComment(post._id)}
                      disabled={isSendingComment || !commentInputs[post._id]}
                      className="flex h-9 w-full flex-row items-center justify-center gap-2 rounded-lg bg-[#5568FE] text-white transition-colors hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400 sm:h-10 sm:w-auto sm:min-w-[90px]"
                    >
                      <i className="fas fa-paper-plane text-xs sm:text-sm"></i>
                      <h2 className="text-xs font-bold sm:text-sm">
                        {isSendingComment ? "Sending..." : "Send"}
                      </h2>
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {showComments && (
            <div className="mt-4 border-t border-gray-200 pt-4 sm:mt-6 sm:pt-6">
              <h1 className="mb-3 text-lg font-semibold text-[#111827] sm:mb-4 sm:text-xl">
                Komentar
              </h1>
              <CommentSection postId={post._id} />
            </div>
          )}
        </article>
      </div>
    </DashboardLayout>
  );
};

export default PostPage;
