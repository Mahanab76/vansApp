import React from "react";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="about-page-container">
      <img
        src="https://ocoguozldfoijgxkgmha.supabase.co/storage/v1/object/sign/vansApp/otherImages/Walden%20Home.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2YW5zQXBwL290aGVySW1hZ2VzL1dhbGRlbiBIb21lLmpwZyIsImlhdCI6MTczNjM1NDYxNiwiZXhwIjoxNzY3ODkwNjE2fQ.uPFOVElIMN_p25yrikQJmwAm3zU8ozZh2HwRNplobNY&t=2025-01-08T16%3A43%3A36.147Z.jpg"
        className="about-hero-image"
      />
      <div className="about-page-content">
        <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
        <p>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch. (Hitch costs extra 😉)
        </p>
        <p>
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </p>
      </div>
      <div className="about-page-cta">
        <h2>
          Your destination is waiting.
          <br />
          Your van is ready.
        </h2>
        <Link className="link-button" to="/vans">
          Explore our vans
        </Link>
      </div>
    </div>
  );
}
