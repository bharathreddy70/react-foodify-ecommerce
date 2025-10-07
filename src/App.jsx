import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import "./stylesheets/global.css";

import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Drinks from "./Drinks";
import Chocolates from "./Chocolates";
import Orders from "./Orders";
import Cart from "./Cart";
// import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import NotFound from "./NotFound";
import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import { clearCart, logoutUser } from "./store"; // ✅ import logout action
import Footer from "./Footer";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let cartItems = useSelector((state) => state.cart) || [];
  let cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const { isAuthenticated, currentUsername } = useSelector(
    (state) => state.registerUser
  );

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());// clear auth state
    navigate("/login"); // go to login page
  };

   const handleContactClick = () => {
    if (location.pathname === "/") {
      // Already on home → just scroll
      document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Go to home first, then scroll after render
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
      }, 200); // small delay so Home has time to render
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-3 fixed-top">
        <div className="d-flex align-items-center w-100 mb-2">
          <Link className="navbar-brand text-light fw-bold" to="/"><i>Foodify</i></Link>

          <form className="d-flex mx-auto w-50">
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-light" type="submit">
              <FaSearch className="text-white fs-5" />
            </button>
          </form>

          <div className="d-flex gap-3">
            <Link className="nav-link text-light d-flex align-items-center gap-1" to="/orders">
              📦 <span className="fs-6">Orders</span>
            </Link>

            <Link className="nav-link text-light d-flex align-items-center" to="/cart">
              <div className="position-relative">
                <FaShoppingCart className="text-white fs-5" />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.8rem", padding: "0.25em 0.4em" }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="ms-2 fs-6">Cart</span>
            </Link>

            {/* ✅ Conditional Login/Logout */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="btn d-flex align-items-center gap-1 btn-no-padding btn-no-border"
              >
                <FaUser className="text-white fs-5" />
                <span className="fs-6 ">Logout</span>
              </button>
            ) : (
              <Link className="nav-link text-light d-flex align-items-center gap-1" to="/login">
                <FaUser className="text-white fs-5"/> <span className="text-white fs-6">Login</span>
              </Link>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center w-100">
          <ul className="navbar-nav flex-row fw-bold">
            <li className="nav-item mx-2"><Link className="nav-link text-white" to="/">🏠 Home</Link></li>
            <li className="nav-item mx-2"><Link className="nav-link text-white" to="/veg">🥕 Veg</Link></li>
            <li className="nav-item mx-2"><Link className="nav-link text-white" to="/nonVeg">🍗 NonVeg</Link></li>
            <li className="nav-item mx-2"><Link className="nav-link text-white" to="/drinks">🍹 Drinks</Link></li>
            <li className="nav-item mx-2"><Link className="nav-link text-white" to="/chocolates">🍫 Chocolates</Link></li>
            {/* <li className="nav-item mx-2"><Link className="nav-link text-white" to="/aboutus">ℹ️ About</Link></li> */}
            <li className="nav-item mx-2">
              <Link
                className="nav-link text-white"
                to="/"
                onClick={handleContactClick}
              >
                📞 Contact
              </Link>
            </li>
              
            

          </ul>
        </div>
      </nav>

      <div className="container-fluid body-section pt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonVeg" element={<NonVeg />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/chocolates" element={<Chocolates />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/aboutus" element={<AboutUs />} /> */}
          {/* <Route path="/contactus" element={<ContactUs />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      {/* 🔹 Footer */}
      <Footer />
   </>
  );
}

export default App;