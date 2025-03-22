import React, { useState } from "react";
import AddressSection from "./AddressSection";
import CouponSection from "./CouponSection";
import PriceDetails from "./PriceDetails";
import { useLocation } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";

function CheckoutPage() {
  const location = useLocation();
  const [savedAddresses, isLoading, error] = useFetch("/address/addresses");
   const [address, setAddress] = useState({
     name: "",
        street: "",
        city: "",
        state: "",
        postalCode : "",
   });
   const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { cart } = location.state || {};
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(cart ? cart.totalPrice : 0);

  const handleDiscountApplied = (discount, finalPrice) => {
    setDiscount(discount);
    setFinalPrice(finalPrice);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen bg-gray-50 p-6">
      {/* Address Section */}
      <div className="col-span-2 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <AddressSection address={address} setAddress={setAddress} savedAddresses={savedAddresses} setSelectedAddressId={setSelectedAddressId} selectedAddressId={selectedAddressId}/>
      </div>
      {/* Coupon Section */}
      <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold  mb-4">Apply Coupon</h2>
      <CouponSection orderValue={cart.totalPrice} onDiscountApplied={handleDiscountApplied} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon } />
        <h2 className="text-xl font-semibold mb-4 mt-8">Price Details</h2>
        <PriceDetails cart={cart} discount={discount} finalPrice={finalPrice} selectedCoupon={selectedCoupon} selectedAddressId={selectedAddressId} setSelectedCoupon={setSelectedCoupon } setSelectedAddressId={setSelectedAddressId} address={address}/>
      </div>
    </div>
  );
}

export default CheckoutPage;
