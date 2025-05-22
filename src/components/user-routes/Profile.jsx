import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getUser } from "../../auth";
import { deletePostById, getPostByUser } from "../../services/post-service";
import { getUserById } from "../../services/user-service";
import UserDetail from "./UserDetail";
import { toast } from "react-toastify";

dayjs.extend(relativeTime);

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const Profile = () => {
  const { userId } = useParams(); // may be undefined
  const authUser = getUser();
  const effectiveUserId = userId || authUser?.id;

  const [profileUser, setProfileUser] = useState(null);
  const [data, setData] = useState({ content: [], totalPages: 0, lastPage: false });
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("pageNumber")) || 0;

  useEffect(() => {
    if (!effectiveUserId) return;

    getUserById(effectiveUserId)
      .then((data) => {
        setProfileUser(data);
      })
      .catch((error) => {
        console.error("Failed to load user", error);
      });

    getPostByUser(effectiveUserId, currentPage)
      .then((data) => {
        setData(data);
        window.scroll(0, 0);
      })
      .catch((error) => {
        console.error("Failed to load user's posts", error);
      });
  }, [currentPage, effectiveUserId]);

  const goToPage = (page) => {
    setSearchParams({ pageNumber: page });
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostById(postId)
        .then(() => {
          toast.success("Post Deleted");
          setData((prevData) => ({
            ...prevData,
            content: prevData.content.filter((post) => post.postId !== postId),
          }));
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          toast.error("Failed to delete post");
        });
    }
  };

  const isOwnProfile = authUser?.id === profileUser?.id;

  return (
    <div className="pt-20 px-4 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <UserDetail user={profileUser} />

        {/* Post content area */}
        <div className="flex-1">
          <div className="flex flex-col gap-8">
            {data.content.map((post) => (
              <div
                key={post.postId}
                className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold mb-3 text-blue-900">
                    {post.postTitle}
                  </h3>
                  <p className="text-gray-700 text-lg mb-6">
                    {stripHtml(post.postContent).substring(0, 300)}...
                  </p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Posted {dayjs(post.postDate).fromNow()}</span>
                    <span>By {post.user?.name || "You"}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to={`/private/posts/${post.postId}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Read More
                    </Link>

                    {isOwnProfile && (
                      <>
                        <Link
                          to={`/private/update-post/${post.postId}`}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                        >
                          Update
                        </Link>

                        <button
                          onClick={() => handleDelete(post.postId)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(data.totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={data.lastPage}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
