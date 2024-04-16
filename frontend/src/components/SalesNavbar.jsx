import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaKeyboard,
  FaKey,
  FaHandHoldingHeart,
  FaReplyAll,
  FaFileContract
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/SalesDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/invoiceCreate",
      name: "Create Invoice",
      icon: <FaKeyboard />,
    },
    {
      path: "/SDView",
      name: "Modify Invoice",
      icon: <FaKey />,
    },
    {
        path: "/SDFeedback",
        name: "Sales Feadback",
        icon: <FaHandHoldingHeart />,
      },
    {
      path: "/InvoiceReport",
      name: "Report Handling",
      icon: <FaFileContract />,
    },
    {
      path: "/MyProfile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/Logout",
      name: "Logout",
      icon: <FaReplyAll />,
    },
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
      </div>
      <main>{children}</main>{" "}
    </div>
  );
};

export default Navbar;