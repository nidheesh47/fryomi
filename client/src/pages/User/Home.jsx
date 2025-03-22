import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Data from "../../../src/data/data";
import SimpleSlider from "../../components/slider/slider";
import RestaurantCard from "../../components/user/RestaurantCard";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");

  // Fetch restaurants based on the search query and cuisine filter
  const [restaurants, isLoading, error] = useFetch("/restaurant/", {
    cuisine: selectedCuisine !== "all" ? selectedCuisine : undefined,
  });

  const navigate = useNavigate();

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to navigate to the restaurant page
  const handleRestaurantClick = (id) => {
    navigate(`/restaurantPage/${id}`);
  };

  // Filtered restaurants based on search query (only for the search results)
  const filteredRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar Section */}
      <div className="cover flex flex-col items-center justify-center relative px-4 sm:px-8 md:px-16 lg:px-32 py-8">
        <div className="w-full max-w-lg relative">
          <input
            type="text"
            className="search p-4 w-full rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search for Restaurant, item or more"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CiSearch
            style={{ color: "black" }}
            className="absolute top-6 right-4 text-2xl"
          />
          {searchQuery && (
            <div className="search-results absolute bg-white w-full mt-2 p-4 rounded-md shadow-lg z-50">
              <h2 className="font-bold text-lg mb-2">Search Results:</h2>
              <div className="flex flex-wrap gap-2">
                {filteredRestaurants?.length ? (
                  filteredRestaurants.map((item) => (
                    <div
                      key={item._id}
                      className="restaurant-item cursor-pointer hover:underline"
                      onClick={() => handleRestaurantClick(item._id)}
                    >
                      <p className="text-blue-500">{item.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slider Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 mt-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl py-4">
          Order our best food options
        </h1>
        <SimpleSlider data={Data} />
      </div>

      {/* Restaurants Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 mt-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-6">
          Restaurants
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants?.map((item) => (
            <RestaurantCard
              data={item}
              key={item._id}
              onClick={() => handleRestaurantClick(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
