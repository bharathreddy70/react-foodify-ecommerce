import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import "./stylesheets/orders.css";

function Orders() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUsername } = useSelector(
    (state) => state.registerUser
  );

  const [userOrders, setUserOrders] = useState([]);

  // 🔹 Redirect if not logged in
  useEffect(() => {
    const protectedRoutes = ["/cart", "/orders"];

    if (!isAuthenticated && protectedRoutes.includes(location.pathname)) {
      Swal.fire({
        icon: "warning",
        title: "🔒 Login Required",
        text: "You must log in to view this page.",
        confirmButtonColor: "#1e88e5",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [isAuthenticated, location, navigate]);

  // 🔹 Load user-specific orders from localStorage
  useEffect(() => {
    if (isAuthenticated && currentUsername) {
      const savedOrders =
        JSON.parse(localStorage.getItem(`orders_${currentUsername}`)) || [];
      setUserOrders(savedOrders);
    }
  }, [isAuthenticated, currentUsername]);

  if (!isAuthenticated) return null;

  if (userOrders.length === 0) {
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
      {userOrders.map((order, index) => (
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
