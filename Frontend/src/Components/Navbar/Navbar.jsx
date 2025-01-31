import React, { Profiler, useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {

  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const [menu, setmenu] = useState("");
  const { token, setToken } = useContext(StoreContext);

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }

  

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      {token ? (
        <div>
          <ul className="navbar-menu">
            <Link
              to="/"
              onClick={() => setmenu("Home")}
              className={menu === "Home" ? "active" : ""}
            >
              Home
            </Link>

            <Link
              to="Explore"
              onClick={() => setmenu("Explore")}
              className={menu === "Explore" ? "active" : ""}
            >
              Explore
            </Link>

            <a
              href="#footer"
              onClick={() => setmenu("Contact-Us")}
              className={menu === "Contact-Us" ? "active" : ""}
            >
              Contact Us
            </a>
          </ul>
        </div>
      ) : ""}

      {!token ? (
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      ) : (
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li><p onClick={() => {navigate('profile')}}>Profile</p></li>
            <hr />
            <li><p onClick={() => {navigate('cart')}}>Cart</p></li>
            <hr />
            <li><p onClick={() => {navigate('fetchAppointment')}}>Appointments</p></li>
            <hr />
            <li onClick={logout}>{/*<img src={assets.logout_icon} alt="" />*/}<p>Logout</p></li>
          </ul>
        </div>
      )}

      {token ? <img onClick={() => setShowSidebar(true)} className="navbar-mobile-menu" src={assets.menu_icon} alt="Menu" /> : ""}
      

      {/*----- Mobile menu------------*/}
      
      <div className={`sidebar-menu ${showSidebar ? "show" : ""}`}>
        <div className="sidebar-menu-logo-cross_icon">
          <img src={assets.logo} alt="Logo" />
          <img
            onClick={() => setShowSidebar(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <div className="sidebar-menu-content">
          <NavLink to="/" onClick={() => setShowSidebar(false)}>Home</NavLink>
          <NavLink to="Explore" onClick={() => setShowSidebar(false)}>Explore</NavLink>
          <NavLink to="#footer" onClick={() => setShowSidebar(false)}>Contact Us</NavLink>
        </div>
      </div>

    </div>
  );
};

export default Navbar;