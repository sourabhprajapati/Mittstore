import React, { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import "./Checkout.css";
import Header from "../../components/header/Header";
const Checkout = () => {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Paperchase Rainbow A4 Teacher Planner",
      price: 199,
      quantity: 1,
      image:
        "https://digitalcontent.api.tesco.com/v2/media/ghs/b3029b80-f789-48cb-bca2-8a34e1f0e5dc/04da3fb2-f44c-4bed-927a-db0298357569_1828511703.jpeg?h=225&w=225",
    },
    {
      id: 2,
      name: "Paperchase Terrazzo Cats Set of 6 Highlighters",
      price: 299,
      quantity: 1,
      image:
        "https://digitalcontent.api.tesco.com/v2/media/ghs/656b4d08-20ec-4898-a2b4-e96d53955015/ba660615-e94b-4fee-a305-2889cd873133_1925482675.jpeg?h=225&w=225",
    },
  ]);

  const [activePayment, setActivePayment] = useState("card");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 40;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-grid">
          <div className="checkout-form">
            <h2 className="section-title">Shipping Information</h2>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Name..." />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="email..." />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input type="text" id="address" />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" />
            </div>

            <div className="form-group">
              <label htmlFor="city">State</label>
              <input type="text" id="city" />
            </div>
            <div className="form-group">
              <label htmlFor="city">Pincode</label>
              <input type="number" id="city" />
            </div>

            <div className="form-group">
              <label htmlFor="city">Phone</label>
              <input type="number" id="city" />
            </div>
            

            

            

            
          </div>

          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="product-details">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="price">₹{item.price.toFixed(2)}</div>
              </div>
            ))}

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
                <span>Tax</span>
                <span className="price">₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <strong>Total</strong>
                <strong className="total-price">₹{total.toFixed(2)}</strong>
              </div>
            </div>

            <button className="checkout-button">Complete Purchase</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
