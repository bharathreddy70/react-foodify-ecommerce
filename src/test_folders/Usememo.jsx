import React, { useState } from "react";
import { calculateTotal, CalculateDiscount, getCouponDiscount } from "./discountutils";

function CartSummary({ cartItems }) {
  const [discountPerc, setDiscountPerc] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // ❌ runs on EVERY render
  console.log("⏳ totalPrice recalculating...");
  const totalPrice = calculateTotal(cartItems);

  console.log("⏳ discountedPrice recalculating...");
  const discountedPrice = CalculateDiscount(totalPrice, discountPerc);

  console.log("⏳ couponResult recalculating...");
  const couponResult = getCouponDiscount(couponCode, totalPrice);

  console.log("⏳ finalPrice recalculating...");
  const finalPrice = couponResult.isValidCoupon
    ? discountedPrice - couponResult.couponDiscountAmount
    : discountedPrice;

  return (
    <div>
      <p>Total: {totalPrice}</p>
      <p>After Discount: {discountedPrice}</p>
      {couponResult.isValidCoupon && (
        <p>Coupon Applied: -₹{couponResult.couponDiscountAmount}</p>
      )}
      <p>
        <strong>Final Price: {finalPrice}</strong>
      </p>

      <input
        type="email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        placeholder="Enter email"
      />
    </div>
  );
}

export default CartSummary;
