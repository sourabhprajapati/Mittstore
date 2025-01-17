import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import "./Productpage.css"
import Header from '../../components/header/Header';
import acdamic from "../../assets/Academicmaterials.jpg"
import schoolsupplies from "../../assets/SchoolSupplies.jpg"
import ToysGames from "../../assets/ToyGames.jpg"
const products = [
    {
      id: 1,
      name: "Textbooks & Workbooks",
      price: 160,
      image:acdamic,
      description: "Comprehensive resources that provide in-depth theoretical knowledge on a subject.",
      category: "Academic Materials"
    },
    {
      id: 2,
      name: "Stationery",
      price: 199,
      image: schoolsupplies,
      description: " Essential tools and supplies for writing.",
      category: "School Supplies"
    },
    {
      id: 3,
      name: "Educational Toys",
      price: 129,
      image:ToysGames ,
      description: "Engaging and entertaining items designed to inspire creativity, promote learning, and provide fun for children and adults alike.",
      category: "Toys & Games"
    },
    {
      id: 4,
      name: "Smart Home Speaker",
      price: 299,
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=600",
      description: "360° sound with voice assistant integration.",
      category: "Electronics"
    },
    {
      id: 5,
      name: "Premium Backpack",
      price: 89,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
      description: "Water-resistant design with laptop compartment.",
      category: "Accessories"
    },
    {
      id: 6,
      name: "Wireless Keyboard",
      price: 149,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600",
      description: "Mechanical switches with customizable RGB.",
      category: "Electronics"
    }
  ];
  
  const categories = [...new Set(products.map(p => p.category))];
const Productpage = () => {
    const [cartItems, setCartItems] = useState(0);
    const [favorites, setFavorites] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const addToCart = () => {
      setCartItems(prev => prev + 1);
    };
  
    const toggleFavorite = (productId) => {
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(productId)) {
          newFavorites.delete(productId);
        } else {
          newFavorites.add(productId);
        }
        return newFavorites;
      });
    };
  
    const filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    return (
      <div className="app-container">
        <Header/>
  
        <main className="main-content">
          <div className="categories-container">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`category-pill ${!selectedCategory ? 'active' : ''}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
  
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="favorite-button"
                  >
                    <Heart 
                      className={`favorite-icon ${favorites.has(product.id) ? 'active' : ''}`}
                    />
                  </button>
                  <div className="category-tag">
                    <span>{product.category}</span>
                  </div>
                </div>
                
                <div className="product-details">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="price-tag">
                    ₹{product.price}
                    </span>
                    <button 
                      onClick={addToCart}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>)
}

export default Productpage
