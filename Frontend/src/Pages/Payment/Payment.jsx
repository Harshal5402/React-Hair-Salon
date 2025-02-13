import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Payment.css";
import { StoreContext } from "../../Context/StoreContext";

const Payment = () => {
  const {url, token} = useContext(StoreContext);
  const [redirectMessage, setRedirectMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("useEffect called");
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    console.log("Session ID:", sessionId); // Check if session_id is coming correctly

    if (location.pathname === "/payment-success" && sessionId) {
      verifyPayment(sessionId);
    } else if (location.pathname === "/payment-cancelled") {
      toast.error("Payment Cancelled! ❌");
      setRedirectMessage("Redirecting to Cart...");
      setTimeout(() => {
        navigate("/cart");
      }, 3000);
    }
  }, [location, navigate]);

  const verifyPayment = async (sessionId) => {
    console.log("Token Being Sent:", token); // Debug token before sending

    try {
      const response = await axios.get(
        `${url}/api/checkout/payment-success?session_id=${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Payment Verified! 🎉");
        setRedirectMessage("Redirecting to Appointments...");
        setTimeout(() => {
          navigate("/fetchAppointment");
        }, 3000);
      } else {
        console.error(
          "Payment verification error:",
          error.response || error.message
        );
        toast.error("Payment verification failed! ❌");
        setRedirectMessage("Redirecting to Cart...");
        setTimeout(() => {
          navigate("/cart");
        }, 3000);
      }
    } catch (error) {
      console.error("Payment verification error:", error.response || error.message);
      toast.error(error.response?.data?.message || error.message || "Something went wrong! ❌");
      // toast.error(error.message);
      setRedirectMessage("Redirecting to Cart...");
      setTimeout(() => {
        navigate("/cart");
      }, 3000);
    }
  };

  useEffect(() => {
    console.log("Token:", token);
  }, [token]);

  return (
    <div className="payment-success-container">
      <h2>
        {location.pathname === "/payment-success"
          ? "Verifying Payment..."
          : "Payment Cancelled!"}
      </h2>
      <p>{redirectMessage}</p>
    </div>
  );
};

export default Payment;
