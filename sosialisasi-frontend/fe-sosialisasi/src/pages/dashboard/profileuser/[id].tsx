import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "@/components/hooks/useHomePage";
import CommentSection from "@/components/views/Dashboard/HomePage/CommentSectionPage";
import { IPost } from "@/types/Home";

interface IUserProfile {
  _id: string;
  fullName: string;
  status: string;
  jurusan: string;
  universitas: string;
  linkedinLink?: string;
  profilePicture?: string;
}

const ProfileUserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

  // 🔹 Fetch user profile berdasarkan id
  const {
    data: profile,
    isLoading: loadingProfile,
    error: errorProfile,
  } = useQuery<IUserProfile>({
    queryKey: ["user-profile", id],
    queryFn: async () => {
      const userId = Array.isArray(id) ? id[0] : id;
      if (!userId) throw new Error("User ID is required");

      const res = await fetch(`http://localhost:3001/api/auth/user/${userId}`);
      if (!res.ok)
        throw new Error(`Failed to fetch user profile. Status: ${res.status}`);
      const data = await res.json();
      return data.data as IUserProfile;
    },
    enabled: !!id,
  });

  // 🔹 Fetch postingan user
  const { data: posts, isLoading: loadingPosts } = useQuery<IPost[]>({
    queryKey: ["user-posts", id],
    queryFn: async () => {
      const userId = Array.isArray(id) ? id[0] : id;
      if (!userId) throw new Error("User ID is required");

      const res = await fetch(
        `http://localhost:3001/api/upload/content/user/${userId}`,
      );
      if (!res.ok)
        throw new Error(`Failed to fetch user posts. Status: ${res.status}`);
      const data = await res.json();
      return data.data as IPost[];
    },
    enabled: !!id,
  });

  const toggleMenu = (postId: string) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  if (loadingProfile)
    return (
      <p className="mt-10 text-center text-gray-500">Loading profile...</p>
    );
  if (errorProfile)
    return (
      <p className="mt-10 text-center text-red-500">{errorProfile.message}</p>
    );
  if (!profile)
    return <p className="mt-10 text-center text-gray-500">User not found</p>;

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col gap-4 bg-gray-50 p-2 sm:gap-6 sm:p-4 lg:p-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:items-start">
          <Image
            src={
              profile.profilePicture
                ? `http://localhost:3001${profile.profilePicture}`
                : "/images/logo.png"
            }
            alt={profile.fullName}
            width={160}
            height={160}
            className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32 md:h-36 md:w-36"
          />
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
              {profile.fullName}
            </h1>
            <h3 className="text-sm text-[#7A7A7A] sm:text-base">
              {profile.status} {profile.jurusan} - {profile.universitas}
            </h3>
            <a
              href={profile.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 rounded-lg border-2 border-[#5568FE] px-3 py-1 text-[#5568FE] transition hover:bg-[#5568FE]/10"
            >
              <Image
                src={"/images/Linkedin.png"}
                width={18}
                height={18}
                alt="LinkedIn"
              />
              Linkedin
            </a>
          </div>
        </div>

        <div className="mt-6 border border-[#E7E7E7]"></div>

        <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md sm:rounded-2xl sm:p-6">
          <h2 className="text-xl font-semibold text-[#1A1A1A] sm:text-2xl">
            Postingan
          </h2>

          {loadingPosts ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => {
              const showMenu = openMenu === post._id;
              const hasLiked = currentUserId
                ? post.likes.includes(currentUserId)
                : false;
              const showComments = visibleComments[post._id] || false;

              return (
                <article
                  key={post._id}
                  className="flex flex-col gap-3 rounded-lg border p-3 sm:gap-4 sm:p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          post.userId?.profilePicture
                            ? `http://localhost:3001${post.userId.profilePicture}`
                            : "/images/logo.png"
                        }
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">
                          {post.userId?.fullName || "User"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(post.created_at_content).toLocaleString(
                            "id-ID",
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    <i
                      className="fa-solid fa-ellipsis-vertical cursor-pointer text-lg hover:text-gray-700"
                      onClick={() => toggleMenu(post._id)}
                    ></i>

                    {showMenu && (
                      <div className="absolute right-5 mt-8 w-24 rounded-lg border bg-white shadow-md">
                        <button
                          onClick={() => setOpenMenu(null)}
                          className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Tutup
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-sm whitespace-pre-wrap text-gray-800">
                    {post.text_content}
                  </p>

                  {post.attachmentUrl_content && (
                    <img
                      src={`http://localhost:3001${post.attachmentUrl_content}`}
                      alt="Attachment"
                      className="max-h-96 w-full rounded-lg object-cover"
                    />
                  )}

                  <div className="flex items-center gap-5 text-gray-600">
                    <button
                      onClick={() => handleToggleLike(post._id)}
                      className="flex items-center gap-1 hover:text-red-500"
                    >
                      <i
                        className={`fa-heart ${
                          hasLiked
                            ? "fa-solid text-red-500"
                            : "fa-regular text-gray-600"
                        }`}
                      ></i>
                      <span>{post.likes.length}</span>
                    </button>

                    <button
                      onClick={() => handleToggleComments(post._id)}
                      className="flex items-center gap-1 hover:text-[#5568FE]"
                    >
                      <i className="fa-regular fa-comment"></i>
                      <span>{post.comments.length}</span>
                    </button>

                    <button
                      onClick={() => handleShare(post._id)}
                      className="hover:text-gray-800"
                    >
                      <i className="fa-solid fa-share"></i>
                    </button>
                  </div>

                  {showComments && (
                    <div className="mt-3">
                      <textarea
                        placeholder="Tulis komentar..."
                        className="w-full resize-none rounded-lg border-2 border-gray-200 bg-[#FAFAFF] p-2 text-sm focus:outline-none"
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

                      <button
                        onClick={() => handleSendComment(post._id)}
                        disabled={isSendingComment || !commentInputs[post._id]}
                        className="mt-2 rounded-lg bg-[#5568FE] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        {isSendingComment ? "Sending..." : "Kirim"}
                      </button>

                      <h4 className="mt-4 mb-2 text-sm font-semibold text-[#111827]">
                        Komentar
                      </h4>
                      <CommentSection postId={post._id} />
                    </div>
                  )}
                </article>
              );
            })
          ) : (
            <p className="text-gray-500">Belum ada postingan.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileUserPage;
