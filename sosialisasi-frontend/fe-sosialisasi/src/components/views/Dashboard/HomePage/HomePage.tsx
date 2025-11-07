import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "../../../hooks/useHomePage";
import Image from "next/image";
import CommentSection from "./CommentSectionPage";

const HomePage = () => {
  const {
    posts,
    users,
    isSearching,
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
      <DashboardLayout showSearch>
        <p className="pt-8 text-center text-gray-500">
          {isSearching ? "Mencari..." : "Menunggu posts..."}
        </p>
      </DashboardLayout>
    );
  }

  if (posts.length === 0 && (!isSearching || (users && users.length === 0))) {
    return (
      <DashboardLayout showSearch>
        <p className="pt-8 text-center text-gray-500">
          {isSearching ? "Tidak ada hasil ditemukan." : "Belum Ada Postingan."}
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout showSearch>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-2 sm:gap-6 sm:px-4 lg:flex-row lg:gap-8">
        <div className="flex w-full flex-col gap-4 sm:gap-6 lg:max-w-5xl">
          {isSearching && users && users.length > 0 && (
            <div className="flex w-full flex-col rounded-lg bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 lg:p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">People</h2>
              <div className="flex flex-col gap-4">
                {users.map((user: any) => (
                  <div
                    key={user._id}
                    className="flex flex-row items-center gap-3 sm:gap-4"
                  >
                    <Image
                      src={`http://localhost:3001${user.profilePicture}`}
                      alt={user.fullName}
                      width={48}
                      height={48}
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
                    />
                    <div className="flex min-w-0 flex-col">
                      <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                        {user.fullName}
                      </h3>
                      <span className="truncate text-xs text-gray-500 sm:text-sm">
                        {user.status} di {user.universitas}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isSearching && posts.length > 0 && (
            <h2 className="mt-2 text-xl font-bold text-gray-900">Posts</h2>
          )}

          {posts.map((post) => {
            const hasLiked = currentUserId
              ? post.likes.includes(currentUserId)
              : false;
            const showComments = visibleComments[post._id] || false;

            return (
              <div
                key={post._id}
                className="flex w-full flex-col rounded-lg bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 lg:p-6"
              >
                <div className="flex flex-row items-center gap-3 sm:gap-4">
                  <Image
                    src={`http://localhost:3001${post.userId.profilePicture}`}
                    alt="Profile Picture"
                    width={48}
                    height={48}
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                  />
                  <div className="flex min-w-0 flex-col">
                    <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg lg:text-xl">
                      {post.userId.fullName || "Unknown User"}
                    </h3>
                    <span className="text-xs text-gray-500 sm:text-sm">
                      {new Date(post.created_at_content).toLocaleString(
                        "id-ID",
                        { dateStyle: "medium", timeStyle: "short" },
                      )}
                    </span>
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

                <div className="mt-3 sm:mt-4">
                  <p className="text-sm break-words whitespace-pre-wrap text-gray-800 sm:text-base lg:text-lg">
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

                <div className="my-3 border-t border-gray-100 sm:my-4"></div>

                <div className="flex flex-col items-start justify-between gap-3 text-gray-600 sm:flex-row sm:items-center sm:gap-0">
                  <div className="flex items-center gap-4 sm:gap-6">
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
                  {post.type_content !== "All" && (
                    <button className="w-full rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto sm:px-4 sm:py-2 sm:text-sm">
                      Apply Now
                    </button>
                  )}
                </div>

                {showComments && (
                  <article className="mt-4 flex w-full flex-col sm:mt-6 lg:mt-7">
                    <div className="mb-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3 lg:gap-4">
                      <div className="h-auto w-full rounded-lg border-2 border-[#E5E7EB] bg-[#FAFAFF] px-3 sm:px-4">
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

                    <h1 className="mb-3 text-lg font-semibold text-[#111827] sm:mb-4 sm:text-xl">
                      Komentar
                    </h1>

                    <CommentSection postId={post._id} />
                  </article>
                )}
              </div>
            );
          })}
        </div>

        <div className="sticky top-4 hidden max-w-sm flex-col gap-4 self-start lg:flex lg:max-w-sm lg:gap-5 xl:max-w-md">
          <div className="flex max-w-sm flex-col gap-4 rounded-2xl bg-white p-4 shadow-md lg:gap-5 lg:p-6">
            <h1 className="text-xl font-bold text-[#1A1A1A] lg:text-2xl">
              Koneksi Untukmu
            </h1>
            <div className="flex flex-col gap-4 lg:gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-row items-center gap-3 lg:gap-4"
                >
                  <img
                    src="/images/logo.png"
                    alt="User"
                    className="h-10 w-10 flex-shrink-0 rounded-full bg-black object-cover lg:h-12 lg:w-12"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h2 className="truncate text-sm font-medium text-[#1A1A1A] lg:text-base">
                      Kurniawan Ilham
                    </h2>
                    <p className="truncate text-xs text-[#7A7A7A] lg:text-sm">
                      Teknik Nuklir
                    </p>
                  </div>
                  <button className="flex-shrink-0 rounded-lg bg-[#5568FE] px-2 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#5568FE]/90 lg:px-3 lg:py-2 lg:text-sm">
                    Berkoneksi
                  </button>
                </div>
              ))}
              <h4 className="mt-2 cursor-pointer text-center text-sm font-semibold text-[#5568FE] transition-colors hover:text-[#5568FE]/80 lg:text-base">
                Lihat Lebih Banyak
              </h4>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md lg:gap-5 lg:p-6">
            <h1 className="text-xl font-bold text-[#1A1A1A] lg:text-2xl">
              Postingan Terhangat
            </h1>
            <div className="flex flex-col gap-4 lg:gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="-m-2 flex cursor-pointer flex-row items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 lg:gap-4"
                >
                  <img
                    src="/images/logo.png"
                    alt="User"
                    className="h-10 w-10 flex-shrink-0 rounded-lg bg-black object-cover lg:h-12 lg:w-12"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h2 className="truncate text-sm font-medium text-[#1A1A1A] lg:text-base">
                      Kuota Magang di dellot..
                    </h2>
                    <p className="truncate text-xs text-[#7A7A7A] lg:text-sm">
                      Jokowi
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
