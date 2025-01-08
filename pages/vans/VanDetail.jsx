import React from "react";
import {
  useParams,
  Link,
  useLocation,
  useLoaderData,
  Await,
} from "react-router";
import { getVan } from "../../api";
import video1 from "../../assets/van.gif";

export async function loader({ params }) {
  return { van: getVan(params.id) };
}

export default function VanDetail() {
  const vanPromise = useLoaderData();

  const location = useLocation();

  // const params = useParams();
  // const [van, setVan] = React.useState(null);

  // React.useEffect(() => {
  //   fetch(`/api/vans/${params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setVan(data.vans));
  // }, [params.id]);
  function handleVanDetails(van) {
    const history = location.state?.search || "";
    const backTo = location.state?.type || "All";
    return (
      <div className="van-detail-container">
        <Link to={`..${history}`} relative="path" className="back-button">
          &larr; <span>Back to {backTo} vans</span>
        </Link>
        {van.map((van) => {
          return (
            <div className="van-detail" key={van.id}>
              <img src={van.imageUrl} />
              <i className={`van-type ${van.type} selected`}>{van.type}</i>
              <h2>{van.name}</h2>
              <p className="van-price">
                <span>${van.price}</span>/day
              </p>
              <p>{van.description}</p>
              <button className="link-button">Rent this van</button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <React.Suspense fallback={<img className="gif" src={video1} />}>
      <Await resolve={vanPromise.van}>{handleVanDetails}</Await>
    </React.Suspense>
  );
}
