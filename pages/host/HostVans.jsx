import React, { useEffect, useState } from "react";
import { Await, Link, useLoaderData } from "react-router";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";
import video1 from "../../assets/van.gif";

export async function loader({ request }) {
  await requireAuth(request);
  return { vans: getHostVans() };
}

export default function HostVans() {
  const vansPromis = useLoaderData();
  // const [vans, setVans] = useState([]);

  // useEffect(() => {
  //   fetch("/api/host/vans")
  //     .then((res) => res.json())
  //     .then((data) => setVans(data.vans));
  // }, []);

  function handleHostVans(vans) {
    const hostVansEls = vans.map((van) => (
      <Link to={`${van.id}`} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    );
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <React.Suspense fallback={<img className="gif" src={video1} />}>
        <Await resolve={vansPromis.vans}>{handleHostVans}</Await>
      </React.Suspense>
    </section>
  );
}
