import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
    console.log("clicked");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      console.log("response===", response);

      alert("Log-in success");
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
