import { useEffect, useState } from "react";
import { Link, useParams, NavLink, Outlet, useLoaderData } from "react-router";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params }) {
  await requireAuth();
  return getHostVans(params.id);
}

export default function HostVansDetails() {
  const van = useLoaderData();
  // const params = useParams();
  // const [van, setVans] = useState();
  // useEffect(() => {
  //   fetch(`/api/host/vans/${params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setVans(data.vans));
  // }, []);
  // console.log(params);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={van.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${van.type}`}>{van.type}</i>
            <h3>{van.name}</h3>
            <h4>${van.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            end
            to="."
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Detail
          </NavLink>
          <NavLink
            to="vanspricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="vansimage"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photo
          </NavLink>
        </nav>
        <Outlet context={{ van }} />
      </div>
    </section>
  );
}
