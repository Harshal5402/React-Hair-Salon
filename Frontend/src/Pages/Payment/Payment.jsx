import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./Payment.css"; // Import CSS file

const Payment = () => {

  const [redirectMessage, setRedirectMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/payment-success") {
      toast.success("Payment Successful! 🎉");
      setRedirectMessage("Redirecting to Appointments...");
      setTimeout(() => {
        navigate("/fetchAppointment");
      }, 3000);
    } else if (location.pathname === "/payment-cancelled") {
      toast.error("Payment Cancelled! ❌");
      setRedirectMessage("Redirecting to Cart...");
      setTimeout(() => {
        navigate("/cart");
      }, 3000);
    }
  }, [location, navigate]);

  return (
    <div className="payment-success-container">
      <h2>{location.pathname === "/payment-success" ? "Payment Successful!" : "Payment Cancelled!"}</h2>
      <p>{redirectMessage}</p>
    </div>
  );
};

export default Payment;
