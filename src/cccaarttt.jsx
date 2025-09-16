//new one-----------
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addOrders,
//   addToCart,
//   clearCart,
//   reduceQty,
//   removeFromCart,
// } from "./store";
// import "./stylesheets/cart.css";
// import {
//   calculateTotal,
//   CalculateDiscount,
//   getCouponDiscount,
// } from "./discountUtils";
// import emailjs from "@emailjs/browser";
// import { useState, useEffect, useMemo } from "react";
// import QRCode from "react-qr-code";
// import { toast } from "react-toastify";
// import swal from "sweetalert2";
// import ReactDOM from "react-dom/client";


// function Cart() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);

//   // Persistent Discount State
//   const [discountPerc, setDiscountPerc] = useState(() => {
//     const saved = localStorage.getItem("discountPerc");
//     return saved ? JSON.parse(saved) : 0;
//   });

//   // Persistent Coupon State
//   const [couponCode, setCouponCode] = useState(() => {
//     const saved = localStorage.getItem("couponCode");
//     return saved || "";
//   });

//   const [couponResult, setCouponResult] = useState(() => {
//     const saved = localStorage.getItem("couponResult");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           isValidCoupon: false,
//           couponDiscountPercentage: 0,
//           couponDiscountAmount: 0,
//         };
//   });

//   // Persistent Payment Method
//   const [payment, setPayment] = useState(() => {
//     const saved = localStorage.getItem("paymentMethod");
//     return saved || "";
//   });

//   const [customerEmail, setCustomerEmail] = useState("");

//   // Price Calculations
//   // const totalPrice = calculateTotal(cartItems);
//   // ✅ 1. total price (just calls the util function)
//   const totalPrice = useMemo(() => {
//     console.log("✅ totalPrice recalculated");
//     return calculateTotal(cartItems);   // <--- using util function
//   }, [cartItems]);

//   const taxAmount = totalPrice * 0.18;

//   const discountedPrice =
//     discountPerc > 0 ? CalculateDiscount(totalPrice, discountPerc) : totalPrice;

//   const finalPrice = Math.max(
//     couponResult.isValidCoupon
//       ? discountedPrice - couponResult.couponDiscountAmount
//       : discountedPrice,
//     0
//   );

//   // Reset discounts/coupons when cart becomes empty
// useEffect(() => {
//   if (cartItems.length === 0) {
//     setDiscountPerc(0);
//     setCouponCode("");
//     setCouponResult({
//       isValidCoupon: false,
//       couponDiscountPercentage: 0,
//       couponDiscountAmount: 0,
//     });
//     setPayment("");
    
//   }
// }, [cartItems]);


//   // Sync states to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("discountPerc", JSON.stringify(discountPerc));
//   }, [discountPerc]);

//   useEffect(() => {
//     localStorage.setItem("couponCode", couponCode);
//   }, [couponCode]);

//   useEffect(() => {
//     localStorage.setItem("couponResult", JSON.stringify(couponResult));
//   }, [couponResult]);

 
//   // Recalculate coupon discount whenever cart changes
//   useEffect(() => {
//     if (couponCode) {
//       const result = getCouponDiscount(couponCode, totalPrice);
//       setCouponResult(result);
//     }
//   }, [cartItems, couponCode, totalPrice]);

//   const handleApplyCoupon = () => {
//     const result = getCouponDiscount(couponCode, totalPrice);
//     setCouponResult(result);
//   };





// const handlePurchase = async () => {
//   if (cartItems.length === 0) {
//     swal.fire({
//       title: "🛒 Cart Empty",
//       text: "Please add items before checkout",
//       icon: "warning",
//       confirmButtonColor: "#8e24aa",
//     });
//     return;
//   }

//   if (!customerEmail) {
//     swal.fire({
//       title: "⚠️ Email Required",
//       text: "Please enter your email before checkout.",
//       icon: "warning",
//       confirmButtonColor: "#8e24aa",
//     });
//     return;
//   }

