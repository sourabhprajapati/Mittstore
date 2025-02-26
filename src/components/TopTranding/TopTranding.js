import React, { useEffect, useState } from "react";
import "./TopTranding.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useCart } from "../context/CartContext"; // Import the cart context

const TopTranding = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the cart context

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/products/top-trending")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("API returned an error:", data.message);
          setProducts([]);
        }
      })
      .catch((error) => console.error("Error fetching trending products:", error))
      .finally(() => setLoading(false));
  }, []);

  // Function to handle product click - opens product detail
  const handleProductClick = (productId) => {
    window.open(`http://localhost:3000/productdetail/${productId}`, '_blank');
  };

  // Function to add product to cart and navigate to checkout
  const handleAddToCart = async (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const success = await addToCart(product);
    if (success) {
        alert("Item added to cart!");
        // navigate("/cart"); // Redirect to the cart page
    } else {
        alert("Failed to add item to cart!");
    }
  };

  return (
    <div className="top-categorish">
      <h1 className="title">Top Trending</h1>
      
      {loading ? (
        <div className="loading">Loading trending products...</div>
      ) : products.length === 0 ? (
        <div className="no-products">No trending products available</div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
            1200: { slidesPerView: 4, spaceBetween: 50 },
            1600: { slidesPerView: 5, spaceBetween: 50 },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id || product._id}>
              <Link to={`/product/${product.name}`} className="product-image-link">
                <img 
                  src={product.images && product.images.length > 0 
                    ? product.images[0] 
                    : "/placeholder.jpg"} 
                  alt={product.name}
                  onError={(e) => {
                    console.log("Image failed to load:", e.target.src);
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </Link>
              <div
                className="product-name-link" 
                onClick={() => handleProductClick(product.id || product._id)}
              >
                <p>{product.short_description || product.name}</p>
              </div>
              <h5>₹{product.price} <span>M.R.P: <del>₹{(product.price * 1.3).toFixed(2)}</del></span> (30% off)</h5>
              <button onClick={(e) => handleAddToCart(product, e)}>Add to cart</button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopTranding;