import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaShapes,
  FaSignOutAlt,
  FaDollyFlatbed,
  FaSignLanguage,
  FaBookOpen,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DonationNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    navigate("/new-login");
  };
  const menuItem = [
    {
      path: "/Donation_Dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/New_Projects",
      name: "New Projects",
      icon: <FaDollyFlatbed />,
    },

    {
      path: "/Doner_Feedback",
      name: "Doner Feedback",
      icon: <FaSignLanguage />,
    },

    //{
    //   path: "/products",
    //    name: "Products",
    //    icon: <FaDollyFlatbed />,
    //},

    //{
    //  path: "/Materials",
    //  name: "Materials",
    //  icon: <FaShapes />,
    //},

    //{
    //  path: "/Production",
    //  name: "Production",
    //  icon: <FaIndustry />,
    //},

    {
      path: "/DReportCreate",
      name: "Donation Report",
      icon: <FaRegChartBar />,
    },

    {
      path: "/Doner_Analytics",
      name: "Analytics ",
      icon: <FaRegChartBar />,
    },

    {
      path: "/DProjectDetails",
      name: "View Past Projects",
      icon: <FaBookOpen />,
    },

    {
      path: "/dFeedbackFetch",
      name: "View Feedbacks",
      icon: <FaHandHoldingHeart />,
    },
    {
      path: "/donationProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },

    /*{
      path: "/",
      name: "Logout",
      icon: <FaSignOutAlt />,
    },*/
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "350px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            src="logo1.png"
            style={{ display: isOpen ? "block" : "none" }}
            className="logo"
            width="220"
            height="42"
            alt="Company Logo"
          ></img>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        {/* Add logout menu item if user is authenticated */}
        {isAuthenticated && (
          <div
            className="link"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              Logout
            </div>
          </div>
        )}
      </div>
      <main>{children}</main>{" "}
    </div>
  );
};

export default DonationNavbar;
