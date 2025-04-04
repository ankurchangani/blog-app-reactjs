import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePostAsync, editPostAsync } from "../../Services/Actions/postAction";
import Tinymce from "../Tinymce/Tinymce";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postsReducer.selectedPost);

  const [updateBlogData, setUpdateBlogData] = useState({
    id: "",
    title: "",
    content: "",
    image: "",
    preview: "",
  });

  useEffect(() => {
    if (id) dispatch(fetchSinglePostAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      setUpdateBlogData({
        id: post.id || "",
        title: post.title || "",
        content: post.content || "",
        image: post.image || "",
        preview: post.image || "",
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      console.error("Image size should be less than 2MB");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setUpdateBlogData((prev) => ({
      ...prev,
      image: file,
      preview: imageUrl,
    }));
  };

  const handleContentChange = (newContent) => {
    setUpdateBlogData((prev) => ({ ...prev, content: newContent }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateBlogData.id) {
      console.error("Post ID is missing!");
      return;
    }
    await dispatch(editPostAsync(updateBlogData.id, updateBlogData));
    navigate("/allpost");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Blog</h2>

        <form onSubmit={handleUpdate} className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Blog Title</label>
              <input
                type="text"
                name="title"
                value={updateBlogData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Blog Content</label>
              <Tinymce onChange={handleContentChange} value={updateBlogData.content} />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {updateBlogData.preview && (
                <img
                  src={updateBlogData.preview}
                  alt="Preview"
                  className="mt-3 w-full max-w-xs h-40 object-cover rounded-lg border"
                />
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full lg:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Update Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
