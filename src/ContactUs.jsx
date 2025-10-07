import React, { useState, useEffect } from "react";
import "./stylesheets/contact.css";

function ContactUs() {
  const [bubbles, setBubbles] = useState([]);
  const [particles, setParticles] = useState([]);

  // Initial bubbles
  useEffect(() => {
    const initialBubbles = Array.from({ length: 6 }).map((_, idx) => ({
      id: idx,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
      size: Math.random() * 60 + 40,
    }));
    setBubbles(initialBubbles);
  }, []);

  const popBubble = (bubble) => {
    const { id, color, top, left } = bubble;

    const newParticles = Array.from({ length: 12 }).map((_, index) => ({
      id: `${id}-${index}`,
      color,
      top: parseFloat(top),
      left: parseFloat(left),
      dx: Math.random() * 120 - 60, // random X
      dy: Math.random() * 120 - 60, // random Y
      scale: Math.random() * 0.5 + 0.5,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setBubbles((prev) => prev.filter((b) => b.id !== id));

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !p.id.startsWith(`${id}-`)));
    }, 800);
  };

  return (
    <>
    <section className="contact-section py-5 animated-bg position-relative overflow-hidden ">
      <div className="container">
        <h2 className="text-center mb-4 section-title">📞 Contact Us</h2>
        <p className="text-center mb-5 text-muted">
          We’d love to hear from you! Fill out the form below or reach us at our office.
        </p>
        {/* Contact Form & Info */}
        <div className="row g-4">
          <div className="col-md-7">
            <div className="contact-card card shadow-sm p-4 h-100">
              <h5 className="mb-3">Send us a Message</h5>
              <form>
                <input className="form-control mb-3" placeholder="Name" required />
                <input type="email" className="form-control mb-3" placeholder="Email" required />
                <textarea className="form-control mb-3" rows="4" placeholder="Message" required></textarea>
                <button className="btn submit-btn w-100">Submit</button>
              </form>
            </div>
          </div>
          <div className="col-md-5">
            <div className="contact-card card shadow-sm p-4 h-100">
              <h5 className="mb-3">Our Info</h5>
              <p>📍 Address: 123 Fresh Market Street, Hyderabad</p>
              <p>📞 Phone: +91 79811 02318</p>
              <p>✉️ Email: support@foodify.com</p>
              <hr />
              <h6 className="mb-2">Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="#" className="social-icon text-primary fs-4"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-icon text-danger fs-4"><i className="bi bi-instagram"></i></a>
                <a href="#" className="social-icon text-info fs-4"><i className="bi bi-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bubbles */}
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="float-bubble"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
          }}
          onClick={() => popBubble(b)}
        />
      ))}

      {/* Sprinkles / Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            backgroundColor: p.color,
            transform: `translate(${p.dx}px, ${p.dy}px) scale(${p.scale})`,
          }}
        />
      ))}
    </section>
    </>
  );
}

export default ContactUs;
