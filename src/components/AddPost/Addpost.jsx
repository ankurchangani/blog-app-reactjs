import React, { useState } from "react";
import Tinymce from "../Tinymce/Tinymce";
import { useNavigate } from "react-router-dom";
import { addPostAsync } from "../../Services/Actions/postAction";
import { useDispatch } from "react-redux";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState({
    title: "",
    image: null,
    content: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      return;
    }
    setError("");
    setBlogData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleContentChange = (newContent) => {
    setBlogData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blogData.title || !blogData.content || !blogData.image) {
      setError("Title, content, and image are required");
      return;
    }
    setError("");
    dispatch(addPostAsync(blogData));
    navigate("/allpost");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
          Add New Blog
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                  value={blogData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Blog Content
                </label>
                <Tinymce onChange={handleContentChange} />
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleImageChange}
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 hover:bg-blue-600"
                >
                  Publish Blog
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
