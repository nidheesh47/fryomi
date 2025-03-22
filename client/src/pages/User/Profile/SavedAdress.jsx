import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { axiosInstance } from "../../../config/axiosInstance";

function SavedAddresses({ addresses, fetchData }) {
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleDelete = async (addressId) => {
    try {
      await axiosInstance.delete(`/address/deleteAddress/${addressId}`);
      fetchData()
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address._id);
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/address/updateAddress/${editingAddress}`, formData);
      setEditingAddress(null); // Exit edit mode
      fetchData()
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Your Saved Addresses
      </h2>
      {addresses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-scroll overflow-x-hidden">
          {addresses.map((address) =>
            editingAddress === address._id ? (
              <div
                key={address._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
              >
                <h3 className="font-semibold text-gray-700 mb-2">
                  Edit Address
                </h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Street"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={() => setEditingAddress(null)}
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={address._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
              >
                <h3 className="font-semibold text-gray-700 mb-2">
                  {address.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {address.street}, {address.city}, {address.state} -{" "}
                  {address.postalCode}
                </p>
                <div className="flex justify-end mt-4 space-x-4 text-gray-500">
                  <button
                    onClick={() => handleEdit(address)}
                    className="flex items-center space-x-1 hover:text-blue-500"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(address._id)}
                    className="flex items-center space-x-1 hover:text-red-500"
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No addresses found.</p>
        </div>
      )}
    </div>
  );
}

export default SavedAddresses;
