import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import "./Cart.css"
import Header from '../header/Header';
const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 199.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format"
        },
        {
          id: 2,
          name: "Smart Watch Series 5",
          price: 299.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format"
        }
      ]);
    
      const updateQuantity = (id, change) => {
        setCartItems(items =>
          items.map(item =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + change) }
              : item
          )
        );
      };
    
      const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
      };
    
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      const total = subtotal + tax;
    
      return (
        <>
         <Header/>
        <div className="cart-container">
          <div className="cart-header">
            <h1><ShoppingCart className="cart-icon" /> Shopping Cart</h1>
            <span>{cartItems.length} items</span>
          </div>
    
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">₹{item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="item-total">
                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
    
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button className="checkout-button">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
        </>)
}

export default Cart
