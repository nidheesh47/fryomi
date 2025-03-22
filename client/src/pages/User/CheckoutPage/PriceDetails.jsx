import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

function PriceDetails({
  cart,
  discount,
  finalPrice,
  selectedCoupon,
  setSelectedCoupon,
  selectedAddressId,
  setSelectedAddressId,
  address,
}) {
  const navigate = useNavigate();

  if (!cart) {
    return (
      <div className="text-center text-gray-500">No cart data available</div>
    );
  }
  const { error, isLoading, Razorpay } = useRazorpay();
  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      return toast.error("Your cart is empty. Please add items to the cart.");
    }

    try {
      // Save address if not already selected
      let addressId = selectedAddressId;
      if (!addressId) {
        const response = await axiosInstance.post("/address/add", address);
        addressId = response.data.address._id;
        if (!addressId) {
          throw new Error("Failed to save the address.");
        }
        setSelectedAddressId(addressId); // Update state with the new address ID
      }

      // Proceed with the checkout
      const checkoutData = {
        restaurant: cart.restaurantId,
        cartId: cart._id,
        coupon: selectedCoupon || null,
        deliveryAddress: addressId, // Use the updated or existing address ID
      };

      const response = await axiosInstance.post(
        "/order/create-order",
        checkoutData
      );
      const orderId = response?.data?.order?._id;
      setSelectedCoupon(null);

      // Create payment
      const payment = await axiosInstance.post(`/order/${orderId}/payment`);
      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_ID_KEY}`,
        amount: payment.data.razorpayOrder.amount,
        currency: "INR",
        name: "Capstone",
        description: "Capstone",
        order_id: payment.data.razorpayOrder.id,
        handler: async (response) => {
          try {
            await axiosInstance.post("/order/verify-payment", response);
            setSelectedCoupon(null);
            navigate(`/invoice/${orderId}`, { state: { discount } });
            toast.success("Your order is placed successfully");
          } catch (error) {
            console.error("Verification failed:", error);
            toast.error("Payment verification failed.");
          }
        },
        theme: {
          color: "#1E1E1E",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error(
        "Failed to place the order:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Error while placing the order."
      );
    }
  };

  return (
    <>
      <div className="price-details bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Order Summary
        </h3>

        {/* Item List */}
        <div className="space-y-2 mb-4">
          {cart.items.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex-grow">
                <span className="">{item.foodId.name}</span>
                <span className="text-gray-500 ml-2">(x{item.quantity})</span>
              </div>
              <span className="">₹{item.totalItemPrice}</span>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="border-t pt-4">
          <div className="flex justify-between  text-lg">
            <span>Total Price:</span>
            <span>₹{cart.totalPrice}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 ">
              <span>Discount:</span>
              <span>- ₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Final Price:</span>
            <span>₹{finalPrice}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end ">
        <button
          onClick={handleCheckout}
          className="btn bg-teal-600 text-white font-normal hover:bg-teal-700"
        >
          Place Order
        </button>
      </div>
    </>
  );
}

export default PriceDetails;