//   // Step 1: Select Payment Mode
//   const { value: method } = await swal.fire({
//     title: "💳 Select Payment Mode",
//     input: "radio",
//     inputOptions: {
//       qr: "📱 Pay with QR Code (UPI)",
//       card: "💳 Pay with Credit/Debit Card",
//     },
//     confirmButtonText: "Proceed ➡️",
//     showCancelButton: true,
//     cancelButtonText: "Cancel",
//     background: "linear-gradient(135deg, #ffffff, #d1f2eb)",
//     confirmButtonColor: "#43a047",
//     cancelButtonColor: "#888",
//     inputValidator: (value) => {
//       if (!value) return "Please select a payment method!";
//     },
//   });

//   if (!method) return;

//   // Step 2A: Handle QR Payment
//   if (method === "qr") {
//     const result = await swal.fire({
//       title: "📲 Scan & Pay",
//       html: `<div id="qr-container" style="display:flex;justify-content:center;margin-top:15px;"></div>
//              <p style="margin-top:10px;font-size:14px;color:#666">Scan this code to pay ₹${finalPrice.toFixed(
//                2
//              )}</p>`,
//       didOpen: () => {
//         const qrDiv = document.getElementById("qr-container");
//         if (qrDiv) {
//           const qrElement = document.createElement("div");
//           qrDiv.appendChild(qrElement);

//           ReactDOM.createRoot(qrElement).render(
//             <QRCode
//               value={`upi://pay?pa=bharathreddy889900@oksbi&pn=MyStore&am=${finalPrice.toFixed(
//                 2
//               )}&cu=INR`}
//               size={200}
//             />
//           );
//         }
//       },
//       showCancelButton: true,
//       confirmButtonText: "✅ I Paid",
//       cancelButtonText: "❌ Cancel",
//       confirmButtonColor: "#ef6c00",
//       cancelButtonColor: "#888",
//     });

//     if (!result.isConfirmed) {
//       swal.fire("Payment Cancelled", "You are back in your cart", "info");
//       return;
//     }

//     // ✅ Send email immediately after payment
//     sendOrderEmail();
//   }

//   // Step 2B: Handle Card Payment
//   else if (method === "card") {
//     const result = await swal.fire({
//       title: "💳 Enter Card Details",
//       html: `
//         <div style="display:flex;flex-direction:column;gap:10px;">
//           <input type="text" id="cardNumber" class="swal2-input" placeholder="💳 Card Number">
//           <input type="text" id="expiry" class="swal2-input" placeholder="📅 Expiry (MM/YY)">
//           <input type="text" id="cvv" class="swal2-input" placeholder="🔒 CVV">
//         </div>
//       `,
//       focusConfirm: false,
//       preConfirm: () => {
//         const number = document.getElementById("cardNumber").value;
//         const expiry = document.getElementById("expiry").value;
//         const cvv = document.getElementById("cvv").value;
//         if (!number || !expiry || !cvv) {
//           swal.showValidationMessage("All fields are required!");
//           return false;
//         }
//         return { number, expiry, cvv };
//       },
//       showCancelButton: true,
//       confirmButtonText: "✅ Pay Now",
//       cancelButtonText: "❌ Cancel",
//       background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
//       confirmButtonColor: "#1e88e5",
//       cancelButtonColor: "#888",
//     });

//     if (!result.isConfirmed) {
//       swal.fire("Payment Cancelled", "You are back in your cart", "info");
//       return;
//     }

//     // ✅ Send email immediately after payment
//     sendOrderEmail();
//   }
// };

// // 🔧 Extracted Email Sending Logic
// const sendOrderEmail = () => {
//   const order_id = new Date().getTime();
//   const templateParams = {
//     order_id,
//     orders: cartItems.map((item) => ({
//       name: item.name,
//       price: (item.price * item.quantity).toFixed(2),
//       units: item.quantity,
//       image_url: item.imageUrl,
//     })),
//     cost: {
//       shipping: 50,
//       tax: taxAmount.toFixed(2),
//       total: finalPrice.toFixed(2),
//     },
//     email: customerEmail,
    
    
//   };
  
