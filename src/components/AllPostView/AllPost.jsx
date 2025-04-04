import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { fetchPosts, removePostAsync } from "../../Services/Actions/postAction";
import "./AllPost.css"; // ✅ Make sure this file exists and has styles if needed

const AllPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.postsReducer);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostEdit = (post) => {
    if (!post) return console.error("No post data available!");
    dispatch({ type: "SET_SELECTED_POST", payload: post });
    navigate("/editpost");
  };

  const handlePostDelete = (id) => {
    dispatch(removePostAsync(id));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        All Blog Posts
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loader"></div>
          <span className="ml-3 text-gray-700 text-lg">Loading...</span>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600 text-center">No blog posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-0 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={post.image || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{post.title}</h3>
                <div className="mt-auto">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                    <button
                      onClick={() => handlePostEdit(post)}
                      className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 w-full sm:w-auto"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => handlePostDelete(post.id)}
                      className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 w-full sm:w-auto"
                    >
                      <FaTrash />
                      Delete
                    </button>
                    <Link
                      to={`/viewpost/${post.id}`}
                      className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 w-full sm:w-auto"
                    >
                      <FaEye />
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
