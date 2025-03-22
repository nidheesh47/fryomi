import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductSkelton } from "../../components/shared/Skelton";
import MenuCard from "../../components/user/MenuCard";

const RestaurantPage = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: `/restaurant/${id}`,
      });

      setRestaurantDetails(response?.data);
      setMenuItems(response.data.menuItems);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return <ProductSkelton />;
  }

  return (
    <div className="mt-20 container mx-auto px-4">
      {/* Restaurant Details Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Restaurant Image */}
        <img
          src={restaurantDetails.image}
          alt={restaurantDetails.name}
          className="w-full md:w-96 h-64 md:h-80 object-cover rounded-xl shadow-lg"
        />

        {/* Restaurant Information */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800">
            {restaurantDetails.name}
          </h1>
          <p className="text-gray-600 mt-2">{restaurantDetails.cuisine}</p>
          <p className="text-gray-600 mt-2">
            Status:{" "}
            <span
              className={`font-semibold ${
                restaurantDetails.status === "Open"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {restaurantDetails.status}
            </span>
          </p>

          {/* Rating */}
          <div className="rating mt-4">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-yellow-400"
                defaultChecked={index === 1} // Default to 2 stars for example
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Link to={``}>
              <button className="bg-teal-800 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition duration-300">
                Order Online
              </button>
            </Link>
            {/* Uncomment if you want to add a Review button */}
            {/* <Link to={`/review/${id}`}>
              <button className="bg-teal-800 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition duration-300">
                Review
              </button>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-gray-200" />

      {/* Recommended Menu Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <MenuCard menucard={item} key={index} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No menu items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
