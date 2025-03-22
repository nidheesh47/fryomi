import React, { useState } from "react";
import { FaUser, FaListAlt, FaAddressCard } from "react-icons/fa";
import useFetch from "../../../hooks/UseFetch";
import SavedAddresses from "./SavedAdress";
import Orders from "./Orders";
import Account from "./Account";

const ProfilePage = () => {
  const [profile, isLoading, error,fetchData] = useFetch("/user/profile");
  const [orders, ordersLoading, ordersError] = useFetch("/order/get-all-order");

  const [activeSection, setActiveSection] = useState("profile"); // Default to Profile section

  if (isLoading || ordersLoading) {
    return (
      <div className="text-center mt-10 text-lg font-medium">Loading...</div>
    );
  }

  if (error || ordersError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading data: {error?.message || ordersError?.message}
      </div>
    );
  }

  const lastThreeOrders = orders?.orders?.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative bg-gray-100">
      {/* Sticky Navigation Card */}
      <div className="lg:sticky top-0 left-4 mt-4 lg:mt-14 bg-white shadow-md rounded-lg p-4 lg:w-64 w-full h-auto lg:h-96">
        <nav className="space-y-4 flex flex-row lg:block justify-start">
          <div>
            <button
              className={`px-4 py-2 rounded-md mt-3 ${
                activeSection === "profile"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("profile")}
            >
              <FaUser className="inline-block mr-2" />
              Profile
            </button>
          </div>
          <div>
            <button
              className={`px-4 py-2 rounded-md ${
                activeSection === "orders"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("orders")}
            >
              <FaListAlt className="inline-block mr-2" />
              Orders
            </button>
          </div>
          <div>
            <button
              className={`px-4 py-2 rounded-md ${
                activeSection === "addresses"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("addresses")}
            >
              <FaAddressCard className="inline-block mr-2" />
              Addresses
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1  p-4 lg:p-6 mt-5 lg:ml-4">
        {activeSection === "profile" && <Account profile={profile} />}

        {activeSection === "orders" && (
          <Orders lastThreeOrders={lastThreeOrders} />
        )}
        {activeSection === "addresses" && (
          <div>
            <SavedAddresses addresses={profile.data.addresses} fetchData={fetchData}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
