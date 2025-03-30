import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setmenu] = useState("");
  const { token, setToken } = useContext(StoreContext);
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown ke liye state

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowSidebar(false);
    navigate("/");
  };

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

            <Link
              to="Cart"
              onClick={() => setmenu("Cart")}
              className={menu === "Cart" ? "active" : ""}
            >
              Cart
            </Link>

            <Link
              to="fetchAppointment"
              onClick={() => setmenu("fetchAppointment")}
              className={menu === "fetchAppointment" ? "active" : ""}
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
      ) : (
        ""
      )}

      {!token ? (
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      ) : (
        <div
          className="navbar-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={assets.profile_icon} alt="" />
          {showDropdown ? (
            <ul className="nav-profile-dropdown">
              <li>
                <p
                  onClick={() => {
                    navigate("Account");
                  }}
                >
                  Account
                </p>
              </li>

              <hr />

              <li onClick={logout}>
                {/* <img src={assets.logout_icon} alt="" /> */}
                <p>Logout</p>
              </li>
            </ul>
          ) : null}
        </div>
      )}

      {/* {token ? (
        <img
          onClick={() => setShowSidebar(true)}
          className="navbar-mobile-menu"
          src={assets.menu_icon}
          alt="Menu"
        />
      ) : (
        ""
      )} */}

      {/*----- Mobile menu------------*/}

      {/* <div className={`sidebar-menu ${showSidebar ? "show" : ""}`}>
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
            to="Account"
            onClick={() => setShowSidebar(false)}
            className={menu === "Account" ? "active" : ""}
          >
            Account
          </NavLink>

          <NavLink
            to="/"
            onClick={() => setShowSidebar(false)}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </NavLink>

          <NavLink
            to="Explore"
            onClick={() => setShowSidebar(false)}
            className={menu === "Explore" ? "active" : ""}
          >
            Explore
          </NavLink>

          <NavLink
            to="Cart"
            onClick={() => setShowSidebar(false)}
            className={menu === "Cart" ? "active" : ""}
          >
            Cart
          </NavLink>

          <NavLink
            to="fetchAppointment"
            onClick={() => setShowSidebar(false)}
            className={menu === "fetchAppointment" ? "active" : ""}
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

          <p className="sidebar-logout" onClick={logout}>
            Logout
          </p>
        </div>
      </div> */}

      {/* Mobile Bottom Navbar (sirf 750px se chhoti screen pe dikhega) */}
      {token ? (
        <div className="bottom-navbar">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </NavLink>

          <NavLink to="Explore" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>Explore</p>
          </NavLink>

          <NavLink to="Cart" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-cart-shopping"></i>
            <p>Cart</p>
          </NavLink>

          <NavLink to="fetchAppointment" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-calendar-check"></i>
            <p>Appointments</p>
          </NavLink>

          <NavLink to="Account" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-user"></i>
            <p>Profile</p>
          </NavLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