//   emailjs
//     .send("service_uuus89i", "template_knhn41s", templateParams, "p37rBWkd44SPjdRet")
//     .then(() => {
//       swal.fire({
//         title: "🎉 Payment Successful!",
//         text: "Confirmation email has been sent.",
//         icon: "success",
//         confirmButtonColor: "#43a047",
//       });
//       const now = new Date();
//       const purchaseDetails = {
//         o_id: order_id,
//         date: now.toLocaleDateString(),
//         time: now.toLocaleTimeString(), 
//         items: [...cartItems],
//         subTotal: totalPrice,
//         discountPerc,
//         couponAmount: couponResult.couponDiscountAmount,
//         finalAmount: finalPrice,
//         totalPrice: finalPrice, // keep for backward compatibility
//         paymentMode: "online", // set "cash" if you add COD later
//       };

      
//       dispatch(addOrders(purchaseDetails));
//       dispatch(clearCart());
//     })
//     .catch(() => {
//       swal.fire("❌ Failed", "Could not send confirmation email", "error");
//     });

//   // Reset states
//   setDiscountPerc(0);
//   setCouponCode("");
//   setCouponResult({
//     isValidCoupon: false,
//     couponDiscountPercentage: 0,
//     couponDiscountAmount: 0,
//   });
//   setPayment("");
// };





//   // const handleCheckout = () => {
    
//   // };

//   return (
//     <>
//       <section className="cart-section container-flex">
//         {/* LEFT BLOCK: CART ITEMS */}
//         <div className="cart-items-block">
//           <h2 className="section-title">🛒 Your Cart</h2>
//           {cartItems.length === 0 ? (
//             <p className="empty-cart">Your cart is currently empty</p>
//           ) : (
//             <ul className="cart-list">
//               {cartItems.map((item) => {
//                 const subtotal = item.price * item.quantity;
//                 return (
//                   <li key={item.id} className="cart-item">
//                     <div className="cart-item-left">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="cart-img"
//                       />
//                       <div className="cart-details">
//                         <span className="cart-name">{item.name}</span>
//                         <span className="cart-price">
//                           ₹{item.price}/{item.unit} × {item.quantity}
//                         </span>
//                         <span className="cart-subtotal">
//                           = ₹{subtotal.toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="cart-actions">
//                       <button
//                         className="btn-cart plus"
//                         onClick={() => dispatch(addToCart(item))}
//                       >
//                         +
//                       </button>
//                       <button
//                         className="btn-cart minus"
//                         onClick={() => dispatch(reduceQty(item))}
//                         disabled={item.quantity === 1}
//                       >
//                         -
//                       </button>
//                       <button
//                         className="btn-cart remove"
//                         onClick={() => dispatch(removeFromCart(item))}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>

//         {/* RIGHT BLOCK: SUMMARY */}
//         {cartItems.length > 0 && (
//           <aside className="cart-summary-block">
//   <h3 className="summary-title">Order Summary</h3>
//   <div className="cart-total">
//     { (
//       <p className="original-total">
//         Original:         <span className="cart-price">₹</span>{totalPrice.toFixed(2)}
//       </p>
//     )}

//     {/* Discount Info */}
//     {discountPerc > 0 ? (
//       <p className="discount-applied">
//         Discount: {discountPerc}% → 
//         <span style={{ width: "9px" }}> -</span>
//         <span className="cart-price">₹</span>
//         {(totalPrice - discountedPrice).toFixed(2)}
//       </p>
//     ) : (
//       <p className="discount-applied">Discount: {discountPerc}%</p>
//     )}

