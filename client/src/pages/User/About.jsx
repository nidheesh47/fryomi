import React from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.png"; // Replace with your logo path

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      {/* Hero Section */}
      <div className="bg-teal-800 text-white py-20 text-center">
        <h1 className="text-6xl font-bold mb-4">About Us</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Discover how we bring delicious food to your doorstep with just a few
          clicks!
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mt-16 bg-white rounded-xl shadow-xl p-10 mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-teal-800">Our Story</h2>
        <p className="text-gray-700 leading-8 text-lg">
          At <span className="font-semibold text-teal-800">Fryomi</span>, we
          believe that good food can create unforgettable moments. Founded in
          2024, we started with a simple mission: to make quality meals
          accessible to everyone. Whether it’s a cozy dinner at home or a
          celebration with friends, we deliver a variety of dishes right to your
          doorstep.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mx-auto max-w-6xl">
        <div className="bg-teal-800  rounded-xl shadow-xl p-10">
          <img src={Logo} alt="Our Mission" className=" my-20" />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-4xl font-bold mb-6 text-teal-800">Our Mission</h2>
          <p className="text-gray-700 leading-8 text-lg">
            We aim to provide a seamless and satisfying food delivery experience
            for everyone. Partnering with the best local restaurants, we ensure
            every meal is fresh, delicious, and delivered on time. From
            traditional cuisines to exotic flavors, we bring the world of food
            to your fingertips.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 bg-white rounded-xl shadow-xl p-10 mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-teal-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-teal-800">
              Variety of Choices
            </h3>
            <p className="text-gray-700">
              From local favorites to international cuisines, we have something
              for everyone.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-teal-800">
              Quick Delivery
            </h3>
            <p className="text-gray-700">
              We ensure that your food arrives hot and fresh, right on time.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-teal-800">
              Affordable Prices
            </h3>
            <p className="text-gray-700">
              Enjoy quality meals at reasonable prices without compromising on
              taste.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-teal-800">
              Customer Support
            </h3>
            <p className="text-gray-700">
              Our team is here to help with any questions or concerns, 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 bg-teal-800 text-white py-16 text-center rounded-xl shadow-xl">
        <h2 className="text-4xl font-bold mb-6">
          Ready to experience the joy of great food?
        </h2>
        <Link to="/all-restuarant">
          <button className="mt-6 px-10 py-4 bg-white text-teal-800 font-semibold rounded-xl hover:bg-gray-100 transition duration-300 text-lg">
            Browse Restaurants
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
