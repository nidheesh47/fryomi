import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { axiosInstance } from '../../config/axiosInstance'; 
import DataTable from 'react-data-table-component';
import { Pencil, Trash2 } from 'lucide-react';

const MenuItems = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch menu items for the restaurant
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/restaurant/${id}`);
      setMenuItems(response.data.menuItems);
    } catch (err) {
      setError("Failed to fetch menu items.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to AddItems page with the restaurant ID
  const handleAddMenuItems = () => {
    navigate(`/addItems/${id}`);
  };
 const handleEditMenuItems = (row) => {
    console.log(row)
    navigate(`/addItems/${id}`,{state:{data:row}}); 
  };

  const handleDeleteMenuItems = async (menuId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await axiosInstance.delete(`/restaurant/${id}/${menuId}/deleteMenu`);
        alert("menu item deleted successfully.");
        fetchMenuItems()

      } catch {
        alert("Failed to delete menu item. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [id]);

  // Columns configuration for DataTable
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px"
    },
    {
      name: "Photo",
      selector: (row) => (
        <div className='p-2'>
          <img className='w-20 ' src={row.image} />
        </div>
      ) ,
      sortable: true,
      width: "200px"
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      
    },
    {
      name: "Price",
      selector: (row) => `$${row.price}`,
      sortable: true,
      
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Pencil
            className="w-4 h-4 text-yellow-500 cursor-pointer"
            onClick={() => handleEditMenuItems(row)} 
          />
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() => handleDeleteMenuItems(row._id)} 
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-black text-white px-4 mx-8 py-2 rounded"
          onClick={handleAddMenuItems}
        >
          Add Items
        </button>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-20">{error}</div>
        ) : (
          <DataTable
            columns={columns}
            data={menuItems}
            pagination
            highlightOnHover
            responsive
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontSize: '16px',
                },
              },
              rows: {
                style: {
                  fontSize: '14px',
                  borderBottomColor: '#e5e7eb',
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MenuItems;