//     {/* Coupon Info */}
//     {couponResult.isValidCoupon ? (
//       <div className="coupon-result">
//         <h5 className="text-success fw-bold">
//           Coupon Applied: {couponResult.couponDiscountPercentage}%
//         </h5>
//         <p className="text-muted">
//           You saved ₹{couponResult.couponDiscountAmount.toFixed(2)}
//         </p>
//       </div>
//     ) : (
//       <p className="text-success fw-bold fs-5">Coupon: Not Applied!</p>
//     )}

//     {/* Tax & Shipping */}
//     <p className="text-muted">
//       Tax (18% GST): <strong><span className="cart-price">₹</span>{taxAmount.toFixed(2)}</strong>
//     </p>
//     <p className="text-muted">
//       Shipping: <strong><span className="cart-price">₹</span>50.00</strong>
//     </p>

//     {/* Final Total */}
//     <div className="final-price">
//       <strong>Total: ₹{(finalPrice + taxAmount + 50).toFixed(2)}</strong>
//     </div>
//   </div>

//   {/* Discount Buttons */}
//   <div className="discount-buttons">
//     {[10, 20, 30].map((perc) => (
//       <button key={perc} onClick={() => setDiscountPerc(perc)}>
//         {perc}% Off
//       </button>
//     ))}
//     {discountPerc > 0 && (
//       <button onClick={() => setDiscountPerc(0)}>Reset</button>
//     )}
//   </div>

//   {/* Coupon Input */}
//   <div className="mt-3">
//     <div className="input-group">
//       <input
//         type="text"
//         className="form-control rounded-start"
//         placeholder="Enter coupon code"
//         value={couponCode}
//         onChange={(e) => setCouponCode(e.target.value)}
//         style={{ borderRight: "0", boxShadow: "none", outline: "none" }}
//       />
//       <button
//         className="btn btn-primary rounded-end"
//         type="button"
//         onClick={handleApplyCoupon}
//         style={{ boxShadow: "none", outline: "none" }}
//       >
//         Apply Coupon
//       </button>
//     </div>
//   </div>

//   {/* Email Input */}
//   <div className="checkout-block">
//     <label className="checkout-label">Email for Order Confirmation:</label>
//     <input
//       type="email"
//       placeholder="Enter your email"
//       value={customerEmail}
//       onChange={(e) => setCustomerEmail(e.target.value)}
//     />
//   </div>

//   <button className="btn-purchase" onClick={handlePurchase}>
//     ✅ Complete Purchase
//   </button>
//          </aside>

//         )}
//       </section>
//     </>
//   );
// }



// export default Cart;













































// import { useDispatch, useSelector } from "react-redux";
// import {
//   addOrders,
//   addToCart,
//   clearCart,
//   reduceQty,
//   removeFromCart,
// } from "./store";
// import "./stylesheets/cart.css";
// import {
//   calculateTotal,
//   CalculateDiscount,
//   getCouponDiscount,
// } from "./discountUtils";
// import emailjs from "@emailjs/browser";
// import { useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import { toast } from "react-toastify";
// import swal from "sweetalert2";

// function Carttt() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);

//   // Persistent Discount State
//   const [discountPerc, setDiscountPerc] = useState(() => {
//     const saved = localStorage.getItem("discountPerc");
//     return saved ? JSON.parse(saved) : 0;
//   });

//   // Persistent Coupon State
//   const [couponCode, setCouponCode] = useState(() => {
//     const saved = localStorage.getItem("couponCode");
//     return saved || "";
//   });

//   const [couponResult, setCouponResult] = useState(() => {
//     const saved = localStorage.getItem("couponResult");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           isValidCoupon: false,
//           couponDiscountPercentage: 0,
//           couponDiscountAmount: 0,
//         };
//   });

//   // Persistent Payment Method
//   const [payment, setPayment] = useState(() => {
//     const saved = localStorage.getItem("paymentMethod");
//     return saved || "";
//   });

//   const [customerEmail, setCustomerEmail] = useState("");

//   // Price Calculations
//   const totalPrice = calculateTotal(cartItems);
//   const taxAmount = totalPrice * 0.18;

