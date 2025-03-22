import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const MenuCard = ({ menucard }) => {
  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post("cart/add-to-cart", {
        foodId: menucard._id,
        restaurantId: menucard.restaurant,
        quantity: 1,
      });
      toast.success("Item added to cart");
      console.log("response===", response);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image Section */}
      <figure className="relative h-48 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={menucard.image}
          alt={menucard.name}
        />
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center gap-1">
          <span className="text-sm font-semibold text-yellow-600">4.5</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.354 2.428a1 1 0 00-.364 1.118l1.286 3.953c.3.921-.755 1.688-1.54 1.118l-3.354-2.428a1 1 0 00-1.175 0l-3.354 2.428c-.785.57-1.84-.197-1.54-1.118l1.286-3.953a1 1 0 00-.364-1.118L2.41 9.38c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.953z" />
          </svg>
        </div>
      </figure>

      {/* Content Section */}
      <div className="p-4">
        {/* Name and Description */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {menucard.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{menucard.description}</p>

        {/* Price and Add to Cart Button */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">
            ₹ {menucard.price}
          </p>
          <button
            className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={onSubmit}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
