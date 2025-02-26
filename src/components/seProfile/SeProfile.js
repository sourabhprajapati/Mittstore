import React, { useState, useEffect } from 'react';
import "./SeProfile.css";
import { Heart, MapPin, Ticket, Gift, Settings, Bell, ShoppingBag, Star, Zap } from 'lucide-react';
import men from "../../assets/men.jpg";
import supple from "../../assets/supplies.jpg";
import { Link } from "react-router-dom";
import { BiSolidSchool } from "react-icons/bi";

const SeProfile = () => {
  const [activeTab, setActiveTab] = useState('Total School');
  const [user, setUser] = useState({
    full_name: '',
    email: '',
    role: '',
    userId: '', // SE ID field
  });

  const [selectedSchool, setSelectedSchool] = useState('');
  const [generatedCoupon, setGeneratedCoupon] = useState(null); // state for the generated coupon
  const schools = [
    "St. Xavier's School",
    "DPS Jaipur",
    "Ryan International",
    "Tagore Public School"
  ];


  // Function to generate a random coupon code
  const generateCoupon = () => {
    const randomCode = 'COUPON-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const discounts = ['10% off', '20% off', 'Free Shipping', '₹100 off'];
    const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)];

    setGeneratedCoupon({
      code: randomCode,
      discount: randomDiscount,
      expiry: new Date().toLocaleDateString(),
      school: selectedSchool, // Add selected school to coupon details
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'addressBook':
      case 'wishlist':
        return (
          <div className="content-area">
            <h2><Heart className="icon" /> My Wishlist</h2>
            <div className="wishlist-grid">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="wishlist-item">
                  <div className="wishlist-image">
                    <img src={supple} alt={`Wishlist Item ${item}`} />
                    <span className="wishlist-badge">New</span>
                  </div>
                  <h3>Awesome Product {item}</h3>
                  <p className="price">₹99.99</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < 4 ? 'filled' : ''} />
                    ))}
                  </div>
                  <Link to='/cart'><button className="btn-primary">Add to Cart</button></Link>
                </div>
              ))}
            </div>
          </div>
        );

      case 'coupons':
        return (
          <div className="content-area">
            <h2><Ticket className="icon" /> My Coupons</h2>
            <div className="coupon-list">
              {[
                { code: 'SUMMER21', discount: '20% off', expiry: '2023-08-31', color: 'coupon-blue' },
                { code: 'FREESHIP', discount: 'Free Shipping', expiry: '2023-07-15', color: 'coupon-green' },
                { code: 'SAVE10', discount: '₹10 off ₹50+', expiry: '2023-09-30', color: 'coupon-orange' },
              ].map((coupon, index) => (
                <div key={index} className={`coupon-item ${coupon.color}`}>
                  <h3>{coupon.code}</h3>
                  <p className="discount">{coupon.discount}</p>
                  <p className="expiry">Expires: {coupon.expiry}</p>
                  <button className="btn-secondary">Use Coupon</button>
                </div>
              ))}
            </div>
          </div>
        );

      // Added new "Generate Coupon" case
      case 'Genrate coupons':
        return (
          <div className="content-area">
            <h2><Ticket className="icon" /> Generate Coupons</h2>
            <div className="generate-coupon">
              <div className="user-id-box">
                <label htmlFor="user-id">SE ID:</label>
                <input type="text" id="user-id" value={user.userId} disabled/>
              </div>
              <div className="school-select-box">
                <label htmlFor="school">Select School:</label>
                <select
                  id="school"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                >
                  <option value="">Select a School</option>
                  {schools.map((school, index) => (
                    <option key={index} value={school}>{school}</option>
                  ))}
                </select>
              </div>
              <button className="btn-primary" onClick={generateCoupon} disabled={!selectedSchool}>
                Generate Coupon
              </button>
              {generatedCoupon && (
                <div className="coupon-details">
                  <h3>Coupon Code: {generatedCoupon.code}</h3>
                  <p>Discount: {generatedCoupon.discount}</p>
                  <p>Expires on: {generatedCoupon.expiry}</p>
                  <p>School: {generatedCoupon.school}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'Total School':
        return (
          <div className="content-area">
            <h2><BiSolidSchool className="icon" /> Total School</h2>
            <div className="school-table">
              <div className="table-header">
                <span className="table-column">School Name</span>
                <span className="table-column">Purchase Amount</span>
                <span className="table-column">Incentive</span>
              </div>
              {[
                { school: "St. Xavier's School", purchaseAmount: "₹50,000", incentive: "₹2,500" },
                { school: "DPS Jaipur", purchaseAmount: "₹70,000", incentive: "₹3,500" },
                { school: "Ryan International", purchaseAmount: "₹60,000", incentive: "₹3,000" },
                { school: "Tagore Public School", purchaseAmount: "₹80,000", incentive: "₹4,000" },
              ].map((data, index) => (
                <div key={index} className="table-row">
                  <span className="table-column">{data.school}</span>
                  <span className="table-column">{data.purchaseAmount}</span>
                  <span className="table-column">{data.incentive}</span>
                </div>
              ))}
            </div>
          </div>
        );
        case 'redeemPoints':
                return (
                  <div className="content-area">
                    <h2><Gift className="icon" /> Redeem Points</h2>
                    <div className="points-info">
                      <div className="points-balance">
                        <h3>Current Balance</h3>
                        <p className="points">1,500 pts</p>
                      </div>
                      <div className="points-value">
                        <h3>Value</h3>
                        <p className="value">₹15.00</p>
                      </div>
                    </div>
                    <div className="redeem-options">
                      <h3>Redeem for:</h3>
                      <div className="redeem-grid">
                        <button className="btn-primary"><ShoppingBag size={18} /> ₹5 Off Coupon (500 pts)</button>
                        <button className="btn-primary"><ShoppingBag size={18} /> ₹10 Off Coupon (1000 pts)</button>
                        <button className="btn-primary"><ShoppingBag size={18} /> Free Shipping (750 pts)</button>
                        <button className="btn-primary"><ShoppingBag size={18} /> ₹20 Off Coupon (2000 pts)</button>
                      </div>
                    </div>
                  </div>
                );
              case 'settings':
                return (
                  <div className="content-area">
                    <h2><Settings className="icon" /> Account Settings</h2>
                    <form className="settings-form">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" defaultValue="Sourabh" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" defaultValue="Sourabh@example.com" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" id="password" name="password" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" />
                      </div>
                      <button type="submit" className="btn-primary">Save Changes</button>
                    </form>
                  </div>
                );
              case 'manageNotifications':
                return (
                  <div className="content-area">
                    <h2><Bell className="icon" /> Manage Notifications</h2>
                    <div className="notification-settings">
                      <div className="notification-option">
                        <label htmlFor="emailNotifications" className="switch">
                          <input type="checkbox" id="emailNotifications" defaultChecked />
                          <span className="slider"></span>
                        </label>
                        <span>Email Notifications</span>
                      </div>
                      <div className="notification-option">
                        <label htmlFor="smsNotifications" className="switch">
                          <input type="checkbox" id="smsNotifications" />
                          <span className="slider"></span>
                        </label>
                        <span>SMS Notifications</span>
                      </div>
                      <div className="notification-option">
                        <label htmlFor="pushNotifications" className="switch">
                          <input type="checkbox" id="pushNotifications" defaultChecked />
                          <span className="slider"></span>
                        </label>
                        <span>Push Notifications</span>
                      </div>
                      <div className="notification-option">
                        <label htmlFor="orderUpdates" className="switch">
                          <input type="checkbox" id="orderUpdates" defaultChecked />
                          <span className="slider"></span>
                        </label>
                        <span>Order Updates</span>
                      </div>
                      <div className="notification-option">
                        <label htmlFor="promotionalEmails" className="switch">
                          <input type="checkbox" id="promotionalEmails" />
                          <span className="slider"></span>
                        </label>
                        <span>Promotional Emails</span>
                      </div>
                    </div>
                    <button className="btn-primary">Save Preferences</button>
                  </div>
                );

      default:
        return <div className="content-area">Select a tab to view content.</div>;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const seId = localStorage.getItem('seEmployeeId'); // Assuming you store SE ID after login
        if (!seId) {
          console.error("SE ID not found in localStorage.");
          return;
        }
  
        const response = await fetch(`http://localhost:5000/api/se-details/${seId}`);
        const data = await response.json();
  
        if (data.seDetails) {
          setUser({
            full_name: `${data.seDetails.first_name} ${data.seDetails.last_name}`,
            email: data.seDetails.email,
            role: 'se',
            userId: data.seDetails.employee_id,
          });
        } else {
          console.error("SE details not found.");
        }
      } catch (error) {
        console.error("Error fetching SE details:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  return (
    <div className="profile-container">
      <header className="profile-header">
        {user.role === 'se' && (
          <div className="user-info">
            <h1>SE Dashboard</h1>
            <div className="user-details">
              <span className="user-name">{user.full_name}</span>
            </div>
          </div>
        )}
      </header>
      <div className="profile-content">
        <nav className="sidebar">
          <button
            className={`nav-button ${activeTab === 'Total School' ? 'active' : ''}`}
            onClick={() => setActiveTab('Total School')}
          >
            <BiSolidSchool size={24} />
            <span>Total School</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'Genrate coupons' ? 'active' : ''}`}
            onClick={() => setActiveTab('Genrate coupons')}
          >
            <BiSolidSchool size={24} />
            <span>Generate Coupons</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'coupons' ? 'active' : ''}`}
            onClick={() => setActiveTab('coupons')}
          >
            <Ticket size={24} />
            <span>Coupons</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'redeemPoints' ? 'active' : ''}`}
            onClick={() => setActiveTab('redeemPoints')}
          >
            <Gift size={24} />
            <span>Redeem Points</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={24} />
            <span>Wishlist</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={24} />
            <span>Settings</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'manageNotifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('manageNotifications')}
          >
            <Bell size={24} />
            <span>Manage Notifications</span>
          </button>
        </nav>
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SeProfile;