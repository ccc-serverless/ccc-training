import React, { useState, useEffect } from "react";
import style from "./index.module.scss";

import ReactPlayer from "react-player/lazy";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Play, ArrowRight } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";

import CarouselModal from "components/shared/CarouselModal";
import Preloader from "components/shared/Preloader";

import { useUser, useActiveCourses } from "contexts/AllContexts";
import { getRequest, postRequest } from "utils/api";
import { isLoggedIn } from "utils/helper";

import check from "assets/images/icons/checkbox.svg";

import ClockImg from "assets/images/course-info/clock.png";
import CertificateImg from "assets/images/course-info/certificate.png";

SwiperCore.use([Pagination, Autoplay]);

export default function Course() {
  const [course, setCourse] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState("randomId");
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    initialSlide: null,
  });

  const urlParams = useParams();
  const navigate = useNavigate();

  const ActiveCourses = useActiveCourses();
  const User = useUser();

  function handleExpandAccordion({ index, module }) {
    if (module.items[0].name) {
      if (index === activeAccordion) setActiveAccordion(null);
      else setActiveAccordion(index);
    } else {
      if ("authToken" in localStorage) {
        let url = `/course/learn/${course.activeCourse._id}/${module.order}/1`;
        navigate(url);
      }
    }
  }

  function handleRedirectToResource(module, item) {
    if ("authToken" in localStorage) {
      const url = `/course/learn/${course.activeCourse._id}/${module.order}/${item.slNo}`;
      navigate(url);
    }
  }

  function handleClickButton() {
    if (course.activeCourse.status === 0) {
      let data = {
        activeCourseId: course.activeCourse._id,
      };
      postRequest("/user/course/start", data)
        .then((res) => {
          User.refreshUserData();
          let url = `/course/learn/${data.activeCourseId}/1/1`;
          navigate(url);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    } else if (course.activeCourse.status === 1) {
      let url = `/course/learn/${course.activeCourse._id}/1/1`;
      navigate(url);
    }
  }

  function getButtonText(course) {
    if (course.status === 0) return "Start";
    if (course.status === 1) return "Continue";
    if (course.status === 2) return "Completed";
  }

  function getCourseDetails() {
    getRequest(`/course/${urlParams.courseId}`)
      .then((resp) => {
        resp.data.buttonText = getButtonText(resp.data);
        resp.data.activeCourse = ActiveCourses.getActiveCourseFromCourseId(resp.data._id);
        resp.data.modules.sort((a, b) => a.order - b.order);

        setCourse(resp.data);
      })
      .catch((err) => console.log(err));
  }

  function isFoundInActiveCourses() {
    const courseGot = ActiveCourses.getActiveCourseFromCourseId(course._id);
    if (courseGot) {
      return true;
    } else return false;
  }

  function redirectToTrial(course) {
    switch (course.name) {
      case "Language":
        navigate("/trial/language");
        break;
      case "Numbers":
        navigate("/trial/numbers");
        break;
      case "Problem Solving":
        navigate("/trial/logical-reasoning");
        break;
      default:
        return null;
    }
  }

  function handleOpenPreviewModal(index) {
    setPreviewModal((prev) => {
      let update = {
        isOpen: !prev.isOpen,
        initialSlide: index,
      };
      return update;
    });
  }

  useEffect(() => {
    if (!ActiveCourses.state.isLoading) getCourseDetails();
  }, [ActiveCourses.state.isLoading]);

  return course ? (
    <div className={style.wrapper}>
      {/* <div className={style.floatingRegisterButton}>
        <div className={style.price}>
          <p>$ {course.price}</p>
          <p>for 6 months</p>
        </div>
        <div className={style.controller}>
          <button onClick={handleClickRegister}>{course.buttonText}</button>
        </div>
      </div> */}
      <div className={style.banner}>
        <div className={style.withBackground}>
          <div className={style.left}>
            <div className={style.name}>{course.name}</div>
            <div></div>
            <div className={style.summary}>{course.description.summary}</div>
          </div>
          <div className={style.right}>
            <div className={style.card}>
              <div className={style.image}>
                <img src={course.img_url} alt="course" />
              </div>

              <div className={style.button}>
                <button>Start Learning</button>
              </div>

              <div className={style.details}>
                <div className={style.row}>
                  <img src={ClockImg} alt="time" />
                  <div>
                    <div>{course.hours} hours</div>
                    <div>of self-paced lessons & assessments</div>
                  </div>
                </div>

                <div className={style.row}>
                  <img src={CertificateImg} alt="time" />
                  <div>
                    <div>Completion Certificate</div>
                    <div>awarded on course completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={style.headerBox}>
          <div className={style.courseImage}>
            <img src={course.img_url} alt="" />
          </div>
          <div className={style.courseDetails}>
            <p className={style.courseTitle}>{course.name}</p>
            <p className={style.courseSummary}>{course.description.summary}</p>
          </div>
          <div className={style.courseControllers}>
            {course.freeTrial && (
              <button
                className={style.tryButton}
                onClick={redirectToTrial.bind(this, course)}
              >
                Try for free <ArrowRight />
              </button>
            )}

            <p>
              <span>${course.price}</span> for 6 months
            </p>
            {isLoggedIn() && (
              <div className={style.buttonGroup}>
                {isFoundInActiveCourses() && (
                  <button onClick={handleClickButton}>{getButtonText(course)}</button>
                )}
              </div>
            )}
          </div>
        </div> */}
      </div>

      {/* <div className={style.modulesCarousel}>
        {course.previewItems && (
          <>
            <p className={style.moduleTitle}>Course Preview</p>

            <div className={style.carousel}>
              <Swiper
                spaceBetween={25}
                slidesPerView={"auto"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {}}
                onSlideChange={() => {}}
                id="home-camp-carousel"
              >
                {course.previewItems.map((file, index) => (
                  <>
                    {file.type === "image" ? (
                      <SwiperSlide key={index}>
                        <div
                          key={index}
                          className={style.slide}
                          onClick={handleOpenPreviewModal.bind(this, index)}
                        >
                          <div className={style.itemImage}>
                            <img src={file.url} alt="" />
                          </div>
                        </div>
                      </SwiperSlide>
                    ) : (
                      <SwiperSlide>
                        <div
                          className={style.slide}
                          onClick={handleOpenPreviewModal.bind(this, index)}
                        >
                          <div className={style.playButton}>
                            <Play />
                          </div>
                          <ReactPlayer
                            url={file.url}
                            light
                            muted
                            playing
                            width="100%"
                            height="100%"
                          />
                        </div>
                      </SwiperSlide>
                    )}
                  </>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </div> */}

      <div className={style.features}>
        <p className={style.featuresTitle}>Course Highlights</p>
        <div className={style.featuresList}>
          {course.description.objectives.map((feat, index) => (
            <p key={index}>
              <img src={check} alt="" />
              {feat}
            </p>
          ))}
          {/* <p>
            <img src={check} alt="" />
            The course is available only for ${course.price} inclusive of learning videos,
            fun learning games with 6 months access
          </p> */}
        </div>
      </div>
      {/* 
      <div className={style.content}>
        <div className={style.header}>
          <p className={style.title}>Course Content</p>
        </div>
        {course && course.modules.length
          ? course.modules.map((module, index) => (
              <div
                className={style.accordionWrapper}
                onClick={handleExpandAccordion.bind(this, { index, module })}
                key={index}
              >
                <div className={style.accordion}>
                  <p>{module.name}</p>
                  {module.items[0].name && (
                    <div className={style.duration}>
                      <ChevronDown />
                    </div>
                  )}
                </div>
                <div
                  className={`${style.accordionExpand} ${
                    activeAccordion === index ? style.activeAccordion : null
                  }`}
                >
                  {module.items.map((item, index) => (
                    <div className={style.accordionContent}>
                      <p onClick={handleRedirectToResource.bind(this, module, item)}>
                        <Play />
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
      <CarouselModal
        title="Course Preview"
        isOpen={previewModal.isOpen}
        onClose={handleOpenPreviewModal.bind(this, null)}
        arrFiles={course.previewItems}
        initialSlide={previewModal.initialSlide}
        displayCross
      /> */}
    </div>
  ) : (
    <Preloader />
  );
}
