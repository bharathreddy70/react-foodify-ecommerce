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
//   useEffect(() => {
//     if (cartItems.length === 0) {
//       setDiscountPerc(0);
//       setCouponCode("");
//       setCouponResult({
//         isValidCoupon: false,
//         couponDiscountPercentage: 0,
//         couponDiscountAmount: 0,
//       });
//     }
//   }, [cartItems]);

//   useEffect(() => {
//     if (couponCode) {
//       const result = getCouponDiscount(couponCode, totalPrice);
//       setCouponResult(result);
//     }
//   }, [cartItems, couponCode, totalPrice]);

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

//   const handleApplyCoupon = () => {
//     const result = getCouponDiscount(couponCode, totalPrice);
//     setCouponResult(result);
//   };

//   // ✅ SweetAlert2 Payment Flow
// let proceedPayment = async () => {
//   if (cartItems.length === 0) {
//     swal.fire({
//       title: "🛒 Cart Empty",
//       text: "Please add items before checkout",
//       icon: "warning",
//       confirmButtonColor: "#8e24aa",
//     });
//     return;
//   }

//   // Step 1: Ask Email
//   const { value: email } = await swal.fire({
//     title: "📧 Enter Your Email",
//     input: "email",
//     inputPlaceholder: "example@mail.com",
//     confirmButtonText: "Next ➡️",
//     showCancelButton: true,
//     cancelButtonText: "Cancel",
//     background: "linear-gradient(135deg, #ffffffff, #8cf6ddff)",
//     confirmButtonColor: "#8e24aa",
//     cancelButtonColor: "#888",
//     inputValidator: (value) => {
//       if (!value) return "Email is required!";
//     },
//   });

//   if (!email) return;
//   setCustomerEmail(email);

//   // Step 2: Select Payment Mode
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
//     background: "linear-gradient(135deg, #ffffffff, #8cf6ddff)",
//     confirmButtonColor: "#43a047",
//     cancelButtonColor: "#888",
//     inputValidator: (value) => {
//       if (!value) return "Please select a payment method!";
//     },
//   });

//   if (!method) return;

//   // Step 3: Handle Payment
//   if (method === "qr") {
//     const result = await swal.fire({
//       title: "📱 Scan & Pay",
//       html: `<div id="qr-container" style="display:flex;justify-content:center;margin-top:15px;"></div>
//              <p style="margin-top:10px;font-size:14px;color:#666">Scan this code to pay securely</p>`,
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
//       background: "#ffffffff",
//       confirmButtonColor: "#ef6c00",
//       cancelButtonColor: "#888",
//     });

//     if (!result.isConfirmed) {
//       swal.fire("Payment Cancelled", "You are back in your cart", "info");
//       return;
//     }
//   } else if (method === "card") {
//     const result = await swal.fire({
//       title: "💳Enter Card Details",
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
//   }

//   // Step 4: Send Email
//   const templateParams = {
//     order_id: new Date().getTime(),
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
//     email: email,
//   };

//   emailjs
//     .send("service_fq6pb7k", "template_knhn41s", templateParams, "p37rBWkd44SPjdRet")
//     .then(() => {
//       swal.fire({
//         title: "🎉 Payment Successful!",
//         text: "Confirmation email has been sent.",
//         icon: "success",
//         confirmButtonColor: "#43a047",
//       });
//       const purchaseDetails = {
//         date: new Date().toLocaleDateString(),
//         items: [...cartItems],
//         totalPrice: finalPrice,
//       };
//       dispatch(addOrders(purchaseDetails));
//       dispatch(clearCart());
//     })
//     .catch(() => {
//       swal.fire("❌ Failed", "Could not send confirmation email", "error");
//     });
// };





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

//             <button className="btn-checkout" onClick={proceedPayment}>
//               Proceed to Payment
//             </button>
//           </aside>
//         )}
//       </section>
//     </>
//   );
// }

// export default Cart;




// ----------------------------------------10-9-2025-------------
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
//   useEffect(() => {
//     if (cartItems.length === 0) {
//       setDiscountPerc(0);
//       setCouponCode("");
//       setCouponResult({
//         isValidCoupon: false,
//         couponDiscountPercentage: 0,
//         couponDiscountAmount: 0,
//       });
//     }
//   }, [cartItems]);

//   useEffect(() => {
//     if (couponCode) {
//       const result = getCouponDiscount(couponCode, totalPrice);
//       setCouponResult(result);
//     }
//   }, [cartItems, couponCode, totalPrice]);

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

