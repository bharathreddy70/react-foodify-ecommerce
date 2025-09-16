import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <>
      {/* 🔹 Hero Section */}
      <section className="text-center hero-banner-section section-padding">
        <h1 className="display-4 fw-bold animate-fade-up">
          Fresh. Affordable. Delivered.
        </h1>
        <p className="lead animate-fade-up">
          Shop fresh vegetables, quality meat, delicious chocolates, and refreshing drinks – all in one place.
        </p>
        <Link to="/veg" className="btn btn-primary btn-lg animate-fade-up">
          Shop Now
        </Link>
      </section>

      {/* 🔹 Featured Categories */}
      <section className="container section-padding">
        <h2 className="text-center section-title">Shop by Category</h2>
        <div className="row text-center">
          <div className="col-md-3 mb-4">
            <Link to="/veg" className="text-decoration-none text-dark">
              <div className="card shadow-sm">
                <img src="/Images/veg.jpg" className="card-img-top" alt="Veg" height="190px" />
                <div className="card-body">
                  <h5 className="card-title">Vegetables</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 mb-4">
            <Link to="/nonveg" className="text-decoration-none text-dark">
              <div className="card shadow-sm">
                <img src="/Images/nonveg.jpg" className="card-img-top" alt="Non-Veg" height="190px" />
                <div className="card-body">
                  <h5 className="card-title">Non-Veg</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 mb-4">
            <Link to="/drinks" className="text-decoration-none text-dark">
              <div className="card shadow-sm">
                <img src="/Images/drinks.png" className="card-img-top" alt="Drinks" height="190px" />
                <div className="card-body">
                  <h5 className="card-title">Drinks</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 mb-4">
            <Link to="/chocolates" className="text-decoration-none text-dark">
              <div className="card shadow-sm">
                <img src="/Images/chocolates.png" className="card-img-top" alt="Chocolates" height="190px" />
                <div className="card-body">
                  <h5 className="card-title">Chocolates</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 🔹 Best Sellers / Featured Products */}
      <section className="container section-padding">
        <h2 className="text-center section-title">Best Sellers</h2>
        <div className="row">
          {[
            { id: 1, name: "Tomatoes", price: 50, unit: "kg", image: "/Images/product1.png" },
            { id: 2, name: "Prawns", price: 120, unit: "kg", image: "/Images/product2.png" },
            { id: 3, name: "Coca Cola", price: 80, unit: "L", image: "/Images/product3.png" },
            { id: 4, name: "Chocolate Pack", price: 150, unit: "pack", image: "/Images/product4.png" },
          ].map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  height="190px"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price} / {product.unit}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Special Offers */}
      <section className="special-offer-section text-center section-padding">
        <h2>🔥 Special Offer 🔥</h2>
        <p className="lead">Get 20% Off on Chocolates – Today Only!</p>
        <Link to="/chocolates" className="btn btn-light btn-lg">
          Shop Chocolates
        </Link>
      </section>

      {/* 🔹 Testimonials */}
      <section className="container section-padding">
        <h2 className="text-center section-title">What Our Customers Say</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <p>“Super fresh veggies delivered on time. Highly recommend!”</p>
              <h6 className="text-muted">– Anjali</h6>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <p>“Loved the chocolates collection, my kids are so happy!”</p>
              <h6 className="text-muted">– Ramesh</h6>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <p>“The meat was fresh and hygienically packed. Great service!”</p>
              <h6 className="text-muted">– Priya</h6>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Footer */}
      <Footer />
    </>
  );
}

export default Home;
