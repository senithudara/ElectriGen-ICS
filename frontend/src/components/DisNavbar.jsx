import React, { useState } from "react";
import NavbarStart from "./NavbarStart";

import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaShapes,
  FaIndustry,
  FaDollyFlatbed,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavbarDini1 = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/DisDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/OrderForm",
      name: "Order Placement",
      icon: <FaDollyFlatbed />,
    },
    {
      path: "/OrderHistory",
      name: "Order History",
      icon: <FaShapes />,
    },
    {
      path: "/DisAnalytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/DisMyProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },
  ];

  return (
    <div className="container">
      <NavbarStart/>
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
      </div>
      <main>{children}</main>{" "}
    </div>
  );
};

export default NavbarDini1;