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

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
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
      {/* <img className='profile' src={assets.profile_image} alt="" /> */}

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
              to="/add"
              onClick={() => setmenu("Add")}
              className={menu === "Add" ? "active" : ""}
            >
              Add Items
            </Link>

            <Link
              to="/list"
              onClick={() => setmenu("List")}
              className={menu === "List" ? "active" : ""}
            >
              List Items
            </Link>

            <Link
              to="/services"
              onClick={() => setmenu("Services")}
              className={menu === "Services" ? "active" : ""}
            >
              Services
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

      {token ? (
        <img
          onClick={() => setShowSidebar(true)}
          className="navbar-mobile-menu"
          src={assets.menu_icon}
          alt="Menu"
        />
      ) : (
        ""
      )}

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
            to="/add"
              onClick={() => setmenu("Add")}
              className={menu === "Add" ? "active" : ""}
          >
            Add Items
          </NavLink>

          <NavLink
            to="/list"
            onClick={() => setmenu("List")}
            className={menu === "List" ? "active" : ""}
          >
            List Items
          </NavLink>

          <NavLink
            to="/services"
            onClick={() => setmenu("Services")}
            className={menu === "Services" ? "active" : ""}
          >
            Services
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
      </div>
    </div>
  );
};

export default Navbar;
