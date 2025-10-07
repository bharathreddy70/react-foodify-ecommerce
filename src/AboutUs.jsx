import React, { useEffect } from "react";
import "./stylesheets/aboutUs.css";
import { FaUsers, FaBoxOpen, FaSmile } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    { icon: <FaUsers />, value: 1200, label: "Happy Customers" },
    { icon: <FaBoxOpen />, value: 5000, label: "Products Sold" },
    { icon: <FaSmile />, value: 99, label: "Satisfaction %" },
  ];

  const team = [
    { name: "Alice", role: "Founder & CEO", img: "/images/team1.jpg" },
    { name: "Bob", role: "Head Chef", img: "/images/team2.jpg" },
    { name: "Charlie", role: "Marketing Lead", img: "/images/team3.jpg" },
  ];

  return (
    <div className="aboutus-page">
      {/* Hero Section */}
      <section className="hero parallax">
        <div className="overlay">
          <h1 data-aos="fade-up">We Make Delicious Memories 🍫🍗🥤</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Passionate about delivering joy, one product at a time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="card" data-aos="fade-right">
          <h2>Our Mission</h2>
          <p>
            To bring the finest chocolates, snacks, and drinks to every doorstep
            with love, care, and quality.
          </p>
        </div>
        <div className="card" data-aos="fade-left">
          <h2>Our Vision</h2>
          <p>
            Becoming the most loved food brand by combining taste, innovation,
            and happiness in every bite.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats parallax-light">
        {stats.map((item, index) => (
          <div key={index} className="stat-card" data-aos="zoom-in" data-aos-delay={index * 200}>
            <div className="icon">{item.icon}</div>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="team">
        <h2 data-aos="fade-up">Meet Our Team</h2>
        <div className="team-cards">
          {team.map((member, index) => (
            <div key={index} className="team-card" data-aos="flip-left" data-aos-delay={index * 200}>
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta parallax">
        <h2 data-aos="fade-up">Ready to Explore?</h2>
        <p data-aos="fade-up" data-aos-delay="200">
          Check out our wide range of products and make your day delicious!
        </p>
        <button data-aos="zoom-in" data-aos-delay="400">Shop Now</button>
      </section>
    </div>
  );
}

export default AboutUs;
