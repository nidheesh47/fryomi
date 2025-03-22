import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ isOpen, onClose, onOpenSignUp }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const user = {
    login_api: "/user/login",
    profile_route: "/", // Redirect here after login
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(user.login_api, data, {
        withCredentials: true, // 🔹 Ensure cookies are sent
      });

      if (response.data.success) {
        // 🔹 Check backend response
        toast.success("Log-in successful!");
        navigate(user.profile_route); // 🔹 Redirect instead of reloading
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Log-in failed!");
      console.error(error);
    }
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-teal-800">Login</h2>
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <button
              className="text-teal-800 hover:underline focus:outline-none"
              onClick={() => {
                onClose(); // Close login modal
                onOpenSignUp(); // Open sign-up modal
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
