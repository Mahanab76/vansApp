import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  NavLink,
  Outlet,
  useLoaderData,
  Await,
} from "react-router";
import { getVan } from "../../api"; //getHostVans for mirage server
import { requireAuth } from "../../utils";
import video1 from "../../assets/van.gif";

export async function loader({ params, request }) {
  await requireAuth(request);
  return { van: getVan(params.id) };
}

export default function HostVansDetails() {
  const vanPromise = useLoaderData();
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
      <React.Suspense fallback={<img className="gif" src={video1} />}>
        <Await resolve={vanPromise.van}>
          {(van) => {
            return (
              <>
                <Link to=".." relative="path" className="back-button">
                  &larr; <span>Back to all vans</span>
                </Link>
                {van.map((van) => {
                  return (
                    <div
                      className="host-van-detail-layout-container"
                      key={van.id}
                    >
                      <div className="host-van-detail">
                        <img src={van.imageUrl} />
                        <div className="host-van-detail-info-text">
                          <i className={`van-type ${van.type} selected`}>
                            {van.type}
                          </i>
                          <h3>{van.name}</h3>
                          <h4>${van.price}/day</h4>
                        </div>
                      </div>
                      <nav className="host-van-detail-nav">
                        <NavLink
                          end
                          to="."
                          style={({ isActive }) =>
                            isActive ? activeStyles : null
                          }
                        >
                          Detail
                        </NavLink>
                        <NavLink
                          to="vanspricing"
                          style={({ isActive }) =>
                            isActive ? activeStyles : null
                          }
                        >
                          Pricing
                        </NavLink>
                        <NavLink
                          to="vansimage"
                          style={({ isActive }) =>
                            isActive ? activeStyles : null
                          }
                        >
                          Photo
                        </NavLink>
                      </nav>
                      <Outlet context={{ van }} />
                    </div>
                  );
                })}
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </section>
  );
}
