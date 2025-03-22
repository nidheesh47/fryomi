import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";

function Invoice() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { state } = useLocation();
  const discount = state?.discount;

  const [order, isLoading, error] = useFetch(
    `/order/get-order-by-id/${orderId}`
  );
  const orderData = order?.order;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading order data: {error.message}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Invoice Details</h2>
        <p>
          <strong>Invoice Number:</strong> {orderData._id}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(orderData.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <p>
          <strong>Name:</strong> {orderData.user.name}
        </p>
        <p>
          <strong>Email:</strong> {orderData.user.email}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state}`}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Restaurant Details</h2>
        <p>
          <strong>Name:</strong> {orderData.restaurant.name}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.cartId.items.map((item) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.foodId.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{(item.totalItemPrice / item.quantity).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{item.totalItemPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-right mt-6">
        <div className="flex gap-2 justify-end">
          <p>Coupon Discount :</p>
          {discount && <p>{discount}</p>}
        </div>
        <h2 className="text-xl font-semibold">
          Total: ₹{orderData.finalPrice.toFixed(2)}
        </h2>
      </div>

      {/* Home Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Continue Order
        </button>
      </div>
    </div>
  );
}

export default Invoice;
