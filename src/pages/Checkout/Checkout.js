import React, { useState } from "react";
import "./Checkout.css";
import Header from "../../components/header/Header";
import { useCart } from "../../components/context/CartContext";
import axios from "axios";

const Checkout = () => {
  const { cartItems } = useCart(); // Fetch cart items from context
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [additionalDiscount, setAdditionalDiscount] = useState(0);
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

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const shipping = cartItems.length > 0 ? 40 : 0; // Apply shipping only if cart is not empty
  const tax = subtotal * 0.1; // 10% GST
  const couponDiscount = (subtotal * additionalDiscount) / 100;
  const total = subtotal + shipping + tax - couponDiscount;

  const applyCoupon = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/validate-coupon", { code: coupon });
      setAdditionalDiscount(response.data.discount_percentage);
      setCouponApplied(true);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to validate coupon");
    }
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

    const orderData = {
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

    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      alert(response.data.message);
      setFormData({ name: "", email: "", address: "", city: "", state: "", pincode: "", phone: "" });
      setCoupon("");
      setCouponApplied(false);
      setAdditionalDiscount(0);
    } catch (error) {
      alert("Failed to process order");
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
                <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</label>
                <input
                  type={key === "email" ? "email" : key === "phone" || key === "pincode" ? "number" : "text"}
                  id={key}
                  value={value}
                  onChange={handleInputChange}
                  placeholder={`${key}...`}
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
                      {/* <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="product-image"
                      /> */}
                      <div>
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="price">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}

                <div className="form-group">
                  <label htmlFor="coupon">Coupon</label>
                  <input
                    type="text"
                    id="coupon"
                    placeholder="Enter coupon..."
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button onClick={applyCoupon} disabled={couponApplied} className={`apply-button ${couponApplied ? "disabled" : ""}`}>
                    {couponApplied ? "Coupon Applied" : "Apply Coupon"}
                  </button>
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
                    <div className="summary-item">
                      <span>Coupon Discount</span>
                      <span className="price">-₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-item">
                    <strong>Total</strong>
                    <strong className="total-price">₹{total.toFixed(2)}</strong>
                  </div>
                </div>

                <button className="checkout-button" onClick={handleCheckout}>
                  Complete Purchase
                </button>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
