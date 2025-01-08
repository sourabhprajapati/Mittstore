import React from "react";
import Header from "../../components/header/Header";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import tabs from "../../assets/Tabs.JPG";
import elct from "../../assets/elct.jpg";
import outdoor from "../../assets/outdoor.JPG";
import current from "../../assets/current.jpg";
import fur from "../../assets/fur.jpg";
import poster from "../../assets/Poster.jpg";
import headphone from "../../assets/headphone.png";
import Furniture from "../../assets/chairimage.png";
import Desks from "../../assets/desk.png";
import SolarPanel from "../../assets/solar.png";
import Sports from "../../assets/sports.png";
import Tablets from "../../assets/tablets.png";
import Supplies from "../../assets/scissors.png";
import Paper from "../../assets/papers.png";
import Pencils from "../../assets/pencil.png";
import Art from "../../assets/art.png";
import Paint from "../../assets/paints.png";
import Computer from "../../assets/computer.png";
import kids from "../../assets/kids.jpg";
import trust from "../../assets/trusted.png"
import secure from "../../assets/secure.png"
import customer from "../../assets/customer.png";
import support from "../../assets/support.png";



// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../assets/1.gif";
import slide2 from "../../assets/2.gif";

import slide3 from "../../assets/3.gif";

import { Autoplay } from "swiper/modules";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import Footer from "../../components/Footer/Footer";
function Home() {
  return (
    <div>
      <Header />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          576: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
        </SwiperSlide>
      </Swiper>
      <div className="top-categorish">
        <h1 className="title">Top Categories</h1>
        <div className="card-Container">
          <div className="card">
            <img src={tabs} alt="" />
          </div>
          <div className="card">
            <img src={elct} alt="" />
          </div>
          <div className="card">
            <img src={outdoor} alt="" />
          </div>
          <div className="card">
            <img src={current} alt="" />
          </div>
          <div className="card">
            <img src={fur} alt="" />
          </div>
        </div>
      </div>
      <div className="mittsure-container">
        <div className="container1">
          <img src={poster} alt="" />
          <div className="title2">
            <h1>Mittsure Empowering Schools For an Enriching Experience</h1>
            <button>Let's Discuss</button>
          </div>
        </div>
      </div>
      <div className="featuredCategories">
        <div className="featured-container">
          <div className="title">
            <h1>Featured Categories</h1>
          </div>
          <div className="card-conatiner">
            <div className="featured-card">
              <img src={headphone} alt="headphone" />
              <p>Headphone</p>
            </div>
            <div className="featured-card">
              <img src={Furniture} alt="Furniture" />
              <p>Furniture</p>
            </div>
            <div className="featured-card">
              <img src={Desks} alt="Desks" />
              <p>Desks</p>
            </div>
            <div className="featured-card">
              <img src={SolarPanel} alt="Solar Panel" />
              <p>Solar Panel</p>
            </div>
            <div className="featured-card">
              <img src={Sports} alt="Sports" />
              <p>Sports</p>
            </div>
            <div className="featured-card">
              <img src={Tablets} alt="Tablets" />
              <p>Tablets</p>
            </div>
            <div className="featured-card">
              <img src={Supplies} alt="headphone" />
              <p>School & office Supplies</p>
            </div>
            <div className="featured-card">
              <img src={Paper} alt="Paper" />
              <p>Paper</p>
            </div>
            <div className="featured-card">
              <img src={Pencils} alt="Pencils" />
              <p>Pencils</p>
            </div>
            <div className="featured-card">
              <img src={Art} alt="Art Supplies" />
              <p>Art Supplies</p>
            </div>
            <div className="featured-card">
              <img src={Paint} alt="Paint" />
              <p>Paint</p>
            </div>
            <div className="featured-card">
              <img src={Computer} alt="Computer" />
              <p>Computer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="about">
        <img src={kids} alt="kids" />
        <div className="about-container">
          <h1>About Mittsure!</h1>
          <p>
            Mittsure Technologies is a revolutionary startup that provides
            end-to-end solutions to schools for all their requirements, from
            academics to infrastructure. The primary objective of Mittsure is to
            empower schools under NEP 2020. Mittsure is also facilitating
            schools by partnering with startups and organizations, developing
            products and services for pre-primary, primary, secondary, higher
            secondary education, and school infrastructure.
          </p>
        </div>
      </div>
      <div className="detail">
           <div className="detailCard">
              <img src={trust} alt="trusted"  />
              <h5>Trusted platform</h5>
              <p>Provide security capabilites</p>
           </div>
           <div className="detailCard">
              <img src={secure} alt="trusted"  />
              <h5>Secure Payment</h5>
              <p>We ensure secure payment</p>
           </div>
           <div className="detailCard">
           <img src={customer} alt="trusted"  />
              <h5>Become a Mittsure customer</h5>
              <p>It's intuitive,and it helps you leverage<br/> 
              every money you spend</p>
           </div>
           <div className="detailCard">
               <img src={support} alt="trusted"  />
              <h5>Customer Support </h5>
              <p>Call or email us 24/7</p>
           </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
