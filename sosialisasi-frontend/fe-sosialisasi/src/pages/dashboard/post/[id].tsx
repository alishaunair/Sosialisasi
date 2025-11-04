import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Image from "next/image";
import { IPost, IComment } from "@/types/Home";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:3001/api/upload/content/${id}`,
        );
        if (!res.ok)
          throw new Error(`Failed to fetch post. Status: ${res.status}`);

        const data = await res.json();
        if (!data.data) throw new Error("Post not found");

        setPost(data.data as IPost);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return <p className="mt-10 text-center text-gray-500">Loading post...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;
  if (!post)
    return <p className="mt-10 text-center text-gray-500">Post not found</p>;

  return (
    <DashboardLayout showSearch={false}>
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-6">
        <article className="flex flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Image
              src={post.userId.profilePicture || "/images/logo.png"}
              alt={post.userId.fullName}
              width={48}
              height={48}
              className="h-12 w-12 rounded-lg bg-black object-cover"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-[#202020] sm:text-lg">
                {post.userId.fullName}
              </h3>
              <h4 className="text-xs text-[#787878] sm:text-sm">
                {new Date(post.created_at_content).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </h4>
            </div>
          </div>

          {/* Konten */}
          <p className="mt-4 text-sm whitespace-pre-wrap text-[#202020] sm:text-base">
            {post.text_content}
          </p>

          {/* Attachment */}
          {post.attachmentUrl_content && (
            <div className="relative mt-3 w-full pt-[56.25%]">
              <Image
                src={`http://localhost:3001${post.attachmentUrl_content}`}
                alt="Attachment"
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </article>
      </div>
    </DashboardLayout>
  );
};

export default PostPage;
