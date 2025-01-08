import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import avatar from "../assets/images/avatar-icon.png";
export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyles : null)}
          to="host"
          exact
        >
          Host
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? activeStyles : null)}
          to="about"
          exact
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyles : null)}
          to="vans"
          exact
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <img src={avatar} className="login-icon" />
        </Link>
      </nav>
    </header>
  );
}
