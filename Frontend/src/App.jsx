import React, { useState } from "react";
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
    </>
  );
};

export default App;
