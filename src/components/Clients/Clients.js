import React from 'react'
import "./Clients.css"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
const Clients = () => {
  return (
    <div className='clientContainer'>
        <h1>Our Clients</h1>
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
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="custom-swiper" 
      >
        <SwiperSlide  className="client-slide">
            <img src="https://mittshop.mittsure.com/vendors/logo/vendor-1196939280.png" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide  className="client-slide">
            <img src="https://mittshop.mittsure.com/vendors/logo/cropped-edcred-2%20(2)%20(6).png" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide   className="client-slide">
            <img src="https://mittshop.mittsure.com/vendors/logo/tinkerly%20logo.jpeg" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide  className="client-slide">
            <img src="https://mittshop.mittsure.com/vendors/logo/vendor-1798228958.png" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide  className="client-slide">
            <img src="https://mittshop.mittsure.com/vendors/logo/vendor-165955242.png" alt="" srcset="" />
        </SwiperSlide>
        <SwiperSlide  className="client-slide">
            <img src="https://mittshop.mittsure.com/vendors/logo/mittsure.png" alt="" srcset="" />
        </SwiperSlide>
        
      </Swiper>
    </div>
  )
}

export default Clients
