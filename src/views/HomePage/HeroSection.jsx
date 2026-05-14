import React, { useState } from "react";
import style from "./HeroSection.module.scss";

import { HashLink } from "react-router-hash-link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import TypeIt from "typeit-react";

import links from "utils/links.json";
import heroimg from "assets/images/landing/home/herovector.png";
import facebook from "assets/images/landing/facebook.svg";
import instagram from "assets/images/landing/instagram.svg";
import twitter from "assets/images/landing/twitter.svg";
import slide1 from "assets/images/landing/home/slide1.png";
import potential1 from "assets/images/landing/home/potential1.jpg";
import potential2 from "assets/images/landing/home/potential2.jpg";
import bgright from "assets/images/landing/home/bgright.png";
import bgleft from "assets/images/landing/home/bgleft.png";

/*Constants */
const _COLORS = ["#29A8CD", "#FBBC05", "#E65C62", "#34A853"];
const _TYPEIT_STRINGS = [
  "Engineers",
  "Scientists",
  "IAS Officers",
  "Architects",
  "Designers",
  "Doctors",
];

const _ARR_IMAGES_CAROUSEL_2 = [potential1, potential2];
const _ARR_IMAGES_CAROUSEL_1 = [slide1];

SwiperCore.use([Pagination, Autoplay]);

export default function Hero() {
  const [iterator, setIterator] = useState(-1);

  function scrollWithOffset(el) {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  }

  function openSocialMedia(link) {
    window.open(link);
  }

  return (
    <div className={style.wrapper}>
      {/* BACKGROUND IMAGES ---------------------  */}
      <img className={style.bgright} src={bgright} alt="" />
      <img className={style.bgleft} src={bgleft} alt="" />

      <div className={style.maxWidthContainer}>
        <div className={style.hero}>
          <div className={style.text}>
            <p className={style.heading}>
              Prepare yourself for Extraordinary Placements{" "}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </p>
            <p className={style.subheading}>Accelerate your Career with CCC</p>
            <div className={style.mobileImage}>
              <img src={heroimg} alt="" />
            </div>
            <div className={style.ctas}>
              <HashLink
                smooth
                to={"#roadmap"}
                scroll={(el) => scrollWithOffset(el)}
              >
                <button className={style.solid}>know more</button>
              </HashLink>
              <HashLink
                smooth
                to={"#courses"}
                scroll={(el) => scrollWithOffset(el)}
              >
                <button className={style.hollow}>view courses</button>
              </HashLink>
            </div>
            <div className={style.socials}>
              <button
                onClick={openSocialMedia.bind(this, links.socialMedia.facebook)}
              >
                <img src={facebook} alt="" />
              </button>
              <button
                onClick={openSocialMedia.bind(
                  this,
                  links.socialMedia.instagram
                )}
              >
                <img src={instagram} alt="" />
              </button>
              <button
                onClick={openSocialMedia.bind(this, links.socialMedia.twitter)}
              >
                <img src={twitter} alt="" />
              </button>
            </div>
          </div>
          <div className={style.image}>
            <img src={heroimg} alt="" />
          </div>
        </div>

        <div className={style.statsContainer}>
          <div className={style.heading}>
            We’re building the problem solving playground for future
            <div
              className={style.autotype}
              style={{ color: _COLORS[iterator] }}
            >
              <TypeIt
                options={{
                  strings: _TYPEIT_STRINGS,
                  speed: 200,
                  cursor: false,
                  waitUntilVisible: true,
                  loop: true,
                  breakLines: false,
                  beforeString: () =>
                    setIterator((prev) => (prev < 3 ? prev + 1 : 0)),
                }}
              />
            </div>
          </div>

          {/* CAROUSELS -----------------------  */}
          <div className={style.row}>
            <div className={style.carousel}>
              <Swiper
                centeredSlides
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                }}
              >
                {_ARR_IMAGES_CAROUSEL_1.map((image) => (
                  <SwiperSlide key={image}>
                    <div className={style.slide}>
                      <img src={image} alt="carousel" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={style.carousel}>
              <Swiper
                centeredSlides
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: true,
                }}
              >
                {_ARR_IMAGES_CAROUSEL_2.map((image) => (
                  <SwiperSlide key={image}>
                    <div className={style.slide}>
                      <img src={image} alt="carousel" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
