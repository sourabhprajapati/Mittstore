import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-success-container">
      <div className="order-success-box">
        <h2>Order Placed Successfully!</h2>
        <p>You will be redirected to the home page shortly.</p>
      </div>
    </div>
  );
};

export default OrderSuccess;