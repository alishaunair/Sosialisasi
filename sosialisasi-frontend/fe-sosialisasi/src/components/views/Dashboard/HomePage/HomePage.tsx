import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "./useHomePage";
import Image from "next/image";
import CommentSection from "./CommentSection";

const HomePage = () => {
  const {
    posts,
    isLoadingPosts,
    currentUserId,
    visibleComments,
    commentInputs,
    isSendingComment,
    session,
    handleToggleLike,
    handleToggleComments,
    handleInputChange,
    handleSendComment,
    handleShare,
  } = useHomePage();

  if (isLoadingPosts) {
    return (
      <DashboardLayout>
        <p className="pt-8 text-center text-gray-500">Loading posts...</p>
      </DashboardLayout>
    );
  }

  if (posts.length === 0) {
    return (
      <DashboardLayout>
        <p className="pt-8 text-center text-gray-500">No posts yet.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout showSearch>
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex w-full flex-col gap-6">
          {posts.map((post) => {
            const hasLiked = currentUserId
              ? post.likes.includes(currentUserId)
              : false;
            const showComments = visibleComments[post._id] || false;

            return (
              <div
                key={post._id}
                className="flex w-full flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6"
              >
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={`http://localhost:3001${post.userId.profilePicture}`}
                    alt="Profile Picture"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900">
                      {post.userId.fullName || "Unknown User"}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(post.created_at_content).toLocaleString(
                        "id-ID",
                        { dateStyle: "medium", timeStyle: "short" },
                      )}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm whitespace-pre-wrap text-gray-800">
                    {post.text_content}
                  </p>
                  {post.attachmentUrl_content && (
                    <div className="relative mt-3 aspect-video w-full">
                      <Image
                        src={`http://localhost:3001${post.attachmentUrl_content}`}
                        alt="Attachment"
                        layout="fill"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="my-4 border-t border-gray-100"></div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleToggleLike(post._id)}
                      className="flex items-center gap-2 transition-colors duration-200 hover:text-red-500"
                    >
                      <i
                        className={`fa-heart text-xl ${hasLiked ? "fa-solid text-red-500" : "fa-regular"}`}
                      ></i>
                      <span className="text-sm font-medium">
                        {post.likes.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleToggleComments(post._id)}
                      className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-600"
                    >
                      <i className="fa-regular fa-comment text-xl"></i>
                      <span className="text-sm font-medium">
                        {post.comments.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleShare(post._id)}
                      className="flex items-center gap-2 transition-colors duration-200 hover:text-gray-900"
                    >
                      <i className="fa-solid fa-share text-xl"></i>
                    </button>
                  </div>
                  {post.type_content !== "All" && (
                    <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                      Apply Now
                    </button>
                  )}
                </div>

                {showComments && (
                  <article className="flex w-full flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                    <div className="mb-5 flex flex-row items-center gap-4">
                      {/* <Image
                        src={
                          `http://localhost:3001${session?.user?.image}` ||
                          "/images/logo.png"
                        }
                        alt={session?.user?.fullName || "Your avatar"}
                        width={48}
                        height={48}
                        className="-mt-2 h-12 w-12 rounded-lg bg-black object-cover"
                      /> */}

                      <div className="h-auto w-full rounded-lg border-2 border-[#E5E7EB] bg-[#FAFAFF] px-4">
                        <textarea
                          placeholder="Write a Comment"
                          className="mt-1 mb-1 w-full resize-none overflow-hidden focus:outline-none"
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
                        className="flex h-10 w-auto min-w-[90px] flex-row items-center justify-center gap-2 rounded-lg bg-[#5568FE] text-white hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        <i className="fas fa-paper-plane text-sm"></i>
                        <h2 className="text-sm font-bold">
                          {isSendingComment ? "Sending..." : "Send"}
                        </h2>
                      </button>
                    </div>

                    <h1 className="mb-4 text-[20px] font-semibold text-[#111827]">
                      Komentar
                    </h1>

                    <CommentSection postId={post._id} />
                  </article>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
