import { Link, NavLink, Outlet } from "react-router";

export default function HostLayout() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <>
      <nav className="host-nav">
        <NavLink
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
          to="/host"
        >
          dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : null)}
          to="Reviews"
        >
          Reviews
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : null)}
          to="vans"
        >
          Vans
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyles : null)}
          to="Income"
        >
          Income
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
