import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, reduceQty } from "./store";
import { Slide, toast, ToastContainer } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import ContactUs from "./ContactUs";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroCarousel from "./HeroCarousel";

function Home() {
  const dispatch = useDispatch();
  const contactRef = useRef();
  const cartItems = useSelector((state) => state.cart);

  const vegTop2 = useSelector((state) => state.products.veg);
  const nonVegTop2 = useSelector((state) => state.products.nonVeg);
  const chocolatesTop2 = useSelector((state) => state.products.chocolates);
  const drinksTop2 = useSelector((state) => state.products.drinks);

  const bestSellers = React.useMemo(() => {
    return [
      ...vegTop2.slice(0, 2),
      ...nonVegTop2.slice(0, 2),
      ...chocolatesTop2.slice(0, 2),
      ...drinksTop2.slice(0, 2),
    ];
  }, [vegTop2, nonVegTop2, chocolatesTop2, drinksTop2]);

  const getCartItem = (id) => cartItems.find((item) => item.id === id);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  

  return (
    <>
      <ToastContainer
        limit={7}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="custom-toast"
        transition={Slide}
      />

      {/* 🔹 Hero Section with Parallax */}
      <section className="hero-section" data-aos="fade-down">
        <HeroCarousel />
      </section>

      {/* 🔹 Featured Categories */}
      <section className="container-fluid section-padding" data-aos="fade-up">
        <h2 className="text-center section-title" data-aos="zoom-in">
          Shop by Category
        </h2>
        <div className="row text-center">
          {[
            { link: "/veg", img: "/Images/veg.png", title: "Veg Dishes" },
            { link: "/nonveg", img: "/Images/nonveg.jpg", title: "Non-Veg Dishes" },
            { link: "/drinks", img: "/Images/drinks.png", title: "Drinks" },
            { link: "/chocolates", img: "/Images/chocolates.png", title: "Chocolates" },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="col-md-3 mb-4"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <Link to={cat.link} className="text-decoration-none text-dark">
                <div className="card shadow-sm animate-fade-up">
                  <img src={cat.img} className="card-img-top" alt={cat.title} height="220px" />
                  <div className="card-body">
                    <h5 className="card-title">{cat.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

{/* 🔹 Best Sellers Horizontal Carousel */}
<section className="bestsellers-section section-padding" data-aos="fade-up">
  <h2 className="text-center section-title" data-aos="zoom-in">
    Best Sellers
  </h2>

  <div className="bestsellers-wrapper">
    {bestSellers.map((product, idx) => {
      const cartItem = getCartItem(product.id);
      return (
        <div key={product.id} className="bestseller-card">
          <Link to={product.link} className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                height="220px"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  ₹{product.price} / {product.unit}
                </p>

                {!cartItem ? (
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addToCart(product));
                      toast.success(`${product.name} added to cart!`);
                    }}
                  >
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </button>
                ) : (
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(reduceQty(product.id));
                        toast.info(`Reduced ${product.name} quantity`);
                      }}
                    >
                      -
                    </button>
                    <span className="fw-bold">{cartItem.quantity}</span>
                    <button
                      className="btn btn-outline-success"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(increaseQty(product.id));
                        toast.success(`${product.name} added to cart!`);
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      );
    })}
  </div>
</section>


      {/* 🔹 Special Offer */}
      <section
        className="special-offer-section text-center section-padding"
        data-aos="flip-left"
      >
        <h2>🔥 Special Offer 🔥</h2>
        <p className="lead">Get 20% Off on Chocolates – Today Only!</p>
        <Link to="/chocolates" className="btn btn-light btn-lg">
          Shop Chocolates
        </Link>
      </section>

      {/* 🔹 Testimonials */}
      <section className="testimonial-section mt-2 section-padding" data-aos="fade-up">
        <h2 className="text-center section-title" data-aos="zoom-in">
          What Our Customers Say
        </h2>
        <div
          id="testimonialCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-inner text-center">
            {[
              {
                name: "Rosy",
                text:
                  "“Super fresh veggies delivered on time. Highly recommend! The packaging was neat and the produce was of top-notch quality. Will definitely order again and tell my friends about Foodify.”",
                rating: 4.5,
              },
              {
                name: "John",
                text:
                  "“Loved the chocolates collection, my kids are so happy! The flavors were rich and the delivery was on point. Excellent customer service, very friendly staff, highly recommended.”",
                rating: 5,
              },
              {
                name: "Sara",
                text:
                  "“The meat was fresh and hygienically packed. Great service! The delivery was fast and the quality exceeded my expectations. Foodify has become my go-to for weekly groceries.”",
                rating: 4.5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
              >
                <div className="card testimonial-card mx-auto shadow-sm p-4">
                  <div className="avatar mb-3">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <p className="mb-3">{testimonial.text}</p>
                  <h6 className="text-muted mb-2">– {testimonial.name}</h6>
                  <div className="text-warning">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${i + 0.5 < testimonial.rating ? "-fill" : ""}`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* 🔹 Contact Us Section */}
      <section
        ref={contactRef}
        id="contact-section"
        className="contact-parallax-section"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <ContactUs />
      </section>
    </>
  );
}

export default Home;
