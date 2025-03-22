import React, { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Toast from "react-hot-toast";
import { showAlert } from "../../utils/sweetAlert";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: "/cart/get-cart-items",
      });
      setCartItems(response?.data.data || null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Handle quantity change (increment/decrement)
  const updateQuantity = async (foodId, action) => {
    try {
      const response = await axiosInstance.post("/cart/add-quantity", {
        foodId,
        action,
      });
      Toast.success("Done");
      setCartItems(response?.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  // Remove an item from the cart
  const removeItem = async (foodId) => {
    try {
      const result = await showAlert("confirmDeletion");
      if (result.isConfirmed) {
        const response = await axiosInstance.delete(
          `cart/delete-cart-items/${foodId}`
        );
        if (response?.data.cart) {
          setCartItems(response.data.cart);
        } else {
          setCartItems(null);
        }
        await showAlert("deletionSuccess");
      }
    } catch (error) {
      console.error(error);
      await showAlert("deletionError");
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems?.items.reduce(
      (total, item) => total + item.totalItemPrice,
      0
    );
  };

  const handleProceedToCheckout = () => {
    if (cartItems) {
      navigate("/checkout", { state: { cart: cartItems } });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      {!cartItems ? (
        <p className="text-gray-500 text-lg text-center sm:text-left">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.items.map((item) => (
            <div
              key={item.foodId._id}
              className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 space-y-4 sm:space-y-0"
            >
              <img
                src={item.foodId.image}
                alt={item.foodId.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-grow text-center sm:text-left sm:ml-4">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {item.foodId.name}
                </h2>
                <p className="text-gray-500">₹{item.totalItemPrice}</p>
                <div className="flex items-center justify-center sm:justify-start mt-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => updateQuantity(item.foodId._id, "decrement")}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => updateQuantity(item.foodId._id, "increment")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                <p className="text-lg font-semibold">₹{item.totalItemPrice}</p>
                <IoTrashBin
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={() => removeItem(item.foodId._id)}
                />
              </div>
            </div>
          ))}

          <div className="mt-6 text-center sm:text-right">
            <p className="text-lg sm:text-xl font-semibold">
              Total: ₹{calculateTotal()}
            </p>
            <button
              disabled={!cartItems}
              onClick={handleProceedToCheckout}
              className="mt-4 px-6 py-2 bg-teal-800 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
