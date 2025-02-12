import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home ";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Account from "./Pages/Account/Account";
import Appointment from "./pages/Appointment/Appointment";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
      <div>
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Add" element={<Add />} />
            <Route path="List" element={<List />} />
            <Route path="Appointments" element={<Appointment />} />
            {/* <Route path="Account" element={<Account />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
