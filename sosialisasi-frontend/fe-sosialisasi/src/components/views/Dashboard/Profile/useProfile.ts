import { useQuery } from "@tanstack/react-query";
import authServices from "@/services/auth.service";
import { useSession } from "next-auth/react";
import contentServices from "@/services/content.service";
import { IPost } from "@/types/Home";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

const useProfile = () => {
  const { data: session } = useSession();
  const [postss, setPosts] = useState<IPost[]>([]);
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);
  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: authServices.getProfile,
  });

  const { data: posts = [], isLoading: isLoadingPosts } = useQuery<IPost[]>({
    queryKey: ["user-posts"],
    queryFn: contentServices.getPostsByUserId,
    enabled: !!session,
  });

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: contentServices.deleteContent,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["user-posts"] });

      const previousPosts = queryClient.getQueryData<IPost[]>(["user-posts"]);
      queryClient.setQueryData<IPost[]>(["user-posts"], (old = []) =>
        old.filter((p) => p._id !== postId),
      );

      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts)
        queryClient.setQueryData(["user-posts"], context.previousPosts);
      setToaster({ type: "error", message: "Gagal menghapus postingan." });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      setToaster({ type: "success", message: "Postingan berhasil dihapus." });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });

  return {
    profile: profileResponse?.data?.data,
    posts,
    isLoading,
    isLoadingPosts,
    handleDeletePost,
  };
};

export default useProfile;