//   const discountedPrice =
//     discountPerc > 0 ? CalculateDiscount(totalPrice, discountPerc) : totalPrice;

//   const finalPrice = Math.max(
//     couponResult.isValidCoupon
//       ? discountedPrice - couponResult.couponDiscountAmount
//       : discountedPrice,
//     0
//   );

//   // Reset discounts/coupons when cart becomes empty
// useEffect(() => {
//   if (cartItems.length === 0) {
//     setDiscountPerc(0);
//     setCouponCode("");
//     setCouponResult({
//       isValidCoupon: false,
//       couponDiscountPercentage: 0,
//       couponDiscountAmount: 0,
//     });
//     setPayment("");
    
//   }
// }, [cartItems]);


//   // Sync states to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("discountPerc", JSON.stringify(discountPerc));
//   }, [discountPerc]);

//   useEffect(() => {
//     localStorage.setItem("couponCode", couponCode);
//   }, [couponCode]);

//   useEffect(() => {
//     localStorage.setItem("couponResult", JSON.stringify(couponResult));
//   }, [couponResult]);

 
//   // Recalculate coupon discount whenever cart changes
//   useEffect(() => {
//     if (couponCode) {
//       const result = getCouponDiscount(couponCode, totalPrice);
//       setCouponResult(result);
//     }
//   }, [cartItems, couponCode, totalPrice]);

//   const handleApplyCoupon = () => {
//     const result = getCouponDiscount(couponCode, totalPrice);
//     setCouponResult(result);
//   };

//   const handlePurchase = () => {
//     const purchaseDetails = {
//       date: new Date().toLocaleDateString(),
//       items: [...cartItems],
//       totalPrice: finalPrice,
//     };
//     dispatch(addOrders(purchaseDetails));
//     dispatch(clearCart());

//     // Reset states
//     setDiscountPerc(0);
//     setCouponCode("");
//     setCouponResult({
//       isValidCoupon: false,
//       couponDiscountPercentage: 0,
//       couponDiscountAmount: 0,
//     });
//     setPayment("");
//   };

//   const handleCheckout = () => {
//     if (!customerEmail) {
//       alert("Please enter your email to proceed");
//       return;
//     }

//     const templateParams = {
//       order_id: new Date().getTime(),
//       orders: cartItems.map((item) => ({
//         name: item.name,
//         price: (item.price * item.quantity).toFixed(2),
//         units: item.quantity,
//         image_url: item.imageUrl,
//       })),
//       cost: {
//         shipping: 50,
//         tax: taxAmount.toFixed(2),
//         total: finalPrice.toFixed(2),
//       },
//       email: customerEmail,
//     };

//     emailjs
//       .send(
//         "service_fq6pb7k",
//         "template_knhn41s",
//         templateParams,
//         "p37rBWkd44SPjdRet"
//       )
//       .then(() => {
//         alert("✅ Order Confirmation Email Sent!");
//       })
//       .catch(() => {
//         alert("❌ Failed to send email. Please try again.");
//       });
//   };

//   return (
//     <>
//       <section className="cart-section container-flex">
//         {/* LEFT BLOCK: CART ITEMS */}
//         <div className="cart-items-block">
//           <h2 className="section-title">🛒 Your Cart</h2>
//           {cartItems.length === 0 ? (
//             <p className="empty-cart">Your cart is currently empty</p>
//           ) : (
//             <ul className="cart-list">
//               {cartItems.map((item) => {
//                 const subtotal = item.price * item.quantity;
//                 return (
//                   <li key={item.id} className="cart-item">
//                     <div className="cart-item-left">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="cart-img"
//                       />
//                       <div className="cart-details">
//                         <span className="cart-name">{item.name}</span>
//                         <span className="cart-price">
//                           ₹{item.price}/{item.unit} × {item.quantity}
//                         </span>
//                         <span className="cart-subtotal">
//                           = ₹{subtotal.toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="cart-actions">
//                       <button
//                         className="btn-cart plus"
//                         onClick={() => dispatch(addToCart(item))}
//                       >
//                         +
//                       </button>
//                       <button
//                         className="btn-cart minus"
//                         onClick={() => dispatch(reduceQty(item))}
//                         disabled={item.quantity === 1}
//                       >
//                         -
//                       </button>
//                       <button
//                         className="btn-cart remove"
//                         onClick={() => dispatch(removeFromCart(item))}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>

