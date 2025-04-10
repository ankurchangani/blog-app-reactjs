import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../../Services/Actions/authAction';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live validation
    if (name === 'password') {
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    dispatch(registerAction(formData));
    setShowPopup(true);
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen overflow-x-auto">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-3xl font-semibold text-[#2D336B] text-center">Welcome Back</h2>
            <p className="text-[#2D336B] text-center mt-2">Register to your account</p>

            <div className="mb-4">
              <label className="block text-[#2D336B]">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#7886C7] text-white focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#7886C7] text-white focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="mb-1">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg bg-[#7886C7] text-white focus:ring-2 focus:outline-none`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-4 mt-3">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-lg bg-[#7886C7] text-white focus:ring-2 focus:outline-none`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D336B] hover:bg-[#7886C7] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-green-600">Registration Successful!</h2>
            <p className="text-gray-700 mt-2">Your account has been created successfully.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 bg-[#2D336B] hover:bg-[#7886C7] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
