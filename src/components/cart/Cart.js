import React, { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import "./Cart.css";
import Header from '../header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from "axios";

const Cart = () => {
    const { cartItems, loading: contextLoading, updateQuantity, removeItem, setCartItems } = useCart();
    const [localLoading, setLocalLoading] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const sessionCartKey = "guest_cart";

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
    const taxRate = 0.10;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    useEffect(() => {
        if (!user) {
            const guestCart = JSON.parse(sessionStorage.getItem(sessionCartKey)) || [];
            setCartItems(guestCart);
        }
    }, [user]);

    useEffect(() => {
        let isMounted = true;

        const fetchUserCart = async () => {
            if (user && !localLoading) {
                try {
                    setLocalLoading(true);
                    console.log(`Fetching cart for user ID: ${user.id}`);
                    const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
                    console.log("API response:", response.data);
                    if (isMounted) {
                        if (response.data.success && response.data.data && response.data.data.items) {
                            setCartItems(response.data.data.items);
                        } else {
                            setCartItems([]);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user cart:", {
                        status: error.response?.status,
                        data: error.response?.data,
                        message: error.message
                    });
                    if (isMounted) {
                        setCartItems([]);
                    }
                } finally {
                    if (isMounted) {
                        setLocalLoading(false);
                    }
                }
            }
        };

        fetchUserCart();

        return () => {
            isMounted = false;
        };
    }, [user]);

    const addToCart = async (product) => {
        if (user) {
            try {
                await axios.post("http://localhost:5000/api/cart/add", {
                    userId: user.id,
                    productId: product.productId || product.id,
                    quantity: 1
                });
                const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
                setCartItems(response.data.data.items);
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        } else {
            const guestCart = JSON.parse(sessionStorage.getItem(sessionCartKey)) || [];
            const existingItemIndex = guestCart.findIndex(item => item.id === product.id);
            if (existingItemIndex >= 0) {
                guestCart[existingItemIndex].quantity += 1;
            } else {
                guestCart.push({ ...product, quantity: 1 });
            }
            sessionStorage.setItem(sessionCartKey, JSON.stringify(guestCart));
            setCartItems(guestCart);
        }
    };

    const proceedToCheckout = () => {
        if (!user) {
            alert("You must be logged in to proceed to checkout.");
            navigate("/user/login");
        } else {
            navigate("/checkout");
        }
    };
    return (
        <>
            <Header />
            <div className="cart-container">
                <div className="cart-header">
                    <h1><ShoppingCart className="cart-icon" /> Shopping Cart</h1>
                    <span>{itemCount} items</span>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {localLoading || contextLoading ? (
                            <div className="loading">Loading cart items...</div>
                        ) : cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <h3>Your cart is empty</h3>
                                <p>Add some products to your cart to see them here.</p>
                                <Link to="/" className="continue-shopping">Continue Shopping</Link>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img
                                        src={item.images ? `http://localhost:5000/${item.images}` : "/placeholder.jpg"}
                                        alt={item.name}
                                        className="item-image"
                                        onError={(e) => e.target.src = "/placeholder.jpg"}
                                    />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-price">₹{(Number(item.price) || 0).toFixed(2)}</p>
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
                                        <p>₹{((Number(item.price) || 0) * (item.quantity || 0)).toFixed(2)}</p>
                                        <button
                                            className="remove-button"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
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
                            <button className="checkout-button" onClick={proceedToCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;