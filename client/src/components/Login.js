import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      alert("Login successful!");
      navigate("/create"); // Navigate to create post page after login
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          className="login-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
