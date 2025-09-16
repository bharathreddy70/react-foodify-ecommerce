
import { useDispatch, useSelector } from "react-redux";
import {
  addOrders,
  addToCart,
  clearCart,
  reduceQty,
  removeFromCart,
} from "./store";
import "./stylesheets/cart.css";
import {
  calculateTotal,
  CalculateDiscount,
  getCouponDiscount,
} from "./discountUtils";
import emailjs from "@emailjs/browser";
import { useState, useEffect, useMemo } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import ReactDOM from "react-dom/client";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Persistent Discount State
  const [discountPerc, setDiscountPerc] = useState(() => {
    const saved = localStorage.getItem("discountPerc");
    return saved ? JSON.parse(saved) : 0;
  });

  // Persistent Coupon State
  const [couponCode, setCouponCode] = useState(() => {
    const saved = localStorage.getItem("couponCode");
    return saved || "";
  });

  const [couponResult, setCouponResult] = useState(() => {
    const saved = localStorage.getItem("couponResult");
    return saved
      ? JSON.parse(saved)
      : {
          isValidCoupon: false,
          couponDiscountPercentage: 0,
          couponDiscountAmount: 0,
        };
  });

  // Persistent Payment Method
  const [payment, setPayment] = useState(() => {
    const saved = localStorage.getItem("paymentMethod");
    return saved || "";
  });

  const [customerEmail, setCustomerEmail] = useState("");

  // ✅ Total Price (via util + useMemo)
  const totalPrice = useMemo(() => {
    return calculateTotal(cartItems);
  }, [cartItems]);

  const taxAmount = totalPrice * 0.18;

  const discountedPrice =
    discountPerc > 0 ? CalculateDiscount(totalPrice, discountPerc) : totalPrice;

  const finalPrice = Math.max(
    couponResult.isValidCoupon
      ? discountedPrice - couponResult.couponDiscountAmount
      : discountedPrice,
    0
  );

  const payableAmount = (finalPrice + taxAmount + 50).toFixed(2);

  // Reset discounts/coupons when cart becomes empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setDiscountPerc(0);
      setCouponCode("");
      setCouponResult({
        isValidCoupon: false,
        couponDiscountPercentage: 0,
        couponDiscountAmount: 0,
      });
      setPayment("");
    }
  }, [cartItems]);

  // Sync states to localStorage
  useEffect(() => {
    localStorage.setItem("discountPerc", JSON.stringify(discountPerc));
  }, [discountPerc]);

  useEffect(() => {
    localStorage.setItem("couponCode", couponCode);
  }, [couponCode]);

  useEffect(() => {
    localStorage.setItem("couponResult", JSON.stringify(couponResult));
  }, [couponResult]);

  // Recalculate coupon discount
  useEffect(() => {
    if (couponCode) {
      const result = getCouponDiscount(couponCode, totalPrice);
      setCouponResult(result);
    }
  }, [cartItems, couponCode, totalPrice]);

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponCode, totalPrice);
    setCouponResult(result);
  };

  const handlePurchase = async () => {
    if (cartItems.length === 0) {
      swal.fire({
        title: "🛒 Cart Empty",
        text: "Please add items before checkout",
        icon: "warning",
        confirmButtonColor: "#8e24aa",
      });
      return;
    }

    if (!customerEmail) {
      swal.fire({
        title: "⚠️ Email Required",
        text: "Please enter your email before checkout.",
        icon: "warning",
        confirmButtonColor: "#8e24aa",
      });
      return;
    }

    // Step 1: Select Payment Mode
    const { value: method } = await swal.fire({
      title: "💳 Select Payment Mode",
      input: "radio",
      inputOptions: {
        qr: "📱 Pay with QR Code (UPI)",
        card: "💳 Pay with Credit/Debit Card",
      },
      confirmButtonText: "Proceed ➡️",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      background: "linear-gradient(135deg, #ffffff, #d1f2eb)",
      confirmButtonColor: "#43a047",
      cancelButtonColor: "#888",
      inputValidator: (value) => {
        if (!value) return "Please select a payment method!";
      },
    });

    if (!method) return;

    // Step 2A: Handle QR Payment
    if (method === "qr") {
      const result = await swal.fire({
        title: "📲 Scan & Pay",
        html: `<div id="qr-container" style="display:flex;justify-content:center;margin-top:15px;"></div>
               <p style="margin-top:10px;font-size:14px;color:#666">
                 Scan this code to pay ₹${payableAmount}
               </p>`,
        didOpen: () => {
          const qrDiv = document.getElementById("qr-container");
          if (qrDiv) {
            const qrElement = document.createElement("div");
            qrDiv.appendChild(qrElement);

            ReactDOM.createRoot(qrElement).render(
              <QRCode
                value={`upi://pay?pa=bharathreddy889900@oksbi&pn=MyStore&am=${payableAmount}&cu=INR`}
                size={200}
              />
            );
          }
        },
        showCancelButton: true,
        confirmButtonText: "✅ I Paid",
        cancelButtonText: "❌ Cancel",
        confirmButtonColor: "#ef6c00",
        cancelButtonColor: "#888",
      });

      if (!result.isConfirmed) {
        swal.fire("Payment Cancelled", "You are back in your cart", "info");
        return;
      }

      sendOrderEmail();
    }

    // Step 2B: Handle Card Payment
    else if (method === "card") {
      const result = await swal.fire({
        title: "💳 Enter Card Details",
        html: `
          <div style="display:flex;flex-direction:column;gap:10px;">
            <input type="text" id="cardNumber" class="swal2-input" placeholder="💳 Card Number">
            <input type="text" id="expiry" class="swal2-input" placeholder="📅 Expiry (MM/YY)">
            <input type="text" id="cvv" class="swal2-input" placeholder="🔒 CVV">
          </div>
          <p style="margin-top:10px;font-size:14px;color:#666">
            You will be charged <b>₹${payableAmount}</b>
          </p>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const number = document.getElementById("cardNumber").value;
          const expiry = document.getElementById("expiry").value;
          const cvv = document.getElementById("cvv").value;
          if (!number || !expiry || !cvv) {
            swal.showValidationMessage("All fields are required!");
            return false;
          }
          return { number, expiry, cvv };
        },
        showCancelButton: true,
        confirmButtonText: "✅ Pay Now",
        cancelButtonText: "❌ Cancel",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        confirmButtonColor: "#1e88e5",
        cancelButtonColor: "#888",
      });

      if (!result.isConfirmed) {
        swal.fire("Payment Cancelled", "You are back in your cart", "info");
        return;
      }

      sendOrderEmail();
    }
  };

  // 🔧 Email Sending
  // 🔧 Email Sending
const sendOrderEmail = () => {
  const order_id = new Date().getTime();

  const templateParams = {
    order_id,
    orders: cartItems.map((item) => ({
      name: item.name,
      price: (item.price * item.quantity).toFixed(2),
      units: item.quantity,
      image_url: item.imageUrl,
    })),
    cost: {
      original: totalPrice.toFixed(2),
      discount: discountPerc > 0 ? (totalPrice - discountedPrice).toFixed(2) : "0.00",
      coupon: couponResult.isValidCoupon
        ? couponResult.couponDiscountAmount.toFixed(2)
        : "0.00",
      tax: taxAmount.toFixed(2),
      shipping: "50.00",
      total: payableAmount,
    },
    email: customerEmail,
  };

  emailjs
    .send(
      "service_uuus89i",
      "template_knhn41s",
      templateParams,
      "p37rBWkd44SPjdRet"
    )
    .then(() => {
      swal.fire({
        title: "🎉 Payment Successful!",
        text: "Confirmation email has been sent.",
        icon: "success",
        confirmButtonColor: "#43a047",
      });

      const now = new Date();
      const purchaseDetails = {
        o_id: order_id,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        items: [...cartItems],
        subTotal: totalPrice,
        discountPerc,
        couponAmount: couponResult.couponDiscountAmount,
        tax: taxAmount.toFixed(2),
        finalAmount: payableAmount,
        totalPrice: payableAmount,
        paymentMode: "online",
      };

      dispatch(addOrders(purchaseDetails));
      dispatch(clearCart());
    })
    .catch(() => {
      swal.fire("❌ Failed", "Could not send confirmation email", "error");
    });

  setDiscountPerc(0);
  setCouponCode("");
  setCouponResult({
    isValidCoupon: false,
    couponDiscountPercentage: 0,
    couponDiscountAmount: 0,
  });
  setPayment("");
};


  return (
    <>
      <section className="cart-section container-flex">
        {/* LEFT BLOCK: CART ITEMS */}
        <div className="cart-items-block">
          <h2 className="section-title">🛒 Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is currently empty</p>
          ) : (
            <ul className="cart-list">
              {cartItems.map((item) => {
                const subtotal = item.price * item.quantity;
                return (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-left">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="cart-img"
                      />
                      <div className="cart-details">
                        <span className="cart-name">{item.name}</span>
                        <span className="cart-price">
                          ₹{item.price}/{item.unit} × {item.quantity}
                        </span>
                        <span className="cart-subtotal">
                          = ₹{subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="cart-actions">
                      <button
                        className="btn-cart plus"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </button>
                      <button
                        className="btn-cart minus"
                        onClick={() => dispatch(reduceQty(item.id))}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <button
                        className="btn-cart remove"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* RIGHT BLOCK: SUMMARY */}
        {cartItems.length > 0 && (
          <aside className="cart-summary-block">
            <h3 className="summary-title">Order Summary</h3>
            <div className="cart-total">
              {/* Original Price */}
              <div className="summary-row">
                <span>Original</span>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              {/* Discount */}
              {discountPerc > 0 ? (
                <div className="summary-row discount-applied">
                  <span>Discount ({discountPerc}%)</span>
                  <strong>- ₹{(totalPrice - discountedPrice).toFixed(2)}</strong>
                </div>
              ) : (
                <div className="summary-row">
                  <span>Discount</span>
                  <strong>0</strong>
                </div>
              )}

              {/* Coupon */}
              {couponResult.isValidCoupon ? (
                <div className="summary-row">
                  <span>Coupon ({couponResult.couponDiscountPercentage}%)</span>
                  <strong>- ₹{couponResult.couponDiscountAmount.toFixed(2)}</strong>
                </div>
              ) : (
                <div className="summary-row">
                  <span>Coupon</span>
                  <span>Not Applied</span>
                </div>
              )}

              {/* Tax & Shipping */}
              <div className="summary-row">
                <span>Tax (18% GST)</span>
                <strong>₹{taxAmount.toFixed(2)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>₹50.00</strong>
              </div>

              {/* Final Total */}
              <div className="final-price">
                <span>Total</span>
                <span>₹{payableAmount}</span>
              </div>
            </div>

            {/* Discount Buttons */}
            <div className="discount-buttons">
              {[10, 20, 30].map((perc) => (
                <button key={perc} onClick={() => setDiscountPerc(perc)}>
                  {perc}% Off
                </button>
              ))}
              {discountPerc > 0 && (
                <button onClick={() => setDiscountPerc(0)}>Reset</button>
              )}
            </div>

            {/* Coupon Input */}
            <div className="mt-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-start"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ borderRight: "0", boxShadow: "none", outline: "none" }}
                />
                <button
                  className="btn btn-primary rounded-end"
                  type="button"
                  onClick={handleApplyCoupon}
                  style={{ boxShadow: "none", outline: "none" }}
                >
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="checkout-block">
              <label className="checkout-label">Email for Order Confirmation:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            <button className="btn-purchase" onClick={handlePurchase}>
              ✅ Complete Purchase
            </button>
          </aside>
        )}
      </section>
    </>
  );
}

export default Cart;
