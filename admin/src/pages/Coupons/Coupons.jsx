import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useFetch from "../../Hooks/UseFetch";
import { useLocation, useNavigate } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";
import { formatDate } from "../../utils/Moment";

function Coupons() {
  const [coupons, isLoading, error, fetchData] = useFetch("/coupon/get-coupon");
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddCoupon = () => {
    navigate("/add-coupon");
  };

  const handleEditCoupon = (row) => {
    navigate("/add-coupon", { state: { data: row, refreshOnReturn: true } });
  };
  useEffect(() => {
    if (location.state?.refreshOnReturn) {
      fetchData();
      location.state.refreshOnReturn = false;
    }
  }, [location.state, fetchData]);

  const handleDeleteCoupon = async (id) => {
    if (window.confirm("Are you sure want to  delete coupon")) {
      try {
        await axiosInstance.delete(`/coupon/delete-coupon/${id}`);

        alert("coupon deleted successfully");
        fetchData();
      } catch (error) {
        console.error(error.message); // Log the error
      }
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "50px",
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Discount Percentage",
      selector: (row) => row.discountPercentage,
      sortable: true,
    },
    {
      name: "Max Discount Value",
      selector: (row) => row.maxDiscountValue,
      sortable: true,
    },
    {
      name: "Min Order Value",
      selector: (row) => row.minOrderValue,
      sortable: true,
    },
    {
      name: "Expiry Date",
      selector: (row) => formatDate(row.expiryDate),
      sortable: true,
    },
    {
      name: "Is Active",
      selector: (row) => (row.isActive ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() => handleDeleteCoupon(row._id)}
          />
          <Pencil
            className="w-4 h-4 text-yellow-500 cursor-pointer"
            onClick={() => handleEditCoupon(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 min-h-screen flex justify-start">
      <div className="w-full">
        
        <button
          onClick={handleAddCoupon}
          className="mb-4 bg-black text-white px-3 py-2 rounded-lg"
        >
          Add Coupon
        </button>
        {isLoading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : (
          <DataTable
            columns={columns}
            data={coupons?.coupons || []}
            pagination
            highlightOnHover
            responsive
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontSize: "16px",
                },
              },
              rows: {
                style: {
                  fontSize: "14px",
                  borderBottomColor: "#e5e7eb",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Coupons;
