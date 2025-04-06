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


      {/* Mobile Bottom Navbar (sirf 750px se chhoti screen pe dikhega) */}
      <div className="bottom-navbar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-house"></i>
          <p>Home</p>
        </NavLink>

        <NavLink
          to="Add"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-upload"></i>
          <p>Add Items</p>
        </NavLink>

        <NavLink
          to="List"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-list-check"></i>
          <p>List Items</p>
        </NavLink>

        <NavLink
          to="Appointments"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-calendar-check"></i>
          <p>Appointments</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
