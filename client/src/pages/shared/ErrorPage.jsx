import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <div className="max-w-md">
        <img
          className="w-full max-w-xs mx-auto mb-6"
          src="https://th.bing.com/th/id/OIP.yYBFzWZ0R970KK2bJhwO9AHaEi?rs=1&pid=ImgDetMain"
          alt="Error illustration"
        />
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We couldn't find the page you're looking for. It might have been moved
          or deleted.
        </p>
        <div>
          <button
            className="px-6 py-2 text-white bg-teal-800 rounded hover:bg-teal-700 mr-3"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
          <button
            className="px-6 py-2 text-teal-800 border border-teal-800 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
