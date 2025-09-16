
/* -------------------------------refactored home.jss----------------------------------------- */

// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Footer from "./Footer";

// function Home() {
//   // 🔹 Flash Sale Timer State
//   const calculateTimeLeft = () => {
//     const targetDate = new Date();
//     targetDate.setHours(targetDate.getHours() + 5);
//     const difference = targetDate - new Date();

//     let timeLeft = {};
//     if (difference > 0) {
//       timeLeft = {
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // 🔹 Best Sellers Data
//   const products = [
//     { id: 1, name: "Tomatoes", price: 50, image: "/Images/product1.png" },
//     { id: 2, name: "Prawns", price: 120, image: "/Images/product2.png" },
//     { id: 3, name: "Coca Cola", price: 80, image: "/Images/product3.png" },
//     { id: 4, name: "Chocolate Pack", price: 150, image: "/Images/product4.png" },
//     { id: 5, name: "Broccoli", price: 60, image: "/Images/product5.png" },
//     { id: 6, name: "Chicken Pack", price: 250, image: "/Images/product6.png" },
//   ];

//   // 🔹 Best Sellers Carousel Settings
//   const bestSellerSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };

//   // 🔹 Testimonials Data
//   const testimonials = [
//     {
//       name: "Ravi Kumar",
//       text: "Great service! Fresh vegetables delivered on time.",
//       img: "/Images/user1.png",
//     },
//     {
//       name: "Sneha Reddy",
//       text: "Affordable prices and quick delivery. Highly recommend!",
//       img: "/Images/user2.png",
//     },
//     {
//       name: "Arjun Sharma",
//       text: "Best online grocery store I've used so far.",
//       img: "/Images/user3.png",
//     },
//   ];

//   // 🔹 Testimonials Carousel Settings
//   const testimonialSettings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     speed: 500,
//     autoplaySpeed: 4000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <>
//       {/* 🔹 Hero Section */}
//       <section id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
//         <div className="carousel-inner">
//           {["banner1.png", "banner2.png", "banner3.png"].map((banner, index) => (
//             <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
//               <img src={`/Images/${banner}`} className="d-block w-100 hero-img" alt="Banner" />
//               <div className="carousel-caption d-none d-md-block">
//                 <h2 className="fw-bold">Fresh. Affordable. Delivered.</h2>
//                 <p>Get your groceries in minutes, not hours.</p>
//                 <button className="btn btn-primary">Shop Now</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 🔹 Trending Offers */}
//       <section className="container py-5">
//         <h2 className="text-center mb-4">🔥 Trending Offers</h2>
//         <div className="row g-4">
//           {["offer1.png", "offer2.png", "offer3.png"].map((offer, index) => (
//             <div className="col-md-4" key={index}>
//               <div className="card offer-card">
//                 <img src={`/Images/${offer}`} className="card-img-top" alt="Offer" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 🔹 Flash Sale */}
//       <section className="container text-center py-5">
//         <h2>⚡ Flash Sale</h2>
//         <h4>
//           {timeLeft.hours || "00"}h : {timeLeft.minutes || "00"}m : {timeLeft.seconds || "00"}s
//         </h4>
//         <button className="btn btn-danger flash-sale-btn mt-3">Grab Offer</button>
//       </section>

//       {/* 🔹 Featured Categories */}
//       <section className="container py-5">
//         <h2 className="text-center mb-4">🌟 Featured Categories</h2>
//         <div className="row g-4">
//           {["veg.png", "nonveg.png"].map((cat, index) => (
//             <div className="col-md-6" key={index}>
//               <div className="card category-card">
//                 <img src={`/Images/${cat}`} className="card-img-top" alt="Category" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 🔹 Best Sellers */}
//       <section className="container mb-5">
//         <h2 className="text-center mb-4">🔥 Best Sellers</h2>
//         <Slider {...bestSellerSettings}>
//           {products.map((p) => (
//             <div key={p.id} className="card p-3 text-center m-2">
//               <img src={p.image} alt={p.name} className="img-fluid mb-2" />
//               <h5>{p.name}</h5>
//               <p>₹{p.price}</p>
//               <button className="btn btn-primary">Add to Cart</button>
//             </div>
//           ))}
//         </Slider>
//       </section>

//       {/* 🔹 Testimonials */}
//       <section className="container py-5">
//         <h2 className="text-center mb-4">💬 What Our Customers Say</h2>
//         <Slider {...testimonialSettings}>
//           {testimonials.map((t, index) => (
//             <div key={index} className="card text-center p-4">
//               <img src={t.img} alt={t.name} className="rounded-circle mx-auto" width="80" />
//               <p className="mt-3">“{t.text}”</p>
//               <h6 className="fw-bold">{t.name}</h6>
//             </div>
//           ))}
//         </Slider>
//       </section>

//       {/* 🔹 Newsletter */}
//       <section className="newsletter-section py-5 text-center text-white">
//         <h2>📩 Subscribe to our Newsletter</h2>
//         <p>Get the latest deals and offers straight to your inbox.</p>
//         <form className="d-flex justify-content-center">
//           <input type="email" placeholder="Enter your email" className="form-control w-50 me-2" />
//           <button className="btn btn-warning">Subscribe</button>
//         </form>
//       </section>

//       <Footer />
//     </>
//   );
// }

// export default Home;





/*----------------------original Home.css-1 ----------------------*/ 

/* Fade-in Up Animation */
/*
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeInUp 1s ease-out forwards;
}



.hero-banner-section {
  background-image: url('/Images/banner1.png'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  color: white; 
  position: relative; 
}

.hero-banner-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); 
  z-index: 1;
}

.hero-banner-section > * {
  position: relative;
  z-index: 2; 
}


.special-offer-section {
  background-image: url('/Images/chocolate_sale_banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  position: relative;
  overflow: hidden;
}

.special-offer-section::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.special-offer-section h2,
.special-offer-section p,
.special-offer-section a {
  position: relative;
  z-index: 2;
}*/


/* 227- Dark overlay for better text readability */
/* 236- Special Offer Section */
/* 209- Hero Banner Section */