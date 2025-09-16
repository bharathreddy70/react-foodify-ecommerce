import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "./store";
import "./stylesheets/drinksSection.css";
import { Slide, toast, ToastContainer } from "react-toastify";

function Drinks() {
  const drinkItems = useSelector((state) => state.products.drinks);
  const dispatch = useDispatch();

   const itemsPerPage = 8;
      const totalPages = Math.ceil(drinkItems.length / itemsPerPage);
    
      const [currentPage, setCurrentPage] = useState(1);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const slicedItems = drinkItems.slice(indexOfFirstItem, indexOfLastItem);
    
      const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ));

  return (
    <>

   <ToastContainer
   limit={7}
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  toastClassName="custom-toast"
  transition={Slide}   // ✅ smooth slide transition
/>

    <div className="container drinks-section py-5">
      <h2 className="text-center mb-5 section-title">🥤 Refreshing Drinks</h2>
      <div className="row">
        {slicedItems.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-6 mb-4">
            <div className="card product-card h-100 shadow-sm">
              {/* Image */}
              <div className="img-container">
                <img
                  src={product.imageUrl}
                  
                  className="card-img-top  product-img "
                  alt={product.name}
                />
              </div>

              {/* Content */}
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">
                  <span className="cart-price">₹{product.price}</span>/{product.unit}
                </p>
                <button
                  className="btn btn-drink mt-auto cart-btn"
                  onClick={() => {dispatch(addToCart(product));toast.success(`${product.name} added to cart!`)}}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-buttons text-center mt-4">
         <button onClick={()=>{setCurrentPage(currentPage -1)}} disabled={currentPage === 1}>prev</button> {paginationButtons}  <button onClick={()=>{setCurrentPage(currentPage + 1)}} disabled={currentPage === totalPages}>next</button> 
      </div>
    </div>
    </>
  );
  
}

export default Drinks;