//         {/* RIGHT BLOCK: SUMMARY */}
//         {cartItems.length > 0 && (
//           <aside className="cart-summary-block">
//             <h3 className="summary-title">Order Summary</h3>
//             <div className="cart-total">
//               {/* Show original only if discount/coupon applied */}
//               {(discountPerc > 0 || couponResult.isValidCoupon) && (
//                 <p className="original-total">
//                   Original: <s>₹{totalPrice.toFixed(2)}</s>
//                 </p>
//               )}

//               {discountPerc > 0 && (
//                 <p className="discount-applied">
//                   Discount: {discountPerc}% → -₹
//                   {(totalPrice - discountedPrice).toFixed(2)}
//                 </p>
//               )}

//               {couponResult.isValidCoupon && (
//                 <div className="coupon-result">
//                   <h5 className="text-success fw-bold">
//                     Coupon Applied: {couponResult.couponDiscountPercentage}%
//                   </h5>
//                   <p className="text-muted">
//                     You saved ₹{couponResult.couponDiscountAmount.toFixed(2)}
//                   </p>
//                 </div>
//               )}

//               <div className="final-price">
//                 <strong>Total: ₹{finalPrice.toFixed(2)}</strong>
//               </div>
//             </div>

//             <div className="discount-buttons">
//               {[10, 20, 30].map((perc) => (
//                 <button key={perc} onClick={() => setDiscountPerc(perc)}>
//                   {perc}% Off
//                 </button>
//               ))}
//               {discountPerc > 0 && (
//                 <button onClick={() => setDiscountPerc(0)}>Reset</button>
//               )}
//             </div>

//             <div className="mt-3">
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control rounded-start"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   style={{
//                     borderRight: "0",
//                     boxShadow: "none",
//                     outline: "none",
//                   }}
//                 />
//                 <button
//                   className="btn btn-primary rounded-end"
//                   type="button"
//                   onClick={handleApplyCoupon}
//                   style={{ boxShadow: "none", outline: "none" }}
//                 >
//                   Apply Coupon
//                 </button>
//               </div>
//             </div>

//             <div className="payment">
//               <h3>Select Payment Method</h3>
//               <button onClick={() => setPayment("qr")}>QR Code</button>
//               <button onClick={() => setPayment("card")}>Card</button>
//               <button onClick={() => setPayment("")}>Reset</button>
//             </div>

//             {payment === "qr" && (
//               <div className="qr-section">
//                 <h4>Scan UPI QR to pay ₹{finalPrice.toFixed(2)}</h4>
//                 <QRCode
//                   value={`upi://pay?pa=bharathreddy889900@oksbi&pn=MyStore&am=${finalPrice.toFixed(
//                     2
//                   )}&cu=INR`}
//                   size={180}
//                 />
//                 <p>UPI ID: merchant@upi</p>
//               </div>
//             )}

//             <div className="checkout-block">
//               <label className="checkout-label">
//                 {" "}
//                 Email for Order Confirmation:{" "}
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={customerEmail}
//                 onChange={(e) => setCustomerEmail(e.target.value)}
//               />
//               <button className="btn-checkout" onClick={handleCheckout}>
//                 Checkout & Send Email
//               </button>
//             </div>

//             <button className="btn-purchase" onClick={handlePurchase}>
//               ✅ Complete Purchase
//             </button>
//           </aside>
//         )}
//       </section>
//     </>
//   );
// }



