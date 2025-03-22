import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router";

const AddCoupon = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data} = location.state || {};
  const isEdit = Boolean(data);
  const [formData, setFormData] = useState({
    code: data?.code || "",
    discountPercentage: data?.discountPercentage || "",
    maxDiscountValue: data?.maxDiscountValue || "",
    minOrderValue: data?.minOrderValue || "",
    expiryDate: data?.expiryDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const endpoint = data
        ? `/coupon/update-coupon/${data._id}`
        : "/coupon/create-coupon";

      const response = await axiosInstance.post(endpoint, formData);
      if (response.status === 200) {

        alert(response?.data?.message);
        setFormData({
          code: "",
          discountPercentage: "",
          maxDiscountValue: "",
          minOrderValue: "",
          expiryDate: "",
        });
      }
    } catch (error) {
      alert(
        `Error: ${
          error.response ? error.response?.data?.message : error.message
        }`
      );
    } finally {
      navigate(-1, { state: { refreshOnReturn: true } });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-white font-medium">
            Coupon Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discountPercentage"
            className="block text-white font-medium"
          >
            Discount Percentage
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="maxDiscountValue"
            className="block text-white font-medium"
          >
            Maximum Discount Value
          </label>
          <input
            type="number"
            id="maxDiscountValue"
            name="maxDiscountValue"
            value={formData.maxDiscountValue}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minOrderValue"
            className="block text-white font-medium"
          >
            Minimum Order Value
          </label>
          <input
            type="number"
            id="minOrderValue"
            name="minOrderValue"
            value={formData.minOrderValue}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-white font-medium">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Coupon
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCoupon;
