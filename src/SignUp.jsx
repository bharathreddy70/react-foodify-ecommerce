import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "./store";
import { useNavigate } from "react-router-dom";
import "./stylesheets/login.css"; // Using same CSS as login for consistency

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.registerUser.users);

  const handleSignUp = (data) => {
    const { username, password, name } = data;

    // Check for duplicate username
    const exists = users.some((user) => user.username === username);
    if (exists) {
      alert("❌ Username already exists. Please choose another.");
      return;
    }

    dispatch(registerNewUser({ username, password, name }));
    alert("✅ User registered successfully!");
    navigate("/login");
  };

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
          <h3 className="mt-3 fw-bold text-dark">Sign Up</h3>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <div className="text-danger mt-1 small">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <div className="text-danger mt-1 small">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-pill"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <div className="text-danger mt-1 small">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill shadow-sm"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Already have an account?{" "}
          <a href="/login" className="fw-semibold text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
