// src/pages/Home.jsx

import React from "react";
import Blog from "../../assets/Blog-app-img/blog.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] sm:h-screen flex items-center justify-center text-white mt-5"
      style={{ backgroundImage: `url(${Blog})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg sm:text-xl mb-6">Share your thoughts with the world.</p>

        <Link
          to="/addpost"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-600 hover:scale-105 inline-block"
        >
          Add Blog
        </Link>
      </div>
    </section>
  );
};

export default Home;
