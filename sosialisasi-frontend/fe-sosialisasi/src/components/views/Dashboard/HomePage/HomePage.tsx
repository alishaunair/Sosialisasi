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
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <div className="mb-5 flex flex-row items-start gap-3">
                      <Image
                        src={
                          `http://localhost:3001${session?.user?.image}` ||
                          "/images/logo.png"
                        }
                        alt="Your avatar"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <textarea
                          placeholder="Write a comment..."
                          className="w-full resize-none rounded-lg border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={commentInputs[post._id] || ""}
                          onChange={(e) =>
                            handleInputChange(post._id, e.target.value)
                          }
                        />
                        <button
                          onClick={() => handleSendComment(post._id)}
                          disabled={
                            isSendingComment || !commentInputs[post._id]
                          }
                          className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                          {isSendingComment ? "Sending..." : "Send"}
                        </button>
                      </div>
                    </div>
                    <CommentSection postId={post._id} />
                  </div>
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
