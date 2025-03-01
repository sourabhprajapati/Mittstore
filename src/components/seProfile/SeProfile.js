import React, { useState, useEffect } from 'react';
import "./SeProfile.css";
import { Heart, MapPin, Ticket, Gift, Settings, Bell, ShoppingBag, Star, Zap } from 'lucide-react';
import men from "../../assets/men.jpg";
import supple from "../../assets/supplies.jpg";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { BiSolidSchool } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
const SeProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get('tab');

  const [activeTab, setActiveTab] = useState(tabFromUrl || 'Total School');
  const [schools, setSchools] = useState([]);
  const [schoolsWithCoupons, setSchoolsWithCoupons] = useState([]);

  const [user, setUser] = useState({
    full_name: '',
    email: '',
    role: '',
    userId: '', // SE ID field
  });
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);


  const [selectedSchool, setSelectedSchool] = useState('');
  const [generatedCoupon, setGeneratedCoupon] = useState(null); // state for the generated coupon

  // Check if school already has an active coupon
  const schoolHasCoupon = (schoolId) => {
    return schoolsWithCoupons.some(coupon => coupon.school_id === parseInt(schoolId));
  };

  // Function to generate a random coupon code
  const generateCoupon = async () => {
    if (!selectedSchool) {
      alert("Please select a school first.");
      return;
    }

    // Check if this school already has a coupon
    if (schoolHasCoupon(selectedSchool)) {
      alert("A coupon has already been generated for this school. Please select a different school.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId: selectedSchool,
          seEmployeeId: user.userId,  // SE ID is automatically passed
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const selectedSchoolName = schools.find(school => school.id.toString() === selectedSchool.toString())?.school_name || '';

        setGeneratedCoupon({
          schoolCode: data.schoolCouponCode,
          studentCode: data.studentCouponCode,
          schoolDiscount: "10% off",
          studentDiscount: "15% off",
          school_id: parseInt(selectedSchool),
          school_name: selectedSchoolName,
          studentCount: data.studentCount
        });

        // Update the list of schools with coupons
        setSchoolsWithCoupons([...schoolsWithCoupons, {
          school_id: parseInt(selectedSchool),
          code: data.schoolCouponCode,
          coupon_type: 'school'
        }, {
          school_id: parseInt(selectedSchool),
          code: data.studentCouponCode,
          coupon_type: 'student'
        }]);

        alert("School and student coupons generated successfully!");


        // Refresh the list of coupons
        fetchActiveCoupons();
      } else {
        alert("Failed to generate coupon: " + data.error);
      }
    } catch (error) {
      console.error("Error generating coupon:", error);
      alert("An error occurred.");
    }
  };


  const sendCouponMail = async () => {
    if (!generatedCoupon) {
      alert("Please generate a coupon first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/coupons/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: generatedCoupon.schoolCode,
          studentCouponCode: generatedCoupon.studentCode,
          schoolId: selectedSchool,
          seEmployeeId: user.userId,
          discountPercentage: 10,
          validFrom: new Date().toISOString().split('T')[0],
          validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // 1 year validity
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Emails sent successfully!");
      } else {
        alert("Failed to send emails: " + data.error);
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("An error occurred.");
    }
  };

  // Function to fetch active coupons for all schools assigned to this SE
  const fetchActiveCoupons = async () => {
    if (!user.userId) return;

    try {
      const promises = schools.map(school =>
        fetch(`http://localhost:5000/api/coupons/school/${school.id}`)
          .then(res => res.json())
      );

      const results = await Promise.all(promises);
      const allCoupons = results.flat();

      const detailedCoupons = allCoupons.map(coupon => {
        // Make sure we have all the fields we need
        return {
          ...coupon,
          valid_from: coupon.valid_from || coupon.created_at,
          current_uses: coupon.current_uses || 0,
          max_uses: coupon.max_uses || 500
        };
      });

      setSchoolsWithCoupons(detailedCoupons);
    } catch (error) {
      console.error("Error fetching active coupons:", error);
    }
  };

  // Function to verify a coupon
  const verifyCoupon = async (code, schoolId) => {
    try {
      const response = await fetch("http://localhost:5000/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        // Check if the coupon is for the correct school
        if (data.school_id.toString() === schoolId.toString()) {
          return { valid: true, message: "Coupon is valid for this school." };
        } else {
          return { valid: false, message: "This coupon was generated for a different school." };
        }
      } else {
        return { valid: false, message: data.error || "Invalid coupon" };
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      return { valid: false, message: "Error validating coupon" };
    }
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
            <h2><Ticket className="icon" /> Active Coupons</h2>
            {schoolsWithCoupons.length > 0 ? (
              <div className="coupon-list">
                {schoolsWithCoupons.map((coupon, index) => {
                  const school = schools.find(s => s.id === coupon.school_id);
                  const schoolName = school ? school.school_name : "Unknown School";

                  // Determine coupon styling and details based on type
                  const isStudent = coupon.coupon_type === 'student';
                  const couponClass = isStudent ? "coupon-item coupon-green" : "coupon-item coupon-blue";
                  const discount = isStudent ? "15% off" : "10% off";
                  const label = isStudent ? "Student Coupon" : "School Coupon";

                  return (
                    <div key={index} className={couponClass}>
                      <span className="coupon-label">{label}</span>
                      <h3>{coupon.code}</h3>
                      <p className="discount">{discount}</p>
                      <p className="school">School: {schoolName}</p>
                      <p className="expiry">Expires: {coupon.valid_until ? new Date(coupon.valid_until).toLocaleDateString() : "Never"}</p>
                      <p className="uses">Uses: {coupon.current_uses || 0} / {coupon.max_uses || "Unlimited"}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No active coupons found. Generate a coupon from the "Generate Coupons" tab.</p>
            )}
          </div>
        );

      // Added new "Generate Coupon" case
      case 'Genrate coupons':
        const renderGenerateCouponsTab = () => {
          return (
            <div className="content-area">
              <h2><Ticket className="icon" /> Generate Coupons</h2>
              <div className="generate-coupon">
                <div className="user-id-box">
                  <label htmlFor="user-id">SE ID:</label>
                  <input type="text" id="user-id" value={user.userId} disabled />
                </div>

                <div className="school-select-box">
                  <label htmlFor="school">Select School:</label>
                  <select id="school" value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)}>
                    <option value="">Select a School</option>
                    {schools.map((school, index) => {
                      const hasCoupon = schoolHasCoupon(school.id);
                      return (
                        <option key={index} value={school.id} disabled={hasCoupon}>
                          {school.school_name} {hasCoupon ? "(Coupon Generated)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="button-group">
                  <button className="btn-primary" onClick={generateCoupon} disabled={!selectedSchool || schoolHasCoupon(selectedSchool)}>
                    Generate Coupons
                  </button>

                  <button className="btn-secondary" onClick={sendCouponMail} disabled={!generatedCoupon}>
                    Send Mail
                  </button>
                </div>

                {generatedCoupon && (
                  <div className="coupon-details">
                    <h3>School Coupon: {generatedCoupon.schoolCode}</h3>
                    <p>School Discount: {generatedCoupon.schoolDiscount}</p>
                    <h3>Student Coupon: {generatedCoupon.studentCode}</h3>
                    <p>Student Discount: {generatedCoupon.studentDiscount}</p>
                    <p>School: {generatedCoupon.school_name}</p>
                    <p>Students: {generatedCoupon.studentCount}</p>
                  </div>
                )}
              </div>
            </div>
          );
        };

      case 'Genrate coupons':
        return renderGenerateCouponsTab();

      case 'verify-coupon':
        return (
          <div className="content-area">
            <h2><Ticket className="icon" /> Verify Coupon</h2>
            <div className="verify-coupon">
              <div className="coupon-code-box">
                <label htmlFor="coupon-code">Enter Coupon Code:</label>
                <input type="text" id="coupon-code" placeholder="e.g., COUPON-ABC123" />
              </div>

              <div className="school-select-box">
                <label htmlFor="verify-school">Select School:</label>
                <select id="verify-school">
                  <option value="">Select a School</option>
                  {schools.map((school, index) => (
                    <option key={index} value={school.id}>{school.school_name}</option>
                  ))}
                </select>
              </div>

              <button className="btn-primary" onClick={() => {
                const code = document.getElementById('coupon-code').value;
                const schoolId = document.getElementById('verify-school').value;
                if (!code || !schoolId) {
                  alert("Please enter a coupon code and select a school");
                  return;
                }

                verifyCoupon(code, schoolId).then(result => {
                  alert(result.message);
                });
              }}>
                Verify Coupon
              </button>
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
                <span className="table-column">School Coupon</span>
                <span className="table-column">Student Coupon</span>
                <span className="table-column">Generation Date</span>
                <span className="table-column">Uses</span>
              </div>
              {schools.map((school, index) => {
                const schoolCoupon = schoolsWithCoupons.find(
                  coupon => coupon.school_id === school.id && coupon.coupon_type === 'school'
                );
                const studentCoupon = schoolsWithCoupons.find(
                  coupon => coupon.school_id === school.id && coupon.coupon_type === 'student'
                );
                return (
                  <div key={index} className="table-row">
                    <span className="table-column">{school.school_name}</span>
                    <span className="table-column">
                      {schoolCoupon ?
                        <span style={{ color: 'green' }}>{schoolCoupon.code}</span> :
                        <span style={{ color: 'orange' }}>No Coupon</span>
                      }
                    </span>
                    <span className="table-column">
                      {studentCoupon ?
                        <span style={{ color: 'green' }}>{studentCoupon.code}</span> :
                        <span style={{ color: 'orange' }}>No Coupon</span>
                      }
                    </span>
                    <span className="table-column">
                      {schoolCoupon ?
                        new Date(schoolCoupon.valid_from || schoolCoupon.created_at).toLocaleDateString() :
                        '-'
                      }
                    </span>
                    <span className="table-column">
                      {schoolCoupon ?
                        `${schoolCoupon.current_uses || 0}/${schoolCoupon.max_uses || 1}` :
                        '-'
                      }
                    </span>
                  </div>
                );
              })}
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
                <p className="value10">Value</p>
                <p className="value1">₹15.00</p>
              </div>
              {/* <div className="points-value">
                        <h3>Value</h3>
                        <p className="value">₹15.00</p>
                      </div> */}
            </div>
            <div className="redeem-options">
              {/* <h3>Redeem for:</h3> */}
              <div className="redeem-grid">
                <button className="btn-primary"><ShoppingBag size={18} /> Redeem for Coupon</button>
                {/* <button className="btn-primary"><ShoppingBag size={18} /> ₹10 Off Coupon (1000 pts)</button> */}
                <button className="btn-primary"><ShoppingBag size={18} /> Redeem for Cash </button>
                {/* <button className="btn-primary"><ShoppingBag size={18} /> ₹20 Off Coupon (2000 pts)</button> */}
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
        const seId = localStorage.getItem("seEmployeeId"); // Get SE ID from local storage
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
            role: "se",
            userId: data.seDetails.employee_id,  // Automatically set SE ID
          });

          // Fetch schools first
          const schoolsResponse = await fetch(`http://localhost:5000/api/schools-by-se/${data.seDetails.employee_id}`);
          const schoolsData = await schoolsResponse.json();
          setSchools(schoolsData);

          // After we have schools data, fetch coupons for each school
          if (schoolsData && schoolsData.length > 0) {
            const couponPromises = schoolsData.map(school =>
              fetch(`http://localhost:5000/api/coupons/school/${school.id}`)
                .then(res => res.json())
            );

            const couponResults = await Promise.all(couponPromises);
            const allCoupons = couponResults.flat();
            setSchoolsWithCoupons(allCoupons);
          }
        } else {
          console.error("SE details not found.");
        }
      } catch (error) {
        console.error("Error fetching SE details:", error);
      }
    };

    fetchUserData();
  }, []); // Only run once on component mount
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
            <Ticket size={24} />
            <span>Generate Coupons</span>
          </button>

           <button
                      className={`nav-button ${activeTab === 'My order ' ? 'active' : ''}`}
                      onClick={() => setActiveTab('My order')}
                    >
                      <CgShoppingCart size={24} />
                      <span>My order</span>
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