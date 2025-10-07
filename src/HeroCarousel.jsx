import "../src/stylesheets/HeroCarousel.css";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const banners = [
  {
    img: "/Images/banner-veg.png",
    title: "Fresh Veg & Non-Veg Dishes",
    subtitle: "Healthy, Delicious & Delivered to Your Door",
    link: "/veg",
    btnText: "Shop Now"
  },
  {
    img: "/Images/banner-meals.png",
    title: "Hot & Ready-to-Eat Meals",
    subtitle: "Made Fresh Daily, Just for You",
    link: "/nonveg",
    btnText: "Order Now"
  },
  {
    img: "/Images/banner-chocolates.png",
    title: "Sweet Treats & Chocolates",
    subtitle: "Indulge Your Sweet Tooth with Foodify",
    link: "/chocolates",
    btnText: "Shop Chocolates"
  },
  {
    img: "/Images/banner3.png",
    title: "Refreshing Drinks",
    subtitle: "Cool, Fresh & Delicious Beverages",
    link: "/drinks",
    btnText: "Shop Drinks"
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const length = banners.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <section className="hero-carousel">
      <button className="carousel-arrow prev" onClick={prevSlide}>‹</button>
      <button className="carousel-arrow next" onClick={nextSlide}>›</button>

      {banners.map((banner, idx) => (
        <div
          key={idx}
          className={`hero-slide ${idx === current ? "active" : "inactive"}`}
        >
          <img className="hero-img" src={banner.img} alt={banner.title} />
          <div className="hero-overlay">
            <h1 className="hero-title">{banner.title}</h1>
            <p className="hero-subtitle">{banner.subtitle}</p>
            <Link to={banner.link} className="btn btn-primary btn-lg">{banner.btnText}</Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroCarousel;
