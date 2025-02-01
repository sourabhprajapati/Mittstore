import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './DropMenu4.css';

const DropMenu4 = () => {
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
          <span>Bulk Purchase</span>
          <ChevronDown className="menu-arrow" />
        </button>

        <div 
          className={`menu-container ${isActive('main') ? 'show' : ''}`}
          onMouseEnter={() => handleMenuHover('main')}
          onMouseLeave={() => handleMenuLeave('main')}
        >
          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Fill the Form')}
            onMouseLeave={() => handleMenuLeave('Fill the Form')}
          >
            <div className="menu-item-content">
              <span>Fill the Form</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DropMenu4;