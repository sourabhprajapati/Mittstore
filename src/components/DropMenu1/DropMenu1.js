import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import "./DropMenu1.css";

const DropMenu1 = () => {
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
          <span>Shop Our Product</span>
          <ChevronDown className="menu-arrow" />
        </button>

        <div 
          className={`menu-container ${isActive('main') ? 'show' : ''}`}
          onMouseEnter={() => handleMenuHover('main')}
          onMouseLeave={() => handleMenuLeave('main')}
        >
          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Academic Materials')}
            onMouseLeave={() => handleMenuLeave('Academic Materials')}
          >
            <div className="menu-item-content">
              <span>Academic Materials</span>
              <ChevronRight className={`submenu-arrow ${isActive('Academic Materials') ? 'rotate' : ''}`} />
            </div>

            <div className={`submenu ${isActive('Academic Materials') ? 'show' : ''}`}>
              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Textbooks & workbooks')}
                onMouseLeave={() => handleMenuLeave('Textbooks & workbooks')}
              >
                <div className="menu-item-content">
                  <span>Textbooks & workbooks</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Textbooks & workbooks') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Textbooks & workbooks') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Core Subjects</span>
                  </div>
                  <div className="menu-item">
                    <span>Supplementary Resources</span>
                  </div>
                </div>
              </div>

              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Reference Books')}
                onMouseLeave={() => handleMenuLeave('Reference Books')}
              >
                <div className="menu-item-content">
                  <span>Reference Books</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Reference Books') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Reference Books') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Dictionaries & Encyclopedias</span>
                  </div>
                </div>
              </div>

              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Educational Software & Apps')}
                onMouseLeave={() => handleMenuLeave('Educational Software & Apps')}
              >
                <div className="menu-item-content">
                  <span>Educational Software & Apps</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Educational Software & Apps') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Educational Software & Apps') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Learning Platforms</span>
                  </div>
                  <div className="menu-item">
                    <span>Educational Games</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('School Supplies')}
            onMouseLeave={() => handleMenuLeave('School Supplies')}
          >
            <div className="menu-item-content">
              <span>School Supplies</span>
              <ChevronRight className={`submenu-arrow ${isActive('School Supplies') ? 'rotate' : ''}`} />
            </div>

            <div className={`submenu ${isActive('School Supplies') ? 'show' : ''}`}>
              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Stationery')}
                onMouseLeave={() => handleMenuLeave('Stationery')}
              >
                <div className="menu-item-content">
                  <span>Stationery</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Stationery') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Stationery') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Writing Instrument</span>
                  </div>
                  <div className="menu-item">
                    <span>Notebooks & Paper</span>
                  </div>
                  <div className="menu-item">
                    <span>Art Supplies</span>
                  </div>
                </div>
              </div>

              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Classroom Supplies')}
                onMouseLeave={() => handleMenuLeave('Classroom Supplies')}
              >
                <div className="menu-item-content">
                  <span>Classroom Supplies</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Classroom Supplies') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Classroom Supplies') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Whiteboards & Markers</span>
                  </div>
                  <div className="menu-item">
                    <span>Charts & Posters</span>
                  </div>
                  <div className="menu-item">
                    <span>Classroom Decor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Learning & Teaching Aids')}
            onMouseLeave={() => handleMenuLeave('Learning & Teaching Aids')}
          >
            <div className="menu-item-content">
              <span>Learning & Teaching Aids</span>
              <ChevronRight className={`submenu-arrow ${isActive('Learning & Teaching Aids') ? 'rotate' : ''}`} />
            </div>

            <div className={`submenu ${isActive('Learning & Teaching Aids') ? 'show' : ''}`}>
              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Manipulatives')}
                onMouseLeave={() => handleMenuLeave('Manipulatives')}
              >
                <div className="menu-item-content">
                  <span>Manipulatives</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Manipulatives') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Manipulatives') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Math Manipulatives</span>
                  </div>
                  <div className="menu-item">
                    <span>Science Kits</span>
                  </div>
                  <div className="menu-item">
                    <span>Language Arts Tools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Toys & Games')}
            onMouseLeave={() => handleMenuLeave('Toys & Games')}
          >
            <div className="menu-item-content">
              <span>Toys & Games</span>
              <ChevronRight className={`submenu-arrow ${isActive('Toys & Games') ? 'rotate' : ''}`} />
            </div>

            <div className={`submenu ${isActive('Toys & Games') ? 'show' : ''}`}>
              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Educational Toys')}
                onMouseLeave={() => handleMenuLeave('Educational Toys')}
              >
                <div className="menu-item-content">
                  <span>Educational Toys</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Educational Toys') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Educational Toys') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Puzzles & Games</span>
                  </div>
                  <div className="menu-item">
                    <span>Building Toys</span>
                  </div>
                </div>
              </div>

              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Toys & Games1')}
                onMouseLeave={() => handleMenuLeave('Toys & Games1')}
              >
                <div className="menu-item-content">
                  <span>Toys & Games</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Toys & Games1') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Toys & Games1') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Soft Toys</span>
                  </div>
                  <div className="menu-item">
                    <span>Outdoor Play Equipment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Play School Supplies')}
            onMouseLeave={() => handleMenuLeave('Play School Supplies')}
          >
            <div className="menu-item-content">
              <span>Play School Supplies</span>
              <ChevronRight className={`submenu-arrow ${isActive('Play School Supplies') ? 'rotate' : ''}`} />
            </div>

            <div className={`submenu ${isActive('Play School Supplies') ? 'show' : ''}`}>
              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Furniure')}
                onMouseLeave={() => handleMenuLeave('Furniure')}
              >
                <div className="menu-item-content">
                  <span>Furniure</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Furniure') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Furniure') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Tables & Chairs</span>
                  </div>
                  <div className="menu-item">
                    <span>Storage Solution</span>
                  </div>
                </div>
              </div>

              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Learning Materials')}
                onMouseLeave={() => handleMenuLeave('Learning Materials')}
              >
                <div className="menu-item-content">
                  <span>Learning Materials</span>
                  <ChevronRight className={`submenu-arrow ${isActive('Learning Materials') ? 'rotate' : ''}`} />
                </div>

                <div className={`submenu ${isActive('Learning Materials') ? 'show' : ''}`}>
                  <div className="menu-item">
                    <span>Flashcards & cards</span>
                  </div>
                  <div className="menu-item">
                    <span>Activity Books & Workbooks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Class Projects')}
            onMouseLeave={() => handleMenuLeave('Class Projects')}
          >
            <div className="menu-item-content">
              <span>Class Projects</span>
              <ChevronRight className={`submenu-arrow ${isActive('Class Projects') ? 'rotate' : ''}`} />
            </div>

            <div className={`submenu ${isActive('Class Projects') ? 'show' : ''}`}>
              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Subject projects')}
                onMouseLeave={() => handleMenuLeave('Subject projects')}
              >
                <div className="menu-item-content">
                  <span>Subject projects</span>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="menu-item submenu-trigger"
            onMouseEnter={() => handleMenuHover('Rental items')}
            onMouseLeave={() => handleMenuLeave('Rental items')}
          >
            <div className="menu-item-content">
              <span>Rental items</span>
              <ChevronRight className={`submenu-arrow ${isActive('Rental items') ? 'rotate' : ''}`} />
            </div>

            <div className={`submenu ${isActive('Rental items') ? 'show' : ''}`}>
              <div 
                className="menu-item submenu-trigger"
                onMouseEnter={() => handleMenuHover('Rental items for School/Students')}
                onMouseLeave={() => handleMenuLeave('Rental items for School/Students')}
              >
                <div className="menu-item-content">
                  <span>Rental items for School/Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DropMenu1;