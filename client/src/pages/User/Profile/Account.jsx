import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

const Account = ({profile}) => {
      const [isEditing, setIsEditing] = useState(false);
     const [editableProfile, setEditableProfile] = useState(null);
     
  const toggleEdit = () => {
    if (isEditing) {
      // Save logic here
    }
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableProfile(profile?.data.profile);
    }
  };
    const handleChange = (e) => {
        setEditableProfile({ ...editableProfile, [e.target.name]: e.target.value });
      };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <h1 className="text-2xl font-bold mb-2 lg:mb-0">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editableProfile?.name || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-1 w-full lg:w-auto focus:outline-orange-600"
              />
            ) : (
              profile?.data.profile.name
            )}
          </h1>
          <button
            className="text-orange-600 hover:text-orange-700"
            onClick={toggleEdit}
          >
            {isEditing ? <FaSave /> : <FaEdit />}
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editableProfile?.email || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-orange-600"
            />
          ) : (
            profile?.data.profile.email
          )}
        </p>
      </div>
    </div>
  );
};

export default Account;
