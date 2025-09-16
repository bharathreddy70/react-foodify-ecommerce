// import { useSelector } from "react-redux";
// import "./stylesheets/orders.css"; // import styles

// function Orders() {
//   let purchaseDetails = useSelector((state) => state.orders);

//   if (purchaseDetails.length === 0) {
//     return <p className="no-orders">No orders yet 🛒</p>;
//   }

//   return (
//     <div className="orders-container">
//       {purchaseDetails.map((order, index) => (
//         <div key={index} className="order-card">
//           <div className="order-header">
//             <span className="order-date">📅 {order.date}</span>
//             <span className="order-total">💰 ₹{order.totalPrice}</span>
//           </div>

//           <ul className="order-items">
//             {order.items.map((item, i) => (
//               <li className="order-item" key={i}>
//                 <img src={item.imageUrl} alt={item.name} />
//                 <div className="order-item-details ">
//                   <h4>{item.name}</h4>
//                   <p>Qty: {item.quantity}</p>
//                 </div>
//                 <span className="price-tag">₹{item.price}/{item.unit}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Orders;
