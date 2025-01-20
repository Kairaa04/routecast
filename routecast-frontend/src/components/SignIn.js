import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData
      );
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error signing in.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
