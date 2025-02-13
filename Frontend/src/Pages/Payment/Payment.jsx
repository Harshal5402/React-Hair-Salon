// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Payment.css";

// const Payment = () => {

//   const [redirectMessage, setRedirectMessage] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "/payment-success") {
//       toast.success("Payment Successful! 🎉");
//       setRedirectMessage("Redirecting to Appointments...");
//       setTimeout(() => {
//         navigate("/fetchAppointment");
//       }, 3000);
//     } else if (location.pathname === "/payment-cancelled") {
//       toast.error("Payment Cancelled! ❌");
//       setRedirectMessage("Redirecting to Cart...");
//       setTimeout(() => {
//         navigate("/cart");
//       }, 3000);
//     }
//   }, [location, navigate]);

//   return (
//     <div className="payment-success-container">
//       <h2>{location.pathname === "/payment-success" ? "Payment Successful!" : "Payment Cancelled!"}</h2>
//       <p>{redirectMessage}</p>
//     </div>
//   );
// };

// export default Payment;






import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Payment.css";
import { StoreContext } from "../../Context/StoreContext";


const Payment = () => {
    const { url } = useContext(StoreContext);
  const [redirectMessage, setRedirectMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

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
    try {
      const response = await axios.get(
        `${url}/api/checkout/payment-success?session_id=${sessionId}`,
        { withCredentials: true } // Ensure cookies are sent if needed
      );

      if (response.data.success) {
        toast.success("Payment Verified! 🎉");
        setRedirectMessage("Redirecting to Appointments...");
        setTimeout(() => {
          navigate("/fetchAppointment");
        }, 3000);
      } else {
        toast.error("Payment verification failed! ❌");
        setRedirectMessage("Redirecting to Cart...");
        setTimeout(() => {
          navigate("/cart");
        }, 3000);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Something went wrong! ❌");
      setRedirectMessage("Redirecting to Cart...");
      setTimeout(() => {
        navigate("/cart");
      }, 3000);
    }
  };

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
