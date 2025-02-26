import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const addToCart = async (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ 
        ...product, 
        quantity: 1, 
        image: product.image || "https://via.placeholder.com/150" // Default image if missing
      });
    }
    console.log(JSON.parse(localStorage.getItem("cartItems")));

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartItems([...cartItems]);
    return true;
  };
  
  const updateQuantity = (productId, change) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  
 
  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  

  const getCartTotals = () => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    return { itemCount };
  };

  return (
    <CartContext.Provider value={{ cartItems,setCartItems, addToCart, updateQuantity, removeItem, getCartTotals }}>

      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);