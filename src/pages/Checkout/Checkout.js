import React, { useState, useEffect } from "react";
import "./Checkout.css";
import Header from "../../components/header/Header";
import { useCart } from "../../components/context/CartContext";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();  // Changed from currentUser to user
  const [coupon, setCoupon] = useState("");
  const user1 = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [couponApplied, setCouponApplied] = useState(false);
  const [additionalDiscount, setAdditionalDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  // Prefill form with user data if available
  useEffect(() => {
    if (user) {  // Changed from currentUser to user
      setFormData(prevData => ({
        ...prevData,
        name: user.firstName ? `${user.firstName} ${user.lastName || ''}` : prevData.name,  // Changed from currentUser to user
        email: user.email || prevData.email,  // Changed from currentUser to user
        phone: user.mobile || prevData.phone,  // Changed from currentUser to user
      }));
    }
  }, [user]);  // Changed from currentUser to user

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const shipping = cartItems.length > 0 ? 40 : 0;
  const tax = subtotal * 0.1; // 10% GST
  const couponDiscount = (subtotal * additionalDiscount) / 100;
  const total = subtotal + shipping + tax - couponDiscount;

  const applyCoupon = async () => {
    console.log("User from AuthContext:", user); 
    setCouponError("");
    setCouponSuccess("");

    if (!coupon.trim()) {
        setCouponError("Please enter a coupon code");
        return;
    }

    if (!user) {
        setCouponError("You must be logged in to apply a coupon");
        return;
    }

    setLoading(true);

    try {
        console.log("Sending request with payload:", {
            code: coupon,
            userId: user.id,
            userType: user.role
        });

        const response = await axios.post("http://localhost:5000/api/coupons/validate", {
            code: coupon,
            userId: user.id,
            userType: user.role
        });

        console.log("Response received:", response.data);

        setAdditionalDiscount(response.data.discount_percentage);
        setCouponApplied(true);
        setCouponSuccess(`Coupon applied! You received ${response.data.discount_percentage}% discount.`);
    } catch (error) {
        console.error("Coupon validation error:", error.response?.data || error.message);
        setCouponError(error.response?.data?.error || "Failed to validate coupon");
        setCouponApplied(false);
        setAdditionalDiscount(0);
    } finally {
        setLoading(false);
    }
};



  const removeCoupon = () => {
    setCouponApplied(false);
    setAdditionalDiscount(0);
    setCouponSuccess("");
    setCouponError("");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    if (!user) {  // Changed from currentUser to user
      alert("Please log in to complete your purchase");
      return;
    }

    const orderData = {
      userId: user.id,  // Changed from currentUser to user
      fullName: formData.name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      phone: formData.phone,
      total,
      couponCode: couponApplied ? coupon : null,
    };

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        userId: user1?.id || null, // Pass userId or null if guest
        fullName: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone: formData.phone,
        total,
        couponCode: couponApplied ? coupon : null,
        cartItems: cartItems // Pass the entire cart
      });
      
      // alert(response.data.message);
      // Reset form after successful checkout
      navigate("/OrderSuccess");
      setFormData({ name: "", email: "", address: "", city: "", state: "", pincode: "", phone: "" });
      setCoupon("");
      setCouponApplied(false);
      setAdditionalDiscount(0);
      // Clear cart functionality would typically be called here
      // clearCart();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to process order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-grid">
          <div className="checkout-form">
            <h2 className="section-title">Shipping Information</h2>
            {Object.entries(formData).map(([key, value]) => (
              <div className="form-group" key={key}>
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</label>
                <input
                  type={key === "email" ? "email" : key === "phone" || key === "pincode" ? "number" : "text"}
                  id={key}
                  value={value}
                  onChange={handleInputChange}
                  placeholder={`Enter ${key}...`}
                  required
                />
                {errors[key] && <span className="error-message">{errors[key]}</span>}
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="product-details">
                      <div>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="price">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}

                <div className="form-group">
                  <label htmlFor="coupon">Coupon Code</label>
                  <div className="coupon-input-container">
                    <input
                      type="text"
                      id="coupon"
                      placeholder="Enter your coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      disabled={couponApplied || loading}
                      className={couponApplied ? "input-success" : ""}
                    />
                    <button
                      onClick={couponApplied ? removeCoupon : applyCoupon}
                      disabled={loading}
                      className={`coupon-button ${couponApplied ? "remove-coupon" : ""}`}
                    >
                      {loading ? "Processing..." : couponApplied ? "Remove" : "Apply"}
                    </button>
                  </div>
                  {couponError && <span className="error-message">{couponError}</span>}
                  {couponSuccess && <span className="success-message">{couponSuccess}</span>}
                  {!user && <p className="info-message">Login required to use coupons</p>}  {/* Changed from currentUser to user */}
                </div>

                <div className="total-section">
                  <div className="summary-item">
                    <span>Subtotal</span>
                    <span className="price">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Shipping</span>
                    <span className="price">₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="summary-item">
                    <span>GST (10%)</span>
                    <span className="price">₹{tax.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="summary-item discount-row">
                      <span>Coupon Discount</span>
                      <span className="price discount">-₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-item total-row">
                    <strong>Total</strong>
                    <strong className="total-price">₹{total.toFixed(2)}</strong>
                  </div>
                </div>

                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? "Processing..." : "Complete Purchase"}
                </button>
              </>
            ) : (
              <p className="empty-cart-message">Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;