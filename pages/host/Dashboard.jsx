import React from "react";
import { Link, Await, useLoaderData, NavLink } from "react-router";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";
import video1 from "../../assets/van.gif";
import star from "../../assets/images/star(4).png";

export async function loader({ request }) {
  await requireAuth(request);
  return { vans: getHostVans() };
}

export default function Dashboard() {
  const loaderData = useLoaderData();

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <NavLink to={`vans/${van.id}`} key={van.id}>
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </NavLink>
    ));

    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    );
  }

  return (
    <>
      <NavLink to="income">
        <section className="host-dashboard-earnings">
          <div className="info">
            <h1>Welcome!</h1>
            <p>
              Income last <span>30 days</span>
            </p>
            <h2>$2,260</h2>
          </div>
          Details
        </section>
      </NavLink>
      <NavLink to="reviews">
        <section className="host-dashboard-reviews">
          <h2>Review score</h2>
          <img className="star" src={star} />
          <p>
            <span>5.0</span>/5
          </p>
          Details
        </section>
      </NavLink>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans">View all</Link>
        </div>
        <React.Suspense fallback={<img className="gif" src={video1} />}>
          <Await resolve={loaderData.vans}>{renderVanElements}</Await>
        </React.Suspense>
      </section>
    </>
  );
}
