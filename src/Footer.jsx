import React from 'react'
import { Link } from 'react-router-dom';
import "./stylesheets/global.css";


function Footer() {
  return (
    <>

      <footer className="container-fluid bg-dark text-light pt-5 pb-3 mt-5">
  <div className="container-fluid">
    <div className="row text-center text-md-start">
      {/* Company Info */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Foodify</h5>
        <p>
          Fresh vegetables, quality meat, chocolates, and drinks delivered
          at your doorstep with care & speed.
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Quick Links</h5>
        <ul className="list-unstyled">
          <li><Link to="/" className="text-light text-decoration-none">🏠 Home</Link></li>
          <li><Link to="/aboutus" className="text-light text-decoration-none">ℹ️ About Us</Link></li>
          <li><Link to="/contactus" className="text-light text-decoration-none">📞 Contact</Link></li>
          <li><Link to="/orders" className="text-light text-decoration-none">📦 Orders</Link></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Contact Us</h5>
        <p>📍 123 Market Street, Hyderabad, India</p>
        <p>📧 support@Foodify.com</p>
        <p>📞 +91 98765 43210</p>
        <div>
          <a href="#" className="text-light me-3">Facebook</a>
          <a href="#" className="text-light me-3">Instagram</a>
          <a href="#" className="text-light">Twitter</a>
        </div>
      </div>

      {/* Google Maps */}
      <div className="col-md-3 mb-4">
        <h5 className="fw-bold">Find Us</h5>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.271715931884!2d78.48667181536466!3d17.385044988090882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb975b0a556d11%3A0x60a823b8d6d0e6f7!2sHyderabad%20Central!5e0!3m2!1sen!2sin!4v1677765432101!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Foodify Location"
          ></iframe>
        </div>
      </div>
    </div>

    <hr className="border-secondary" />
    <div className="text-center">
      <p className="mb-0">
        © {new Date().getFullYear()} Foodify. All Rights Reserved.
      </p>
    </div>
  </div>
      </footer>

    </>
  )
}

export default Footer;