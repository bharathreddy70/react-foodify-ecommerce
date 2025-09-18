import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  clearCart,
  clearOrders,
  setCart,
  setOrders,
} from "./store";
import "../src/stylesheets/login.css";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUsername } = useSelector(
    (state) => state.registerUser
  );

  const [loginError, setLoginError] = useState("");
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔹 Handle Login
  const handleLogin = (data) => {
    setLoginError("");
    setAttemptedLogin(true);
    dispatch(loginUser(data));
  };

  // 🔹 Handle Logout
  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(clearOrders());
    dispatch(logoutUser());
    navigate("/login");
  };

  // 🔑 After login success: load user cart & orders
  useEffect(() => {
    if (!attemptedLogin) return;

    if (isAuthenticated && currentUsername) {
      // Load user-specific data
      const userCart =
        JSON.parse(localStorage.getItem(`cart_${currentUsername}`)) || [];
      const userOrders =
        JSON.parse(localStorage.getItem(`orders_${currentUsername}`)) || [];

      dispatch(setCart(userCart));
      dispatch(setOrders(userOrders));

      alert(`✅ Login successful. Welcome ${currentUsername}!`);

      // If login triggered during checkout → go to cart
      if (localStorage.getItem("checkoutIntent") === "true") {
        localStorage.removeItem("checkoutIntent");
        navigate("/cart");
      } else {
        navigate("/");
      }
    } else if (isAuthenticated === false) {
      setLoginError("❌ Invalid username or password");
    }

    setAttemptedLogin(false);
  }, [isAuthenticated, currentUsername, attemptedLogin, navigate, dispatch]);


  // 🔹 Default: Login Form
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div
        className="card shadow-lg p-4"
        style={{ width: "380px", borderRadius: "20px" }}
      >
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto"
            style={{
              width: "111px",
              height: "70px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            <i>Foodify</i>
          </div>
          <h3 className="mt-3 fw-bold text-dark">Foodify Login</h3>
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your username"
              {...register("username", { required: "Enter Username" })}
            />
            {errors.username && (
              <div className="text-danger mt-1 small">
                {errors.username.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your password"
              {...register("password", { required: "Enter Password" })}
            />
            {errors.password && (
              <div className="text-danger mt-1 small">
                {errors.password.message}
              </div>
            )}
          </div>

          {!errors.username && !errors.password && loginError && (
            <div className="text-danger text-center mb-3">{loginError}</div>
          )}

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill shadow-sm"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Don’t have an account?{" "}
          <Link to="/signup" className="fw-semibold text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
