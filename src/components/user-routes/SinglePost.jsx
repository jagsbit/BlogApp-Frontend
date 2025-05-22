import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, postLike } from "../../services/post-service";
import { createComment, deleteComment } from "../../services/comment-service";
import { getUser } from "../../auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";

dayjs.extend(relativeTime);

const DEFAULT_IMAGE = "https://via.placeholder.com/600x400?text=No+Image";

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);
  const user =  getUser();
  const[hasLiked,setHasLiked]=useState(false)

  const handleLike = () => {
    // Placeholder: implement like logic
   
    for(let i=0;i<post.likes.length;i++){
        if(user?.id==post.likes[i].id){
             toast.success("Post Already Liked By You")
             return;
        }
    }
    postLike(postId,user?.id).then((data)=>{
      toast.success("liked")
      setHasLiked(true)
    }).catch((error)=>{
          console.log(error);
    })
  };

  const handleComment = () => {
    if (comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }

    const commentData = {
      content: comment,
    };

    createComment(commentData, postId, user.id)
      .then(() => {
        toast.success("Comment added successfully");
        setComment("");
        return getPostById(postId);
      })
      .then((data) => setPost(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add comment");
      });
  };

  const handleDeleteComment = (commentId, commentUserId) => {
    deleteComment(commentId, postId, commentUserId)
      .then(() => {
        toast.success("Comment deleted successfully");
        return getPostById(postId);
      })
      .then((data) => setPost(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete comment");
      });
  };
  
  useEffect(() => {
    getPostById(postId)
      .then((data) => {
        setPost(data);
        setLikes(data.likes.length)
       // console.log(data)
      })
      .catch((error) => {
        console.error("Failed to load post:", error);
      });
  }, [postId,hasLiked]);

  if (!post) {
    return <div className="text-center py-10">Loading post...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl overflow-hidden">
        {/* {post.postImage ? (
          <img
            src={post.postImage}
            alt="Post"
            className="w-full h-80 object-cover"
          />
        ) : (
          <img
            src={DEFAULT_IMAGE}
            alt="No Image"
            className="w-full h-80 object-cover"
          />
        )} */}

        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            {post.postTitle}
          </h1>

          <div className="text-sm text-gray-500 mb-6 flex justify-between">
            <span>By {post.user?.name || "Anonymous"}</span>
            <span>Posted {dayjs(post.postDate).fromNow()}</span>
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-800 mb-8"
            dangerouslySetInnerHTML={{ __html: post.postContent }}
          ></div>

          {/* Like and Comment Section */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleLike}
              >
                👍 Like
              </button>
              <span className="text-gray-700">{likes} Likes</span>
            </div>

            {/* Comment Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Leave a Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Write your comment here..."
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleComment}
              >
                Submit Comment
              </button>
            </div>

            {/* Show Comments */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Comments</h3>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((c, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-3 mb-3 text-gray-800"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {c.user?.name || "Anonymous"}
                        </p>
                        
                        <p>{c.content}</p>
                      </div>
                      {user?.id === c.user?.id && (
                        <button
                          className="text-red-500 text-sm hover:underline"
                          onClick={() => handleDeleteComment(c.id, c.user.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
