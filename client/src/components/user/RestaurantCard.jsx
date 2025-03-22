import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ data }) => {
  const isClosed = data.status.toLowerCase() === "closed";

  return (
    <div
      className={`max-w-xs w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 ${
        isClosed ? "opacity-50 grayscale cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl"
      }`}
    >
      {isClosed ? (
        <>
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-t-xl"
              src={data.image}
              alt="restaurant"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 rounded-b-xl">
              <h2 className="text-white text-xl font-semibold">{data.name}</h2>
              <div className="flex items-center justify-between text-sm text-gray-300 mt-1">
                <h4>{data.location}</h4>
                <h3 className="font-bold">{data.status}</h3>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h4 className="text-center text-sm font-mono text-gray-500">{data.cuisine}</h4>
          </div>
        </>
      ) : (
        <Link to={`/restaurantPage/${data?._id}`}>
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-t-xl"
              src={data.image}
              alt="restaurant"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 rounded-b-xl">
              <h2 className="text-white text-xl font-semibold">{data.name}</h2>
              <div className="flex items-center justify-between text-sm text-gray-300 mt-1">
                <h4>{data.location}</h4>
                <h3 className="font-bold">{data.status}</h3>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h4 className="text-center text-sm font-mono text-gray-500">{data.cuisine}</h4>
          </div>
        </Link>
      )}
    </div>
  );
};

export default RestaurantCard;
