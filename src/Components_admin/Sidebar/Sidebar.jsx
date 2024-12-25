import React, { useState } from "react";
import "./Sidebar.css";
import Button from "@mui/material/Button";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets_admin/digital-marketing (1).png";
import dashboard from "../../assets_admin/dashboard.svg";

import merchent from "../../assets_admin/merchent.svg";
import delivery from "../../assets_admin/delivery.svg";



const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation(); // Hook to get current location (URL)

  const toggleSubmenu = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Function to determine if a submenu item should be active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div
        className={`col-xxl-2 col-xl-2 p-3 overflow-y-scroll position-fixed h-100 ${
          isSidebarVisible ? "sidebar visible" : "sidebar"
        }`}
      >
       <div className="col-xs-3 mt-5 mb-3 ms-3 me-3">
          <Link to="/dashboard" className="d-flex items-center justify-content-center align-items-center text-white">
          {/* <div className="d-flex items-center justify-content-center blur"></div> */}
            <img src={logo} width={'150px'} className="" alt="logo" />
          </Link>
        </div>
        <ul>
          <li className="my-2">
            <Link to="/dashboard" className="link">
              <Button
                className={`w-100 ${isActive("/dashboard") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={dashboard} alt="dashboard" />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>

         
          <li className="my-2">
            <Link to="/merchant" className="link">
              <Button
                className={`w-100 ${isActive("/merchant") ? "active" : ""}`}
                onClick={() => setActiveTab(null)}
              >
                <span className="icon">
                  <img src={merchent} alt="merchant" />
                </span>
                Merchants
              </Button>
            </Link>
          </li>

          {/* <li className="my-2">
            <Button
              className={`w-100 ${activeTab === 6 ? "active" : ""}`}
              onClick={() => toggleSubmenu(6)}
            >
              <span className="icon">
                <img src={delivery} alt="delivery" />
              </span>
              Delivery Man
              <span className={`arrow ${activeTab === 6 ? "rotate" : ""}`}>
                <FaAngleRight />
              </span>
            </Button>
            {activeTab === 6 && (
              <div className="submenuWrapper">
                <ul className="submenu">
                  <li className={isActive("/delivery-man-admin") ? "active" : ""}>
                    <Link to="/delivery-man-admin">Admin Delivery Man</Link>
                  </li>
                  <li className={isActive("/delivery-man-merchant") ? "active" : ""}>
                    <Link to="/delivery-man-merchant">Merchant Delivery Man</Link>
                  </li>
                </ul>
              </div>
            )}
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
