import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import DataTable from "react-data-table-component";

const RestaurantsMenu = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/restaurant");
      setRestaurants(response.data);
    } catch (err) {
      setError("An error occurred while fetching restaurants.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantClick = (data) => {
    navigate(`/restaurant-menu/${data._id}`);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width:"100px"
    },
    {
      name: "Restaurant Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => handleRestaurantClick(row)}
        >
          {row.name}
        </span>
      ),
    },
    {
      name: "Total Menu Items",
      selector: (row) => row.menuItems?.length || 0,
      sortable: true,
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <DataTable
            columns={columns}
            data={restaurants}
            pagination
            highlightOnHover
            responsive
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantsMenu;
