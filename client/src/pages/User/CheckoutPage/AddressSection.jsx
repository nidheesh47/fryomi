import React, { useState } from "react";

const AddressSection = ({
  savedAddresses,
  selectedAddressId,
  setSelectedAddressId,
  setAddress,
  address
}) => {
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSelectAddress = (id) => {
    const selected = savedAddresses.find((addr) => addr._id === id);
    if (selected) {
      setAddress(selected); 
      setSelectedAddressId(id);
      setUseSavedAddress(true); 
    }
  };

  const handleManualEntry = () => {
    setUseSavedAddress(false);
    setSelectedAddressId(null); 
    setAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

      {/* Saved Address Section */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Saved Addresses:</h3>
        <ul className="space-y-2">
          {savedAddresses?.map((addr) => (
            <li key={addr._id}>
              <button
                type="button"
                onClick={() => handleSelectAddress(addr._id)}
                className={`block w-full p-4 border rounded ${
                  selectedAddressId === addr._id ? "bg-blue-100" : ""
                }`}
              >
                <p>{addr.name}</p>
                <p>
                  {addr.street}, {addr.city}, {addr.state} {addr.postalCode}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* OR Divider */}
      <div className="my-4 text-center">
        <span className="text-gray-500">OR</span>
      </div>

      {/* Manual Entry Form */}
      <div>
        <h3 className="font-semibold mb-2">Enter a New Address:</h3>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleAddressChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded"
              disabled={useSavedAddress}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Street:</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              placeholder="Street Address"
              className="w-full px-4 py-2 border rounded"
              disabled={useSavedAddress}
              required
            />
          </div>

          <div>
            <label className="block mb-1">City:</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="City"
              className="w-full px-4 py-2 border rounded"
              disabled={useSavedAddress}
              required
            />
          </div>

          <div>
            <label className="block mb-1">State:</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              placeholder="State"
              className="w-full px-4 py-2 border rounded"
              disabled={useSavedAddress}
              required
            />
          </div>

          <div>
            <label className="block mb-1">postalCode Code:</label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              placeholder="postalCode Code"
              className="w-full px-4 py-2 border rounded"
              disabled={useSavedAddress}
              required
            />
          </div>
        </form>
      </div>

      {/* Manual Entry Button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleManualEntry}
          className="text-blue-500 underline"
          disabled={!useSavedAddress}
        >
          Enter Address Manually
        </button>
      </div>
    </div>
  );
};

export default AddressSection;
