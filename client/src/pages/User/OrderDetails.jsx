import React, { useState } from "react";
import useFetch from "../../hooks/UseFetch";

const OrderDetails = () => {
  const [orderData, loading, errors] = useFetch("/order/get-all-order");
  const orders = orderData?.orders;

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the index range for the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

  // Check for loading and errors before rendering orders
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }
  if (errors) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        Error loading orders: {errors.message}
      </div>
    );
  }

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of pages
  const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Your Orders
      </h1>

      {orders && orders.length > 0 ? (
        <>
          {currentOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 sm:p-8"
            >
              <h2 className="text-sm font-semibold text-gray-700">
                Order #{order._id}
              </h2>
              <p className="text-gray-600 mt-2 text-sm ">
                Status:{" "}
                <span className="font-medium text-green-600">
                  {order.status}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm">
                Restaurant:{" "}
                <span className="font-medium ">{order.restaurant?.name}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Delivery Address:{" "}
                {order.deliveryAddress
                  ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}`
                  : "No delivery address provided"}
              </p>

              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Order Items
                </h3>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  {order.cartId?.items?.map((item) => (
                    <li key={item._id} className="text-gray-600">
                      <span className="font-medium">{item.foodId?.name}</span> -{" "}
                      {item.quantity} x ₹{item.totalItemPrice}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-sm font-semibold  text-gray-800">
                  Total Amount: ₹{order?.totalAmount}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Final Price (after discount): ₹{order?.finalPrice}
                </p>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-teal-700 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 transition-all"
            >
              &lt; Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-lg text-gray-800 font-semibold hover:bg-teal-700 hover:text-white transition-all ${
                  currentPage === index + 1
                    ? "bg-teal-800 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-teal-700 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 transition-all"
            >
              Next &gt;
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
