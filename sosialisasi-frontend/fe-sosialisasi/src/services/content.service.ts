import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPost, IComment } from "@/types/Home";

const contentServices = {
  getAllPosts: () =>
    instance
      .get<{ data: IPost[] }>(endpoint.CONTENT)
      .then((res) => res.data.data),

  getPostsByUserId: () =>
    instance
      .get<{ data: IPost[] }>(endpoint.CONTENT_ID)
      .then((res) => res.data.data),

  createContent: (formData: FormData) =>
    instance.post(endpoint.CONTENT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  toggleLike: (postId: string) =>
    instance.post(`${endpoint.LIKE_TOGGLE}/${postId}`),

  getCommentsByPostId: (postId: string) =>
    instance
      .get<{ data: IComment[] }>(`${endpoint.COMMENT}/${postId}`)
      .then((res) => res.data.data),

  createComment: ({
    postId,
    text_comment,
  }: {
    postId: string;
    text_comment: string;
  }) =>
    instance.post<{ data: IComment }>(`${endpoint.COMMENT}/${postId}`, {
      text_comment,
    }),

  deleteContent: (postId: string) =>
    instance.delete(`${endpoint.CONTENT}/${postId}`),
};

export default contentServices;
