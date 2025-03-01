import React from 'react'
import { useState, useEffect } from 'react';
import "./SchoolProfile.css"
import { Heart, MapPin, Ticket, Gift, Settings, Bell, ShoppingBag, Star, Zap, CheckCircle, Package } from 'lucide-react';
import supple from "../../assets/supplies.jpg"
import { Link } from "react-router-dom"
import { FaChildReaching } from "react-icons/fa6";
import { CgShoppingCart } from "react-icons/cg";
import { useLocation } from 'react-router-dom';



const SchoolProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get('tab');

  const [activeTab, setActiveTab] = useState(tabFromUrl || 'redeemPoints');
  const [user, setUser] = useState({
    full_name: '',
    role: ''


  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.email) return;
  
      try {
        const response = await fetch(`http://localhost:5000/api/orders/email/${user.email}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  // const [orders] = useState([
  //   {
  //     id: 'ORD-1234',
  //     date: '2023-07-20',
  //     status: 'Delivered',
  //     items: [
  //       { name: 'Textbooks', price: 1200, quantity: 5, image: supple },
  //       { name: 'Stationery Kit', price: 299, quantity: 2, image: supple }
  //     ],
  //     total: 1200 * 5 + 299 * 2
  //   },
  //   {
  //     id: 'ORD-1235',
  //     date: '2023-07-18',
  //     status: 'Processing',
  //     items: [
  //       { name: 'Art Supplies', price: 599, quantity: 3, image: supple }
  //     ],
  //     total: 599 * 3
  //   }
  // ]);



  const renderContent = () => {
    switch (activeTab) {
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
      case 'addressBook':
        return (
          <div className="content-area">
            <h2><MapPin className="icon" /> Address Book</h2>
            <div className="address-list">
              <div className="address-item">
                <h3>Home <span className="address-badge">Default</span></h3>
                <p>B-121 janta colony ,raja park pincode-83321</p>
                <div className="address-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-secondary">Delete</button>
                </div>
              </div>
              <div className="address-item">
                <h3>Work</h3>
                <p>B-233 Bapu Nagar ,jaipur pincode-302004</p>
                <div className="address-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-secondary">Delete</button>
                </div>
              </div>
            </div>
            <button className="btn-primary"><Zap size={18} /> Add New Address</button>
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
      case 'My order':
        return (
          <div className="content-area">
            <h2><ShoppingBag className="icon" /> My Orders</h2>
            <div className="orders-list">
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                orders.map((order, index) => (
                  <div key={index} className="order-card">
                    <div className="order-header">
                      <div className="order-meta">
                        <span className="order-id">Order #: {order.id}</span>
                        <span className="order-date">{order.createdAt}</span>
                      </div>
                    </div>

                    <div className="order-items">
                      {Array.isArray(order.items) ?
                        order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="order-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                              <h4>{item.name}</h4>
                              <div className="item-meta">
                                <span>Quantity: {item.quantity}</span>
                                <span>Price: ₹{item.price}</span>
                              </div>
                            </div>
                          </div>
                        ))
                        :
                        JSON.parse(order.items).map((item, itemIndex) => (
                          <div key={itemIndex} className="order-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                              <h4>{item.name}</h4>
                              <div className="item-meta">
                                <span>Quantity: {item.quantity}</span>
                                <span>Price: ₹{item.price}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>


                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total:</span>
                        <span className="total-amount">₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );



      case 'total Student':
        return (
          <div className="content-area">
            <h2><FaChildReaching className="icon" /> Total Student</h2>
            <div className="Student-table">
              <div className="table-header">
                <span className="table-column">Student Name</span>
                <span className="table-column">Purchase Amount</span>
                <span className="table-column">reward</span>
              </div>
              {[
                { Student: "mohit", purchaseAmount: "₹50,000", reward: "₹2,500" },
                { Student: "prerna", purchaseAmount: "₹70,000", reward: "₹3,500" },
                { Student: "lakshita", purchaseAmount: "₹60,000", reward: "₹3,000" },
                { Student: "sourabh", purchaseAmount: "₹80,000", reward: "₹4,000" },

              ].map((data, index) => (
                <div key={index} className="table-row">
                  <span className="table-column">{data.Student}</span>
                  <span className="table-column">{data.purchaseAmount}</span>
                  <span className="table-column">{data.reward}</span>
                </div>
              ))}
            </div>
          </div>
        );


      default:
        return <div className="content-area">Select a tab to view content.</div>;
    }
  };
  useEffect(() => {
    const fetchSchoolDetails = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;


      // try {
      //   const response = await fetch(`http://localhost:5000/api/school-details/${user.id}`);
      //   const data = await response.json();
      //   setUser({ full_name: data.schoolName,role:data.role} );
      // } catch (err) {
      //   console.error("Error fetching school name:", err);
      // }
      setUser({ full_name: user.schoolName, role: user.role });

    };
    fetchSchoolDetails();
  }, []);


  return (
    <div className="profile-container">
      <header className="profile-header">
        {/* <h1>My Profile</h1>
        <div className="user-info">
          <img src={men} alt="User Avatar" className="avatar" />
          <div className="user-details">
            <span className="user-name">Sourabh</span>
            <span className="user-status">sourabhprajapati920@gmail.com</span>
          </div>
        </div> */}
        {user.role === 'school' && (
          <div className="user-info">
            <h1>School Dashboard</h1>
            <div className="user-details">
              <span className="user-name">{user.full_name}</span>
              {/* <span className="user-status">{user.email}</span> */}
            </div>
          </div>
        )}
      </header>
      <div className="profile-content">
        <nav className="sidebar">
          <button
            className={`nav-button ${activeTab === 'redeemPoints' ? 'active' : ''}`}
            onClick={() => setActiveTab('redeemPoints')}
          >
            <Gift size={24} />
            <span>Redeem Points</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'total Student' ? 'active' : ''}`}
            onClick={() => setActiveTab('total Student')}
          >
            <FaChildReaching size={24} />
            <span>total Student</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'My order ' ? 'active' : ''}`}
            onClick={() => setActiveTab('My order')}
          >
            <CgShoppingCart size={24} />
            <span>My order</span>
          </button>

          <button
            className={`nav-button ${activeTab === 'coupons' ? 'active' : ''}`}
            onClick={() => setActiveTab('coupons')}
          >
            <Ticket size={24} />
            <span>Coupons</span>
          </button>




          <button
            className={`nav-button ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={24} />
            <span>Wishlist</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'addressBook' ? 'active' : ''}`}
            onClick={() => setActiveTab('addressBook')}
          >
            <MapPin size={24} />
            <span>Address Book</span>
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
    </div>)
}

export default SchoolProfile