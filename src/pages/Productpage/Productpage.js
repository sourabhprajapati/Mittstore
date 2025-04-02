import React, { useState, useEffect, useContext } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import "./Productpage.css";
import Header from "../../components/header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../components/context/CartContext";
import { SearchContext } from "../../context/SearchContext";

const Productpage = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract subSubcategoryId from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const subSubcategoryId = queryParams.get("subSubcategoryId");

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      console.log("Fetched products:", data);
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Navigate to Product Detail Page using slug
  const handleNavigate = (slug) => {
    navigate(`/product/${slug}`);
  };

  // Add to Favorites/Wishlist
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Filter Products based on Search, Category, and Sub-Subcategory ID
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    // Handle sub-subcategory filtering with NULL check
    let matchesSubSubcategory = true;
    if (subSubcategoryId) {
      const subSubIdFromUrl = parseInt(subSubcategoryId, 10); // Ensure base 10 parsing
      const productSubSubId =
        product.sub_subcategory_id !== undefined && product.sub_subcategory_id !== null
          ? Number(product.sub_subcategory_id)
          : null;

      matchesSubSubcategory = productSubSubId === subSubIdFromUrl;

      // Debug filtering
      console.log(
        `Product: ${product.name}, sub_subcategory_id: ${product.sub_subcategory_id}, subSubIdFromUrl: ${subSubIdFromUrl}, matchesSubSubcategory: ${matchesSubSubcategory}`
      );
    }

    return matchesSearch && matchesCategory && matchesSubSubcategory;
  });

  // Dynamic Categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="app-container1">
      <Header setSearchTerm={setSearchTerm} />

      <main className="main-content1">
        <div className="categories-container1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`category-pill1 ${!selectedCategory ? "active" : ""}`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-pill1 ${selectedCategory === category ? "active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Listing */}
        <div className="products-grid1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card1"
                onClick={() => handleNavigate(product.slug)}
              >
                <div className="product-image-container1">
                  <img
                    src={
                      product.images && product.images.split(",")[0]
                        ? `http://localhost:5000/${product.images.split(",")[0].trim()}`
                        : "/placeholder.jpg"
                    }
                    alt={product.name}
                    className="product-image1"
                  />
                  <div className="category-tag1">
                    <span>{product.category}</span>
                  </div>
                </div>

                <div className="product-details1">
                  <h3 className="product-title1">{product.name}</h3>
                  <div className="product-footer1">
                    <div className="price-container1">
                      <span className="current-price1">₹{product.price}</span>
                      {product.discount_percentage > 0 && (
                        <span className="original-price1">
                          <del>
                            ₹{(
                              product.price /
                              (1 - product.discount_percentage / 100)
                            ).toFixed(2)}
                          </del>
                        </span>
                      )}
                      {product.discount_percentage > 0 && (
                        <div className="discount-badge1">
                          ({product.discount_percentage}% OFF)
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          ...product,
                          price: Number(product.price),
                          images: product.images
                            ? product.images.split(",")[0]
                            : "/placeholder.jpg",
                        });
                      }}
                      className="add-to-cart-button1"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No products found for this sub-subcategory.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Productpage;