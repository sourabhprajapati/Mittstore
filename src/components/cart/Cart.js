import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import "./Cart.css"
import Header from '../header/Header';
import { Link } from 'react-router-dom';
const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          name: "Paperchase Rainbow A4 Teacher Planner",
          price: 199,
          quantity: 1,
          image: "https://digitalcontent.api.tesco.com/v2/media/ghs/b3029b80-f789-48cb-bca2-8a34e1f0e5dc/04da3fb2-f44c-4bed-927a-db0298357569_1828511703.jpeg?h=225&w=225"
        },
        {
          id: 2,
          name: "Paperchase Terrazzo Cats Set of 6 Highlighters",
          price: 299,
          quantity: 2,
          image: "https://digitalcontent.api.tesco.com/v2/media/ghs/656b4d08-20ec-4898-a2b4-e96d53955015/ba660615-e94b-4fee-a305-2889cd873133_1925482675.jpeg?h=225&w=225"
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
                <Link  to="/checkout" style={{color:'white',textDecoration:'none'}}>Proceed to Checkout</Link>
              </button>
            </div>
          </div>
        </div>
        </>)
}

export default Cart