import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import useFetch from "../../Hooks/UseFetch";

const User = () => {

    const [users, isLoading, error] = useFetch('/user/get-users')

  // Columns for the data table
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    
  ];

  return (
    <div className="h-screen p-6">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : ( 
            <DataTable
          columns={columns}
          data={users}
          progressPending={isLoading}
          pagination
          highlightOnHover
          responsive
        />
        )}
      </div>
    </div>
  );
};

export default User;
