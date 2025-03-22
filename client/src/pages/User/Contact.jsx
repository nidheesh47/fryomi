import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Anytown, USA",
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const handleInputChange = (field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    console.log("Saved Contact Info:", contactInfo);
    navigate("/profile"); // Redirect to the profile page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-teal-800 mb-8 text-center">
          Contact Information
        </h1>

        {/* Name Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          {editMode.name ? (
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          ) : (
            <p className="p-3 bg-gray-50 rounded-lg text-gray-700">
              {contactInfo.name}
            </p>
          )}
          <button
            onClick={() => toggleEditMode("name")}
            className="mt-2 text-sm text-teal-600 hover:text-teal-800 font-medium"
          >
            {editMode.name ? "Save" : "Edit"}
          </button>
        </div>

        {/* Email Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          {editMode.email ? (
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          ) : (
            <p className="p-3 bg-gray-50 rounded-lg text-gray-700">
              {contactInfo.email}
            </p>
          )}
          <button
            onClick={() => toggleEditMode("email")}
            className="mt-2 text-sm text-teal-600 hover:text-teal-800 font-medium"
          >
            {editMode.email ? "Save" : "Edit"}
          </button>
        </div>

        {/* Phone Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          {editMode.phone ? (
            <input
              type="text"
              value={contactInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          ) : (
            <p className="p-3 bg-gray-50 rounded-lg text-gray-700">
              {contactInfo.phone}
            </p>
          )}
          <button
            onClick={() => toggleEditMode("phone")}
            className="mt-2 text-sm text-teal-600 hover:text-teal-800 font-medium"
          >
            {editMode.phone ? "Save" : "Edit"}
          </button>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          {editMode.address ? (
            <textarea
              value={contactInfo.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              rows="4"
            ></textarea>
          ) : (
            <p className="p-3 bg-gray-50 rounded-lg text-gray-700">
              {contactInfo.address}
            </p>
          )}
          <button
            onClick={() => toggleEditMode("address")}
            className="mt-2 text-sm text-teal-600 hover:text-teal-800 font-medium"
          >
            {editMode.address ? "Save" : "Edit"}
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-teal-800 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
