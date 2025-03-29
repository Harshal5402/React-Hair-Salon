import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore/Explore";
import Cart from "./Pages/Cart/Cart";
import Appointments from "./Pages/Appointments/Appointments";
import FetchAppointment from "./Pages/FetchAppointment/FetchAppointment";
import Payment from "./Pages/Payment/Payment";
import Account from "./Pages/Account/Account";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("👍 Install Prompt Triggered");
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    });
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("✅ User Installed the App");
        } else {
          console.log("❌ User Dismissed the Install Prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
      <ToastContainer />
      <div>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="cart" element={<Cart />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="fetchAppointment" element={<FetchAppointment />} />
          <Route path="/payment-success" element={<Payment />} />
          <Route path="/payment-cancelled" element={<Payment />} />
          <Route path="Account" element={<Account />} />
        </Routes>
      </div>

       {/* Install Button for PWA */}
       {showInstallButton && (
        <button
          onClick={handleInstallClick}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            background: "#009688",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Install App
        </button>
      )}

    </>
  );
};

export default App;
