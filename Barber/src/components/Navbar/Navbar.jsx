import React, { Profiler, useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown ke liye state
  const { token, setToken } = useContext(StoreContext);
  const [menu, setmenu] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setToken("");
  //   navigate("/");
  // };

  // Dropdown ko close karne ke liye click event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-profile")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <div className="navbar-menu-container">
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setmenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>

          <Link
            to="Add"
            onClick={() => setmenu("Add")}
            className={menu === "Add" ? "active" : ""}
          >
            Add Items
          </Link>

          <Link
            to="List"
            onClick={() => setmenu("List")}
            className={menu === "List" ? "active" : ""}
          >
            List Items
          </Link>

          <Link
            to="Appointments"
            onClick={() => setmenu("Appointments")}
            className={menu === "Appointments" ? "active" : ""}
          >
            Appointments
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

      <img
        onClick={() => setShowSidebar(true)}
        className="navbar-mobile-menu"
        src={assets.menu_icon}
        alt="Menu"
      />

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
          <NavLink
            to="/"
            onClick={() => setShowSidebar(false)}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </NavLink>

          <NavLink
            to="Add"
            onClick={() => setShowSidebar(false)}
            className={menu === "Add" ? "active" : ""}
          >
            Add Items
          </NavLink>

          <NavLink
            to="List"
            onClick={() => setShowSidebar(false)}
            className={menu === "List" ? "active" : ""}
          >
            List Items
          </NavLink>

          <NavLink
            to="Appointments"
            onClick={() => setShowSidebar(false)}
            className={menu === "Appointments" ? "active" : ""}
          >
            Appointments
          </NavLink>

          <NavLink
            to="#footer"
            onClick={() => setShowSidebar(false)}
            className={menu === "Contact-Us" ? "active" : ""}
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
