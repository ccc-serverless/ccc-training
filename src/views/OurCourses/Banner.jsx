import React from "react";
import styles from "./Banner.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import rocket from "assets/images/landing/rocket.png";
import slide1 from "assets/images/landing/roadmap.png";
import challengesImg from "assets/images/landing/challenges.png";
import { useNavigate } from "react-router-dom";
// import slide4 from "assets/images/landing/slide4.svg";

// import odishaHack from "assets/images/courses/jayaho_4.png";

SwiperCore.use([Pagination, Autoplay]);

export default function Banner() {
  const navigate = useNavigate();

  function handleClickChallenges() {
    navigate("/contests");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bannerInfo}>
        <div className={styles.bannerText}>
          <div className={styles.main}>
            <div> Prepare yourself for </div>
            <div>
              Extraordinary Placements
              <span>
                <img src={rocket} alt="rocket-graphic" />
              </span>
            </div>
          </div>
          <div className={styles.submain}>Accelerate your Career with CCC</div>
        </div>

        <div className={styles.bannerCarousel}>
          <Swiper
            centeredSlides
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
          >
            <SwiperSlide>
              <div onClick={handleClickChallenges} style={{ cursor: "pointer" }} className={styles.slide}>
                <img src={challengesImg} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <img src={slide1} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
