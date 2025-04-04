// src/components/Layout/Header.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../Services/Actions/authAction";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const dispatch = useDispatch();
  const { login, user } = useSelector((state) => state.authReducer);
  const [userEmail, setUserEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserEmail(userDoc.data().email);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user?.uid]);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="bg-gray-900 shadow-md px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between py-4 relative">
        {/* Logo */}
        <div className="text-white text-xl font-bold">My Blog</div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex space-x-6 text-white">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/allpost" className="hover:text-blue-500 transition">All Posts</Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {!login ? (
            <Link
              to="/login"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="text-gray-300">Hello, {userEmail || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 z-50 p-4 flex flex-col space-y-4 md:hidden">
            <Link to="/" className="text-white hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/allpost" className="text-white hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>All Posts</Link>

            {!login ? (
              <Link
                to="/login"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <span className="text-gray-300">Hello, {userEmail || "User"}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
