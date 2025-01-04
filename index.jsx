import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
  Link,
} from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";

import "./server";
import HostLayout from "./components/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/host/HostVans";
import HostVansDetails, {
  loader as hostVansDetailsLoader,
} from "./pages/host/HostVansDetails";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanInfo from "./pages/host/HostVanInfo";
import HostVanPricing from "./pages/host/HostVanPricing";
import PageNotFound from "./components/PageNotFound";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/Login";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
       work the same as below --meaning at <Layout/> index will show <Home/> as child when route match "/" */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {/* <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} /> same as below but because we dont need to build a another layout component to be a parent so we only use vans path to simply have index of <Vans/> component to show in vans path and just because <Vandetails/> is child of vans path so we dont need /vans/:id because its relative to vans we just do ":id" and react router knows they are siblings*/}

        <Route path="login" element={<Login />} />
        <Route path="vans">
          <Route
            index
            element={<Vans />}
            errorElement={<ErrorPage />}
            loader={vansLoader}
          />
          <Route path=":id" element={<VanDetail />} loader={vanDetailLoader} />
          <Route />
        </Route>
        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
          <Route
            path="vans/:id"
            element={<HostVansDetails />}
            loader={hostVansDetailsLoader}
          >
            <Route index element={<HostVanInfo />} />
            <Route path="vanspricing" element={<HostVanPricing />} />
            <Route path="vansimage" element={<HostVanPhotos />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={Router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
