import React, { useState } from "react";
import RestaurantCard from "../../components/user/RestaurantCard";
import { ProductSkelton } from "../../components/shared/Skelton";
import useFetch from "../../hooks/UseFetch";

const AllRestaurantPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");

  // Dynamically pass search and filter params
  const [restaurants, isLoading, error] = useFetch("/restaurant/", {
    search: searchQuery,
    cuisine: selectedCuisine !== "all" ? selectedCuisine : undefined,
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 font-sans">
      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        All Restaurants
      </h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        />
        <select
          value={selectedCuisine}
          onChange={handleCuisineChange}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="all">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
          <option value="Mexican">Mexican</option>
        </select>
      </div>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <ProductSkelton />
        ) : error ? (
          <div className="col-span-full text-red-500 text-center">
            Error: {error.message}
          </div>
        ) : restaurants && restaurants.length > 0 ? (
          restaurants.map((item) => (
            <RestaurantCard data={item} key={item._id} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No restaurants found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRestaurantPage;
