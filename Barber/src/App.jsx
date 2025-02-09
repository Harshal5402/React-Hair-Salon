import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import Services from "./pages/Services/Services";
import List from "./pages/List/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home ";
import LoginPopup from "./components/LoginPopup/LoginPopup";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const url = "https://food-delivery-pgeu.onrender.com";

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
      <div>
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        {/* <hr /> */}
        <div className="app-content">
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/services" element={<Services url={url} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
