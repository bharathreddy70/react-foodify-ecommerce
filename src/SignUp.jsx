import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "./store";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password"); // watch password for confirm check
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

    // ✅ Store username, password, and name for login
    dispatch(registerUser({ username, password, name }));
    alert("✅ User registered successfully!");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          {...formRegister("name", { required: "Name is required" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Enter username"
          {...formRegister("username", { required: "Username is required" })}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Enter password"
          {...formRegister("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirm password"
          {...formRegister("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
