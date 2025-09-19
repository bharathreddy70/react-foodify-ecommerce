import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { setOrders, clearOrders } from "./store";
import "./stylesheets/orders.css";

function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUsername } = useSelector(
    (state) => state.registerUser
  );
  const orders = useSelector((state) => state.orders);

  

  // 🔹 Load user-specific orders from localStorage
  useEffect(() => {
    if (isAuthenticated && currentUsername) {
      const savedOrders =
        JSON.parse(localStorage.getItem(`orders_${currentUsername}`)) || [];
      dispatch(setOrders(savedOrders));
    } else {
      dispatch(clearOrders()); // reset when logged out
    }
  }, [isAuthenticated, currentUsername, dispatch]);

  if (!isAuthenticated) {
  return <p className="no-orders">⚠️ Please login to view your orders</p>;
}

if (orders.length === 0) {
  return <p className="no-orders">No orders yet 🛒</p>;
}

  

  const showOrderSummary = (order) => {
    const itemsHtml = order.items
      .map(
        (item) => `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <img src="${item.imageUrl}" width="50" height="50" style="border-radius:8px;"/>
          <div>
            <strong>${item.name}</strong><br/>
            Qty: ${item.quantity} | Price: ₹${item.price}
          </div>
        </div>
      `
      )
      .join("");

    Swal.fire({
      title: `🛒 Order #${order.o_id}`,
      html: `
        <p><b>Date:</b> ${order.date} ${order.time || ""}</p>
        <hr/>
        <h3>Items</h3>
        ${itemsHtml}
        <hr/>
        <p><b>Original:</b> ₹${order.subTotal || 0}</p>
        <p><b>Discount:</b> ${order.discountPerc || 0}%</p>
        <p><b>Coupon:</b> ₹${order.couponAmount || 0}</p>
        <p><b>Tax (18% GST):</b> ₹${order.tax || 0}</p>
        <p><b>Shipping:</b> ₹50</p>
        <hr/>
        <h3>Final Amount: ₹${order.finalAmount || order.totalPrice}</h3>
        <p><b>Payment:</b> ${order.paymentMode || "Cash on Delivery"}</p>
      `,
      width: 600,
      confirmButtonText: "Close",
      confirmButtonColor: "#4caf50",
    });
  };

  
  return (
    <div className="orders-container">
      {orders.map((order, index) => (
        <div
          key={index}
          className="order-card clickable"
          onClick={() => showOrderSummary(order)}
        >
          <div className="order-header">
            <div className="order-id">🆔 Order ID: {order.o_id}</div>
            <div className="order-date">
              📅 {order.date} {order.time}
            </div>
          </div>
          <div className="order-total">💰 ₹{order.finalAmount}</div>
          <p className="order-tap">👆 Tap for full summary</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
