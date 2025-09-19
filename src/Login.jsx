import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./stylesheets/login.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, currentUsername, users } = useSelector(
    (state) => state.registerUser
  );

  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    const { username, password } = data;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      dispatch(loginUser({ username }));
      setLoginError("");
      setAttemptedLogin(true);
    } else {
      setLoginError("❌ Invalid username or password");
    }
  };

  useEffect(() => {
    if (!attemptedLogin) return;

    if (isAuthenticated && currentUsername) {
      alert(`✅ Welcome back, ${currentUsername}!`);

      // If login triggered during checkout → go to cart
      if (localStorage.getItem("checkoutIntent") === "true") {
        localStorage.removeItem("checkoutIntent");
        navigate("/cart");
      } else {
        navigate("/");
      }
    }

    setAttemptedLogin(false);
  }, [isAuthenticated, currentUsername, attemptedLogin, navigate]);

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
          <h3 className="mt-3 fw-bold text-dark">Login</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your username"
              {...register("username", { required: "Enter Username" })}
            />
            {errors.username && (
              <div className="text-danger mt-1 small">{errors.username.message}</div>
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
              <div className="text-danger mt-1 small">{errors.password.message}</div>
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
          <a href="/signup" className="fw-semibold text-primary">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
