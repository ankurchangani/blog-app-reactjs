import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Services/Actions/authAction";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.authReducer);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction(formData));
        setShowPopup(true);
        navigate("/");
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0">

        <div className="min-h-screen flex items-center justify-center bg-[#FFF2F2] px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-[#A9B5DF] rounded-xl shadow-xl p-8 sm:p-10">
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#2D336B] text-center">Welcome Back</h2>
                <p className="text-[#2D336B] text-center mt-2 text-sm sm:text-base">Login to your account</p>

                {error && (
                    <div className="mt-4 text-center">
                        <p className="text-red-500">{error}</p>
                        <h3 className="text-gray-600">Something went wrong</h3>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-[#2D336B] text-sm font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#7886C7] text-white placeholder-white focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-[#2D336B] text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#7886C7] text-white placeholder-white focus:ring-2 focus:ring-[#2D336B] focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#2D336B] hover:bg-[#7886C7] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Login
                    </button>

                    <div className="mt-4 text-center text-sm">
                        <span className="text-[#2D336B]">Don't have an account? </span>
                        <Link to="/register" className="text-[#2D336B] hover:text-[#7886C7] font-semibold">
                            Sign Up
                        </Link>
                    </div>

                    {showPopup && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full mx-4">
                                <h2 className="text-2xl font-semibold text-green-600">Login Successful!</h2>
                                <button
                                    onClick={() => navigate('/')}
                                    className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
