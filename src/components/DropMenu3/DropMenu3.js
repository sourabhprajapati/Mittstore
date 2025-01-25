import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import "./DropMenu3.css"
const DropMenu3 = () => {
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
             <span>Ideas And Resources</span>
             <ChevronDown className="menu-arrow" />
           </button>
   
           <div className={`menu-container ${isActive('main') ? 'show' : ''}`}>
           <div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Daily Planner</span>
               </div>
   
               
             </div>
             <div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Digital Content</span>
               </div>
   
               
             </div><div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Activities</span>
               </div>
   
               
             </div><div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Worksheets</span>
               </div>
   
               
             </div><div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Talent Box</span>
               </div>
   
               
             </div><div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Talent Box</span>
               </div>
   
               
             </div>
             <div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Teacher Manual</span>
               </div>
   
               
             </div>
             <div 
               className="menu-item submenu-trigger"
               onClick={() => handleMenuClick('Early Childhood')}
               
             >
               <div className="menu-item-content">
                
                 <span>Question Bank</span>
               </div>
   
               
             </div>
   
             
   
             
   
            
           </div>
         </nav>
       </div>
     );
}

export default DropMenu3
