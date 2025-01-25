import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './DropMenu.css'
const DropMenu = () => {
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
            <span>Shop By Learning</span>
            <ChevronDown className="menu-arrow" />
          </button>
  
          <div className={`menu-container ${isActive('main') ? 'show' : ''}`}>
          <div 
              className="menu-item submenu-trigger"
              onClick={() => handleMenuClick('Early Childhood')}
              
            >
              <div className="menu-item-content">
               
                <span>Early Childhood</span>
                <ChevronRight className={`submenu-arrow ${isActive('Early Childhood') ? 'rotate' : ''}`} />
              </div>
  
              <div className={`submenu ${isActive('Early Childhood') ? 'show' : ''}`}>
                <div className="menu-item">
                  
                  <span>Pre-school Age 3</span>
                </div>
                <div className="menu-item">
                  
                  <span>Pre-k Ages 4-5</span>
                </div>
                <div className="menu-item">
                  
                  <span>Kindergarten</span>
                </div>
                
                
              </div>
            </div>
  
            <div 
              className="menu-item submenu-trigger"
              onClick={() => handleMenuClick('services')}
            >
              <div className="menu-item-content">
               
                <span>Elementary</span>
                <ChevronRight className={`submenu-arrow ${isActive('services') ? 'rotate' : ''}`} />
              </div>
  
              <div className={`submenu ${isActive('services') ? 'show' : ''}`}>
                <div className="menu-item">
                  
                  <span>Kindergarten</span>
                </div>
                <div className="menu-item">
                  
                  <span>1-2 Grade</span>
                </div>
                <div className="menu-item">
                  
                  <span>3-4 Grade</span>
                </div>
                <div className="menu-item">
                  
                  <span>5-6 Grade</span>
                </div>
                
              </div>
            </div>
  
            <div 
              className="menu-item submenu-trigger"
              onClick={() => handleMenuClick('resources')}
            >
              <div className="menu-item-content">
                <span>Middle School</span>
                <ChevronRight className={`submenu-arrow ${isActive('resources') ? 'rotate' : ''}`} />
              </div>
  
              <div className={`submenu ${isActive('resources') ? 'show' : ''}`}>
                <div className="menu-item">
                  <span>6-9 Grade</span>
                </div>
               
              </div>
            </div>
  
           
          </div>
        </nav>
      </div>
    );
}

export default DropMenu
