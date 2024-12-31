import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <h1>This is dashborad page</h1>
      <Outlet />
    </>
  );
}
