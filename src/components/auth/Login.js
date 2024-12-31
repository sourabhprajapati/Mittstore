import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import {Link} from "react-router-dom"
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5555/user/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      window.location.href = '/';

    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };
  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"

              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>
          <p style={{ margin: "10px 0px", cursor: "pointer" }}>
           <Link to={"/user/register"} style={{textDecoration:"none"}}>Create a new account?</Link> 
          </p>
          <p style={{ margin: "10px 0px", cursor: "pointer" }}>
            Forget password ?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
