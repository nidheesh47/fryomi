import React from 'react';

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-500 drop-shadow-lg">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-600">
          It seems you took a wrong turn, but don't worry, we'll guide you back.
        </p>
        <a
          href="/home"
          className="mt-8 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export default NotFound;
