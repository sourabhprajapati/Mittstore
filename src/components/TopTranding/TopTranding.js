import React from "react";
import "./TopTranding.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from "react-router-dom"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from "swiper/modules";
const TopTranding = () => {
  return (
    <div className="top-categorish">
      <h1 className="title">Top Tranding</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="card-Container">
          <SwiperSlide>
           
            <img src="https://m.media-amazon.com/images/I/816uYhnJ0KL._AC_UL320_.jpg" alt="swiper" srcset="" />
            <p>Cable World® New Kids Designer Hardtop Pencil Case for Girls and Women (Multi Color) (Multi Design)</p>
            

            <h5>₹294 <span>M.R.P: <del>₹1000</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
          </SwiperSlide>
          <SwiperSlide>
           
          <img src="https://m.media-amazon.com/images/I/81jKjK9tNTL._AC_UL320_.jpg" alt="swiper" srcset="" />
            <p>Craftinger DIY 85 Pcs Pro Resin Art Kit with 200 Gm Resin and Coasters Alphabet Keychain Earring Making Kit with Pigment Glitter Mica </p>
           

            <h5>₹874 <span>M.R.P: <del>₹1499</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
         </SwiperSlide> 
          <SwiperSlide>
           
          <img src="https://m.media-amazon.com/images/I/510YRHHfJWS._AC_UL320_.jpg" alt="swiper" srcset="" />
            <p>DCloud Hub Metal Folding Student Chair with Writing Pad for Work from Home Study - Brown</p>
             

            <h5>₹2599 <span>M.R.P: <del>₹7000</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
         </SwiperSlide> 
          <SwiperSlide>
           
          <img src="https://m.media-amazon.com/images/I/51QDXqSjIgL._AC_UL320_.jpg" alt="swiper" srcset="" />
            <p>ALKOSIGN Dual Seater Bench with Back Support Desk - Sturdy Cast Iron Frame with Pre Laminated MDF Board </p>
           

            <h5>₹6515 <span>M.R.P: <del>₹6789</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
         </SwiperSlide>  
         <SwiperSlide>
         <img src="https://m.media-amazon.com/images/I/61IRzz2jr5L._AC_UL320_.jpg" alt="swiper" srcset="" />
            <p>NEXT GEEK Solar Power, Simple Circuit,Buzzer, Water Pump,Project kit Science Experiment Electronic kit for Kids with Instruction Manual</p>
             

            <h5>₹329 <span>M.R.P: <del>₹799</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
           
         </SwiperSlide>  
         <SwiperSlide>
         <img src="https://m.media-amazon.com/images/I/616UwVmh1WL._AC_UL320_.jpg" alt="swiper" srcset="" />
            <p>Lenovo Tab P12|12.7 Inch,3K Display|8 Gb,256 Gb (Expandable Up to 1 Tb)|10200 Mah Battery|Jbl Quad Speakers with Dolby Atmos</p>
             

            <h5>₹2599 <span>M.R.P: <del>₹4299</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
         </SwiperSlide> 
          <SwiperSlide>
          <img src="https://m.media-amazon.com/images/I/61STzZkAGSL._AC_UY218_.jpg" alt="swiper" srcset="" />
            <p>Lenovo ThinkBook 14 Intel 13th Gen Core i3 14" (35.56cm) WUXGA IPS 300 Nits Antiglare Thin and Light Laptop </p>
             

            <h5>₹43890<span>M.R.P: <del>₹50000</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
           
         </SwiperSlide> 
          <SwiperSlide>
          <img src="https://m.media-amazon.com/images/I/71qdZRw5nTL._AC_UL320_.jpg" alt="swiper" srcset="" />
            <p>Apsara Matt Magic 2.0 Pencil, Writing Pencils With Dual Color Wood & Long-lasting Fun, Hexagonal Body for Strong Grip</p>
            

            <h5>₹60<span>M.R.P: <del>₹80</del></span>(73% off)</h5>
            <Link to='/cart'><button>Add to cart</button></Link>
          
         </SwiperSlide> 
         
        </div>
      </Swiper>
    </div>
  );
};

export default TopTranding;
