import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import "./DropMenu5.css"
const DropMenu5 = () => {
  const [activeMenus, setActiveMenus] = useState([]);
  
      const handleMenuClick = (menuId) => {
        setActiveMenus(prev => {
          if (prev.includes(menuId)) {
            return prev.filter(id => !id.startsWith(menuId));
          }
          return [...prev, menuId];
        });
      };
    
      const isActive = (menuId) => activeMenus.includes(menuId);
    
      return (
        <div className="page-container">
          <nav className="dropdown-nav">
            <button 
              className={`menu-trigger ${isActive('main') ? 'active' : ''}`}
              onClick={() => handleMenuClick('main')}
              
              
            >
              <span>Company</span>
              <ChevronDown className="menu-arrow" />
            </button>
    
            <div className={`menu-container ${isActive('main') ? 'show' : ''}`}>
            <div 
                className="menu-item submenu-trigger"
                onClick={() => handleMenuClick('Early Childhood')}
                
              >
                <div className="menu-item-content">
                 
                  <span>About Us</span>
                </div>
    
                
              </div>
              <div 
                className="menu-item submenu-trigger"
                onClick={() => handleMenuClick('Early Childhood')}
                
              >
                <div className="menu-item-content">
                 
                  <span>Our Leaders</span>
                </div>
    
                
              </div><div 
                className="menu-item submenu-trigger"
                onClick={() => handleMenuClick('Early Childhood')}
                
              >
                <div className="menu-item-content">
                 
                  <span>Career</span>
                </div>
    
                
              </div><div 
                className="menu-item submenu-trigger"
                onClick={() => handleMenuClick('Early Childhood')}
                
              >
                <div className="menu-item-content">
                 
                  <span>Testimonials</span>
                </div>
    
                
              </div>
    
              
    
              
    
             
            </div>
          </nav>
        </div>
      );
}

export default DropMenu5
