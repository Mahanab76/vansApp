import React, { useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import { getVans } from "../../api";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import video1 from "../../assets/van.gif";

export function loader() {
  return getVans();
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const [error, setError] = React.useState(null);
  //useEffect worked after the componenet fully loaded as we know(took about 1 or 2 sec) but now with loader we dont need vans state and loading cause data came right after clicking van page(Faster) this more syncronous behavior
  // const [loading, setLoading] = useState(false);
  // const [vans, setVans] = React.useState([]);

  const vans = useLoaderData();
  // React.useEffect(() => {
  //   async function loadVans() {
  //     setLoading(true);
  //     const data = await getVans();
  //     setVans(data);
  //     setLoading(false);
  //   }

  //   loadVans();
  // }, []);
  const filterMethod = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;
  const vanElements = filterMethod.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={`${van.id}`}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));
  // if (loading) {
  //   return <img className="gif" src={video1} />;
  // }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      {/*first way of filtering  <div className="van-list-filter-buttons">
                <Link 
                    to="?type=simple"
                    className="van-type simple"
                >Simple</Link>
                <Link 
                    to="?type=luxury"
                    className="van-type luxury"
                >Luxury</Link>
                <Link 
                    to="?type=rugged"
                    className="van-type rugged"
                >Rugged</Link>
                <Link 
                    to="."
                    className="van-type clear-filters"
                >Clear filter</Link>
            
            </div> */}
      {/* secend way of filtering using buttons */}
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className={
            typeFilter === "simple"
              ? " van-type simple selected"
              : "van-type simple"
          }
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className={
            typeFilter === "luxury"
              ? "van-type luxury selected"
              : "van-type luxury"
          }
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          className={
            typeFilter === "rugged"
              ? "van-type rugged selected"
              : "van-type rugged"
          }
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => setSearchParams({})}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
