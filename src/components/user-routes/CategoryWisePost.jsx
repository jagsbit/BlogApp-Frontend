import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getPostsByCategory } from "../../services/post-service";
import CategoryNav from "./CategoryNav";

dayjs.extend(relativeTime);

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const DEFAULT_IMAGE = "https://via.placeholder.com/600x300?text=No+Image";

const CategoryWisePost = () => {
  const { catId } = useParams();
  const [data, setData] = useState({ content: [], totalPages: 0, lastPage: false });
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("pageNumber")) || 0;

  useEffect(() => {
    if (catId) {
      getPostsByCategory(parseInt(catId), currentPage)
        .then((data) => {
          setData(data);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.error("Failed to load posts", error);
        });
    }
  }, [catId, currentPage]);

  const goToPage = (page) => {
    setSearchParams({ pageNumber: page });
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* Sidebar on large screens */}
        <CategoryNav />

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
                    <Link to={`/private/user-profile/${post.user?.id}`} className="text-blue-600"> <span>By {post.user?.name || "Anonymous"}</span></Link>
                  </div>
                  <Link
                    to={`/private/posts/${post.postId}`}
                    className="mt-4 self-start bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Read More
                  </Link>
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

export default CategoryWisePost;
