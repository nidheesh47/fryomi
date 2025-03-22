import React from "react";
import { Link } from "react-router-dom";

function Orders({lastThreeOrders}) {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 lg:p-6">
        <h2 className="text-lg font-bold mb-4">Your Orders</h2>
        {lastThreeOrders?.length > 0 ? (
          <ul className="text-gray-600 space-y-4">
            {lastThreeOrders.map((order) => (
              <li key={order._id} className="border-b pb-2">
                <p>
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
                <p>
                  <span className="font-medium">Restaurant:</span>{" "}
                  {order.restaurant?.name}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> ₹
                  {order.totalAmount}
                </p>
                <p>
                  <span className="font-medium">Final Price:</span> ₹
                  {order.finalPrice}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
        <div className="mt-4">
          <Link to="/order">
            <button className="btn bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded-md">
              View All Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Orders;
