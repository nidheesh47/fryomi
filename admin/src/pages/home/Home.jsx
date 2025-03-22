import React from "react";
import logo from "/logo.png"; // Adjust the path based on your project structure

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Food Delivery Image */}
      <img
        src={logo}
        alt="Food Delivery"
        className="w-full max-w-md h-auto mb-6 rounded-lg shadow-lg"
      />

      {/* Welcome Text */}
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Welcome to the dashboard of{" "}
        <span className="text-orange-600">FRYOMI FOOD DELIVERY WEBSITE</span>
      </h1>
    </div>
  );
};

export default Home;