//   const handleApplyCoupon = () => {
//     const result = getCouponDiscount(couponCode, totalPrice);
//     setCouponResult(result);
//   };

//   // ✅ SweetAlert2 Payment Flow
// let proceedPayment = async () => {
//   if (cartItems.length === 0) {
//     swal.fire({
//       title: "🛒 Cart Empty",
//       text: "Please add items before checkout",
//       icon: "warning",
//       confirmButtonColor: "#8e24aa",
//     });
//     return;
//   }

//   // Step 1: Ask Email
//   const { value: email } = await swal.fire({
//     title: "📧 Enter Your Email",
//     input: "email",
//     inputPlaceholder: "example@mail.com",
//     confirmButtonText: "Next ➡️",
//     showCancelButton: true,
//     cancelButtonText: "Cancel",
//     background: "linear-gradient(135deg, #ffffffff, #8cf6ddff)",
//     confirmButtonColor: "#8e24aa",
//     cancelButtonColor: "#888",
//     inputValidator: (value) => {
//       if (!value) return "Email is required!";
//     },
//   });

//   if (!email) return;
//   setCustomerEmail(email);

//   // Step 2: Select Payment Mode
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
//     background: "linear-gradient(135deg, #ffffffff, #8cf6ddff)",
//     confirmButtonColor: "#43a047",
//     cancelButtonColor: "#888",
//     inputValidator: (value) => {
//       if (!value) return "Please select a payment method!";
//     },
//   });

//   if (!method) return;

//   // Step 3: Handle Payment
//   if (method === "qr") {
//     const result = await swal.fire({
//       title: "📱 Scan & Pay",
//       html: `<div id="qr-container" style="display:flex;justify-content:center;margin-top:15px;"></div>
//              <p style="margin-top:10px;font-size:14px;color:#666">Scan this code to pay securely</p>`,
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
//       background: "#ffffffff",
//       confirmButtonColor: "#ef6c00",
//       cancelButtonColor: "#888",
//     });

//     if (!result.isConfirmed) {
//       swal.fire("Payment Cancelled", "You are back in your cart", "info");
//       return;
//     }
//   } else if (method === "card") {
//     const result = await swal.fire({
//       title: "💳Enter Card Details",
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
//   }

//   // Step 4: Send Email
//   const templateParams = {
//     order_id: new Date().getTime(),
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
//     email: email,
//   };

//   emailjs
//     .send("service_fq6pb7k", "template_knhn41s", templateParams, "p37rBWkd44SPjdRet")
//     .then(() => {
//       swal.fire({
//         title: "🎉 Payment Successful!",
//         text: "Confirmation email has been sent.",
//         icon: "success",
//         confirmButtonColor: "#43a047",
//       });
//       const purchaseDetails = {
//         date: new Date().toLocaleDateString(),
//         items: [...cartItems],
//         totalPrice: finalPrice,
//       };
//       dispatch(addOrders(purchaseDetails));
//       dispatch(clearCart());
//     })
//     .catch(() => {
//       swal.fire("❌ Failed", "Could not send confirmation email", "error");
//     });
// };





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
//                   Original: <span className="cart-price "><s>₹{totalPrice.toFixed(2)}</s></span>
//                 </p>
//               )}

            //   {discountPerc > 0 ? (
            //     <p className="discount-applied">
            //       Discount: {discountPerc}% → 
            //       <span  style={{  width: "9px" }}>  -</span> 
            //       <span className="cart-price">₹</span> 
            //       {(totalPrice - discountedPrice).toFixed(2)}
            //     </p>
            //   ) : (
            //     <p className="discount-applied">
            //       Discount: {discountPerc}% 
            //     </p>
            //   )}


//               {couponResult.isValidCoupon ?  (
//                 <div className="coupon-result">
//                   <h5 className="text-success fw-bold">
//                     Coupon Applied: {couponResult.couponDiscountPercentage}%
//                   </h5>
//                   <p className="text-muted">
//                     You saved <span className="cart-price">₹{couponResult.couponDiscountAmount.toFixed(2)}</span>
//                   </p>
//                 </div>
//               ): (<p className="text-success fw-bold fs-5">Coupon: Not Applied</p>

//               )}

//               <div className="final-price">
//                 <strong className="fs-4">Total: <span className="cart-price" style={{color:"black"}}>₹</span>{finalPrice.toFixed(2)}</strong>
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

//             <button className="btn-checkout" onClick={proceedPayment}>
//               Proceed to Payment
//             </button>
//           </aside>
//         )}
//       </section>
//     </>
//   );
// }

export default Cart;

