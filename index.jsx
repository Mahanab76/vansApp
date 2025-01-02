import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/vans/Vans";
import VanDetail from "./pages/vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";

import "./server";
import HostLayout from "./components/HostLayout";
import HostVans from "./pages/host/HostVans";
import HostVansDetails from "./pages/host/HostVansDetails";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanInfo from "./pages/host/HostVanInfo";
import HostVanPricing from "./pages/host/HostVanPricing";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
       work the same as below --meaning at <Layout/> index will show <Home/> as child when route match "/" */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} /> same as below but because we dont need to build a another layout component to be a parent so we only use vans path to simply have index of <Vans/> component to show in vans path and just because <Vandetails/> is child of vans path so we dont need /vans/:id because its relative to vans we just do ":id" and react router knows they are siblings*/}

          <Route path="vans">
            <Route index element={<Vans />} />
            <Route path=":id" element={<VanDetail />} />
            <Route />
          </Route>
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVansDetails />}>
              <Route index element={<HostVanInfo />} />
              <Route path="vanspricing" element={<HostVanPricing />} />
              <Route path="vansimage" element={<HostVanPhotos />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
