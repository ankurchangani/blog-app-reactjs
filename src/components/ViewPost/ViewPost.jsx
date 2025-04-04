import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts } = useSelector((state) => state.postsReducer);

  const post = posts.find((post) => post.id.toString() === id);

  if (!post) {
    return <p className="text-center text-xl text-red-500 py-10">Post not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <div className="mb-5">
        <button 
          onClick={() => navigate('/allpost')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="w-full h-60 sm:h-72 md:h-96 lg:h-[500px] xl:h-[600px]">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h2>
          <div 
            className="text-gray-700 text-base sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
