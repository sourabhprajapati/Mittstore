import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './DropMenu5.css';

const DropMenu5 = () => {
  const [activeMenus, setActiveMenus] = useState([]);

  const handleMenuHover = (menuId) => {
    setActiveMenus(prev => {
      if (!prev.includes(menuId)) {
        return [...prev, menuId];
      }
      return prev;
    });
  };

  const handleMenuLeave = (menuId) => {
    setActiveMenus(prev => prev.filter(id => !id.startsWith(menuId)));
  };

  const isActive = (menuId) => activeMenus.includes(menuId);

  return (
    <div className="page-container">
      <nav className="dropdown-nav">
        <button 
          className={`menu-trigger ${isActive('main') ? 'active' : ''}`}
          onMouseEnter={() => handleMenuHover('main')}
          onMouseLeave={() => handleMenuLeave('main')}
        >
          <span>Company</span>
          <ChevronDown className="menu-arrow" />
        </button>

        <div 
          className={`menu-container ${isActive('main') ? 'show' : ''}`}
          onMouseEnter={() => handleMenuHover('main')}
          onMouseLeave={() => handleMenuLeave('main')}
        >
          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('About Us')}
            onMouseLeave={() => handleMenuLeave('About Us')}
          >
            <div className="menu-item-content">
              <span>About Us</span>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Our Leaders')}
            onMouseLeave={() => handleMenuLeave('Our Leaders')}
          >
            <div className="menu-item-content">
              <span>Our Leaders</span>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Career')}
            onMouseLeave={() => handleMenuLeave('Career')}
          >
            <div className="menu-item-content">
              <span>Career</span>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Testimonials')}
            onMouseLeave={() => handleMenuLeave('Testimonials')}
          >
            <div className="menu-item-content">
              <span>Testimonials</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DropMenu5;