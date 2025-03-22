import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import "./DropMenu1.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api"; // Update with your actual API URL

const DropMenu1 = () => {
  const [activeMenus, setActiveMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        if (response.data.success) {
          setCategories(response.data.data); // Store the nested category data
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError("Error fetching categories: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle menu hover to show submenus
  const handleMenuHover = (menuId) => {
    setActiveMenus((prev) => {
      if (!prev.includes(menuId)) {
        return [...prev, menuId];
      }
      return prev;
    });
  };

  // Handle menu leave to hide submenus
  const handleMenuLeave = (menuId) => {
    setActiveMenus((prev) => prev.filter((id) => !id.startsWith(menuId)));
  };

  // Handle click on menu item
  const handleMenuClick = (item) => {
    // Navigate only if it's a sub-subcategory (leaf node)
    if (!item.subcategories && !item.subSubcategories) {
      navigate(`/product?subSubcategoryId=${item.id}`);
    }
  };

  const isActive = (menuId) => activeMenus.includes(menuId);

  // Recursive function to render menu items dynamically
  const renderMenuItems = (items, parentId = "main") => {
    return items.map((item) => {
      const menuId = `${parentId}-${item.id}`; // Use item.id for uniqueness
      const hasSubItems =
        (item.subcategories && item.subcategories.length > 0) ||
        (item.subSubcategories && item.subSubcategories.length > 0);

      return (
        <div
          key={item.id}
          className="menu-item submenu-trigger"
          onMouseEnter={() => handleMenuHover(menuId)}
          onMouseLeave={() => handleMenuLeave(menuId)}
          onClick={() => handleMenuClick(item)}
        >
          <div className="menu-item-content">
            <span>{item.name}</span>
            {hasSubItems && (
              <ChevronRight
                className={`submenu-arrow ${isActive(menuId) ? "rotate" : ""}`}
              />
            )}
          </div>

          {hasSubItems && (
            <div className={`submenu ${isActive(menuId) ? "show" : ""}`}>
              {item.subcategories && item.subcategories.length > 0
                ? renderMenuItems(item.subcategories, menuId)
                : item.subSubcategories && item.subSubcategories.length > 0
                ? renderMenuItems(item.subSubcategories, menuId)
                : null}
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="page-container">
      <nav className="dropdown-nav">
        <button
          className={`menu-trigger ${isActive("main") ? "active" : ""}`}
          onMouseEnter={() => handleMenuHover("main")}
          onMouseLeave={() => handleMenuLeave("main")}
        >
          <span>Shop Our Product</span>
          <ChevronDown className="menu-arrow" />
        </button>

        <div
          className={`menu-container ${isActive("main") ? "show" : ""}`}
          onMouseEnter={() => handleMenuHover("main")}
          onMouseLeave={() => handleMenuLeave("main")}
        >
          {categories.length > 0 ? (
            renderMenuItems(categories)
          ) : (
            <div>No categories available</div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default DropMenu1;