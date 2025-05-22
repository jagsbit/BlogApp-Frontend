import { privateAxios } from "./helper"
//create post 
 

export const addPost=(postData)=>{
    const userId=postData.userId;
    const category=postData.category;
    delete postData.userId;
    delete postData.category;
    return privateAxios.post(`/api/user/${userId}/category/${category}/posts`,postData).then(response=>response.data)
}

export const getAllPosts = (pageNumber = 0, pageSize = 6) => {
  return privateAxios
    .get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data);
};
export const getPostById=(postId)=>{
    return privateAxios.get(`/api/posts/${postId}`).then(response=>response.data);
}
export const getPostsByCategory=(catId,pageNumber = 0, pageSize = 6)=>{
    
   return privateAxios.get(`/api/category/${catId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response)=>response.data);
}

export const getPostByUser=(userId,pageNumber = 0, pageSize = 6)=>{
    return privateAxios.get(`/api/user/${userId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response)=>response.data);
}

export const deletePostById=(postId)=>{
    return privateAxios.delete(`/api/posts/${postId}`).then(response=>response.data);
}

export const updatePostById=(postId,postData)=>{
    return privateAxios.put(`/api/posts/${postId}`,postData).then(response=>response.data);
}

export const postLike=(postId,userId)=>{
    return privateAxios.post(`api/posts/like/${postId}/${userId}`).then((response)=>response.data)
}
 