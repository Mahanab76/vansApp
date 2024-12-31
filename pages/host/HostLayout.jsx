import { Link, Outlet } from "react-router";

export default function HostLayout() {
  return (
    <>
      <nav className="host-nav">
        <Link to="/host/dashboard">dashboard</Link>
        <Link to="/host/Reviews">Reviews</Link>
        <Link to="/host/Income">Income</Link>
      </nav>
      <Outlet />
    </>
  );
}
