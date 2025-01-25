import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import "./DropMenu4.css"
const DropMenu4 = () => {
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
              <span>Bulk Purchase</span>
              <ChevronDown className="menu-arrow" />
            </button>
    
            <div className={`menu-container ${isActive('main') ? 'show' : ''}`}>
            <div 
                className="menu-item submenu-trigger"
                onClick={() => handleMenuClick('Fill the Form')}
                
              >
                <div className="menu-item-content">
                 
                  <span>Fill the Form</span>
                </div>
    
                
              </div>
              
              
    
              
    
             
            </div>
          </nav>
        </div>
      );
}

export default DropMenu4
