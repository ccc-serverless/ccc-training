import React, { useEffect, useState } from "react";
import styles from "./BundleContainer.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import clsx from "clsx";

import CourseCard from "./CourseCard";
import InfoCourseCard from "./InfoCourseCard";
import CourseCardsBusiness from "./CourseCardsBusiness";

SwiperCore.use([Pagination, Autoplay, Navigation]);

export default function BundleContainer({ options, bundle }) {
  const { showHeadingSlide, allowSwipe, type } = options;

  const [isMobile, setIsMobile] = useState(false);

  function getId(bundle) {
    if (bundle.split(" ")) return bundle.toLowerCase().split(" ").join("");
  }

  function resizeHandler() {
    if (window.innerWidth <= 950) setIsMobile(true);
    else setIsMobile(false);
  }

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    bundle.status !== -1 &&
    bundle.status !== 3 && (
      <div
        id={getId(bundle.name)}
        className={clsx(styles.wrapper, "bundleContainerCarousel")}
      >
        <div className={clsx(styles.cards)}>
          {!isMobile && (
            <>
              {showHeadingSlide && (
                <div className={styles.bundleImage}>
                  <img src={bundle.levelImgUrl} alt="" />
                </div>
              )}
              <Swiper
                spaceBetween={20}
                slidesPerView={"auto"}
                pagination={{ clickable: true }}
                allowTouchMove={allowSwipe}
                navigation={true}
                id="home-camp-carousel"
                className={styles.swiperContainer}
              >
                {bundle.courses.map((course) => (
                  <SwiperSlide key={course._id}>
                    <CourseCardsBusiness course={course} bundle={bundle} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>

        {isMobile && (
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            allowTouchMove={allowSwipe}
            navigation={true}
            id="home-camp-carousel"
            className={styles.swiperContainer}
          >
            {showHeadingSlide && (
              <SwiperSlide>
                <div className={styles.bundleImage}>
                  <img src={bundle.levelImgUrl} alt="" />
                </div>
              </SwiperSlide>
            )}
            {bundle.courses.map((course) => (
              <SwiperSlide key={course._id}>
                <CourseCardsBusiness course={course} bundle={bundle} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    )
  );
}
