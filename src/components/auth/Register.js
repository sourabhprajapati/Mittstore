import React, { useState } from "react";
import "./auth.css";
import axios from 'axios';
import {Link} from "react-router-dom"

const Register = () => {
  const[formData,setformData]=useState({
    username:'',
    email:'',
    password:'',
    phone:'',
    role:'',
    schoolname:''
  })
  const handlechange=(e)=>{
    setformData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5555/user/register', formData);
        alert('Registration successful!');
        setformData({
          username:'',
          email:'',
          password:'',
          phone:'',
          role:'',
          schoolname:''
        });
        window.location.href = '/user/login';
    } catch (err) {
        console.error(err);
        alert('Registration failed!');
    }
};

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Registration Form</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter your name" name="username" onChange={handlechange} value={formData.username}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter your Email" name="email" onChange={handlechange} value={formData.email}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your password" name="password" onChange={handlechange} value={formData.password} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input type="number" placeholder="Enter your phone number" name="phone" onChange={handlechange} value={formData.phone}/>
          </div>
          <div className="form-group">
          <select name="role"  value={formData.role} onChange={handlechange}>
                <option value="">Select Role</option>
                <option value="sales_executive">Sales Executive</option>
                <option value="school">School</option>
                <option value="student/parent">Student/Parent</option>
            </select>
          </div>
          <div className="form-group">
           {/* Conditionally render school name input */}
           {(formData.role === 'school' || formData.role === 'student/parent') && (
                <input
                    type="text"
                    name="schoolname"
                    placeholder="School Name"
                    value={formData.schoolname}
                    onChange={handlechange}
                    required
                />
            )}
          </div>
         
          <button type="submit" className="btn">Sign Up</button>
          <p style={{ margin: "15px 0px", cursor: "pointer" }}>
           <Link to={"/user/login"} style={{textDecoration:"none"}}>Back to Login</Link> 
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
