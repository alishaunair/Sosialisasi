import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import useProfile from "../../../hooks/useProfile";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "../../../hooks/useHomePage";
import CommentSection from "../HomePage/CommentSectionPage";

const Profile = () => {
  const router = useRouter();
  const { profile, isLoading, posts, isLoadingPosts, handleDeletePost } =
    useProfile();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const {
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

  const toggleMenu = (postId: string) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="pt-8 text-center text-gray-500">Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col gap-4 bg-gray-50 p-2 sm:gap-6 sm:p-4 lg:p-6">
        <div className="grid w-full grid-cols-1 gap-4 px-2 sm:gap-6 sm:px-4 md:px-6 lg:grid-cols-[7fr_3fr] lg:px-8 xl:px-12">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            <article className="rounded-lg bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 md:p-8 lg:p-10">
              <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:gap-6 md:gap-8 lg:mb-14">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:flex-row md:items-start md:justify-start">
                    <Image
                      src={
                        profile?.profilePicture
                          ? `http://localhost:3001${profile.profilePicture}`
                          : "/images/logo.png"
                      }
                      alt={profile?.fullName || "User Avatar"}
                      width={160}
                      height={160}
                      className="h-24 w-24 flex-shrink-0 rounded-full object-cover sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
                    />

                    <div className="flex w-full flex-col gap-2 text-center sm:gap-3 md:flex-1 md:text-left">
                      <h1 className="text-xl font-bold break-words text-[#1A1A1A] sm:text-2xl md:text-3xl lg:text-[32px]">
                        {profile?.fullName}
                      </h1>

                      <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-[#7A7A7A] md:justify-start">
                        <i className="fa-solid fa-graduation-cap text-base sm:text-lg lg:text-[20px]"></i>
                        <h3 className="font-regular text-sm sm:text-base lg:text-[20px]">
                          <span>{profile?.status}</span>{" "}
                          <span>{profile?.jurusan}</span> -{" "}
                          <span>{profile?.universitas}</span>
                        </h3>
                      </div>

                      <p className="mt-1 mb-2 text-sm font-semibold text-[#7A7A7A] sm:text-base lg:text-[20px]">
                        300 Koneksi
                      </p>

                      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 md:justify-start lg:gap-5">
                        <div className="flex w-full flex-row items-center justify-center gap-2 rounded-lg border-2 border-[#5568FE] px-3 py-2 transition-colors hover:bg-[#5568FE]/5 sm:w-auto sm:rounded-xl sm:px-4">
                          <Image
                            src={"/images/Linkedin.png"}
                            width={20}
                            height={20}
                            alt="Linkedin"
                            className="h-4 w-4 sm:h-5 sm:w-5"
                          />
                          <p className="text-sm font-medium text-[#5568FE] sm:text-base">
                            <a
                              href={profile?.linkedinLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Linkedin
                            </a>
                          </p>
                        </div>
                        <button
                          className="flex w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-[#5568FE] px-3 py-2 transition-colors hover:bg-[#5568FE]/90 sm:w-auto sm:rounded-xl sm:px-4"
                          onClick={() => router.push("/dashboard/edit-profile")}
                        >
                          <p className="text-sm font-bold text-white sm:text-base lg:text-[19px]">
                            Edit Profil
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-[#E7E7E7]"></div>
            </article>

            <div className="mb-5 flex w-full flex-col gap-4 rounded-lg bg-white p-3 shadow-md sm:gap-6 sm:rounded-2xl sm:p-4 lg:gap-7 lg:p-6">
              <h1 className="text-xl font-semibold text-[#1A1A1A] sm:text-2xl lg:text-[28px]">
                Postingan
              </h1>

              {isLoadingPosts ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => {
                  const showMenu = openMenu === post._id;
                  const hasLiked = currentUserId
                    ? post.likes.includes(currentUserId)
                    : false;
                  const showComments = visibleComments[post._id] || false;

                  return (
                    <article key={post._id} className="flex flex-col">
                      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex min-w-0 flex-1 flex-row items-center gap-3 sm:gap-4">
                          <img
                            src={
                              post.userId?.profilePicture
                                ? `http://localhost:3001${post.userId.profilePicture}`
                                : "/images/logo.png"
                            }
                            alt="User"
                            className="h-9 w-9 flex-shrink-0 rounded-full bg-black object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                          />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <h3 className="truncate text-sm font-semibold text-[#202020] sm:text-base lg:text-xl">
                                {post.userId?.fullName || "Nama Pengguna"}
                              </h3>
                              <div className="rounded-full bg-[#5568FE]/10 px-4 py-1 sm:px-4 sm:py-1">
                                <h5 className="text-xs font-medium text-[#5568FE] sm:text-sm">
                                  {post.type_content || "Project"}
                                </h5>
                              </div>
                            </div>
                            <h4 className="text-xs text-[#787878] sm:text-[13px] lg:text-[15px]">
                              {new Date(post.created_at_content).toLocaleString(
                                "id-ID",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                },
                              )}
                            </h4>
                          </div>
                        </div>

                        <div className="relative self-end sm:self-auto">
                          <i
                            className="fa-solid fa-ellipsis-vertical cursor-pointer text-lg transition-colors hover:text-gray-700 sm:text-xl lg:text-[24px]"
                            onClick={() => toggleMenu(post._id)}
                          ></i>

                          {showMenu && (
                            <div className="absolute right-0 z-10 mt-2 w-24 rounded-lg border bg-white shadow-lg sm:w-28 lg:w-32">
                              <button
                                onClick={() => {
                                  handleDeletePost(post._id);
                                  setOpenMenu(null);
                                }}
                                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 sm:px-4 sm:text-base"
                              >
                                Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <p className="text-sm break-words whitespace-pre-wrap text-[#202020] sm:text-base lg:text-lg">
                          {post.text_content}
                        </p>
                      </div>

                      {post.attachmentUrl_content && (
                        <img
                          src={`http://localhost:3001${post.attachmentUrl_content}`}
                          alt="Attachment"
                          className="mt-3 max-h-96 w-full rounded-lg object-cover sm:max-h-[500px] sm:rounded-xl"
                        />
                      )}

                      <div className="mt-3 flex items-center justify-between text-gray-600 sm:mt-4 lg:mt-5">
                        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                          <button
                            onClick={() => handleToggleLike(post._id)}
                            className="flex items-center gap-1.5 transition-colors hover:text-red-500 sm:gap-2"
                          >
                            <i
                              className={`fa-heart text-base sm:text-lg lg:text-xl ${
                                hasLiked
                                  ? "fa-solid text-red-500"
                                  : "fa-regular"
                              }`}
                            ></i>
                            <span className="text-xs font-medium sm:text-sm">
                              {post.likes.length}
                            </span>
                          </button>

                          <button
                            onClick={() => handleToggleComments(post._id)}
                            className="flex items-center gap-1.5 transition-colors hover:text-[#5568FE] sm:gap-2"
                          >
                            <i className="fa-regular fa-comment text-base sm:text-lg lg:text-xl"></i>
                            <span className="text-xs font-medium sm:text-sm">
                              {post.comments?.length || 0}
                            </span>
                          </button>

                          <button
                            onClick={() => handleShare(post._id)}
                            className="transition-colors hover:text-gray-900"
                          >
                            <i className="fa-solid fa-share cursor-pointer text-base sm:text-lg lg:text-xl"></i>
                          </button>
                        </div>
                      </div>

                      {showComments && (
                        <article className="mt-4 flex w-full flex-col sm:mt-5 lg:mt-7">
                          <div className="mb-3 flex flex-col items-stretch gap-2 sm:mb-4 sm:flex-row sm:items-center sm:gap-3 lg:gap-4">
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
                              disabled={
                                isSendingComment || !commentInputs[post._id]
                              }
                              className="flex h-9 w-full flex-row items-center justify-center gap-2 rounded-lg bg-[#5568FE] text-white transition-colors hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400 sm:h-10 sm:w-auto sm:min-w-[80px] lg:min-w-[90px]"
                            >
                              <i className="fas fa-paper-plane text-xs sm:text-sm"></i>
                              <h2 className="text-xs font-bold sm:text-sm">
                                {isSendingComment ? "Sending..." : "Send"}
                              </h2>
                            </button>
                          </div>

                          <h1 className="mb-3 text-base font-semibold text-[#111827] sm:mb-4 sm:text-lg lg:text-[20px]">
                            Komentar
                          </h1>
                          <CommentSection postId={post._id} />
                        </article>
                      )}

                      <div className="mt-4 border-t border-gray-100 sm:mt-5 lg:mt-7"></div>
                    </article>
                  );
                })
              ) : (
                <p className="text-center text-sm text-gray-500 sm:text-base">
                  Belum ada postingan.
                </p>
              )}
            </div>
          </div>

          <div className="hidden w-full flex-col gap-4 sm:gap-5 lg:top-24 lg:flex lg:self-start">
            <div className="flex flex-col gap-4 rounded-lg bg-white p-3 shadow-md sm:gap-5 sm:rounded-2xl sm:p-4 md:p-6 lg:p-8">
              <h1 className="text-lg font-bold text-[#1A1A1A] sm:text-xl lg:text-[24px]">
                Koneksi
              </h1>
              <div className="flex flex-col gap-4 sm:gap-5">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="-m-2 flex cursor-pointer flex-row items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 sm:gap-4"
                  >
                    <img
                      src="/images/logo.png"
                      alt="User"
                      className="h-9 w-9 flex-shrink-0 rounded-full bg-black object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h2 className="truncate text-sm font-medium text-[#1A1A1A] sm:text-base lg:text-[18px]">
                        Kurniawan Ilham
                      </h2>
                      <p className="truncate text-xs text-[#7A7A7A] sm:text-sm lg:text-[16px]">
                        Teknik Nuklir
                      </p>
                    </div>
                  </div>
                ))}
                <h4 className="mt-2 cursor-pointer text-center text-sm font-semibold text-[#5568FE] transition-colors hover:text-[#5568FE]/80 sm:text-base">
                  Lihat Lebih Banyak
                </h4>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-white p-3 shadow-md sm:gap-5 sm:rounded-2xl sm:p-4 md:p-6 lg:p-8">
              <h1 className="text-lg font-bold text-[#1A1A1A] sm:text-xl lg:text-[24px]">
                Postingan Terfavorit
              </h1>
              <div className="flex flex-col gap-4 sm:gap-5">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="-m-2 flex cursor-pointer flex-row items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 sm:gap-4"
                  >
                    <img
                      src="/images/logo.png"
                      alt="User"
                      className="h-9 w-9 flex-shrink-0 rounded-lg bg-black object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h2 className="line-clamp-2 text-sm font-medium break-words text-[#1A1A1A] sm:text-base lg:text-[18px]">
                        Kerja Dideloite membua..
                      </h2>
                      <p className="text-xs text-[#7A7A7A] sm:text-sm lg:text-[16px]">
                        286 Likes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
