import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/banner.png";
import NameAvatar from "../context/AvatarContext";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem('initial') || '!'
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={logo}
          alt="CTM App Logo"
          className="nav-logo"
          onClick={() => handleNavigation("/home")}
        />
      </div>

      <ul className="nav-links">
        <li
          className={location.pathname === "/home" ? "active" : ""}
          onClick={() => handleNavigation("/home")}
        >
          Dashboard
        </li>
        <li
          className={location.pathname === "/kanban" ? "active" : ""}
          onClick={() => handleNavigation("/kanban")}
        >
          Kanban
        </li>
        <li
          className={location.pathname === "/project" ? "active" : ""}
          onClick={() => handleNavigation("/project")}
        >
          Project
        </li>
        <li
          className={location.pathname === "/task" ? "active" : ""}
          onClick={() => handleNavigation("/task")}
        >
          Task
        </li>
        <li
          className={location.pathname === "/activity" ? "active" : ""}
          onClick={() => handleNavigation("/activity")}
        >
          Activity
        </li>
        <li
          className={location.pathname === "/members" ? "active" : ""}
          onClick={() => handleNavigation("/members")}
        >
          Members
        </li>
        <li>
        <NameAvatar name={userName} />
        </li>
        <li onClick={() => handleLogout()}>
          <LogoutIcon style={{ marginRight: "-5px" }} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
