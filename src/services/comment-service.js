import { privateAxios } from "./helper"

// Create a comment
export const createComment = (commentData, postId, userId) => {
  return privateAxios
    .post(`/api/comments/post/${postId}/user/${userId}`, commentData)
    .then((res) => res.data);
};

// Delete a comment
export const deleteComment = (commentId, postId, userId) => {
  return privateAxios
    .delete(`/api/comments/${commentId}/post/${postId}/user/${userId}`)
    .then((res) => res.data);
};