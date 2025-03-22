import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";

const AllRestaurants = () => {
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

  const handleAddRestaurant = () => {
    navigate("/edit-restaurant");
  };

  const handleEditRestaurant = (row) => {
    console.log(row);
    navigate(`/edit-restaurant`, { state: { data: row } });
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await axiosInstance.delete(`/restaurant/${id}`);
        alert("Restaurant deleted successfully.");
        fetchRestaurants();
      } catch {
        alert("Failed to delete restaurant. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Photo",
      selector: (row) => (
        <div className="p-2">
          <img className="w-20 " src={row.image} />
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cuisine",
      selector: (row) => row.cuisine,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Pencil
            className="w-4 h-4 text-yellow-500 cursor-pointer"
            onClick={() => handleEditRestaurant(row)}
          />
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() => handleDeleteRestaurant(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen p-6">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleAddRestaurant}
            className=" h-[30px] bg-black text-white text-sm px-3 rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Add New
          </button>
        </div>

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

export default AllRestaurants;
