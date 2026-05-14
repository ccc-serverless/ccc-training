import React from "react";
import style from "./CourseCard.module.scss";
import { Grow } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useCart, useUser } from "contexts/AllContexts";
import { postRequest } from "utils/api";
import Tooltip from "@material-ui/core/Tooltip";

import { Lock } from "react-feather";

function isLoggedIn() {
  return "authToken" in localStorage;
}

export default function CourseCard({ course, bundle, isStaticCards }) {
  const navigate = useNavigate();
  const Cart = useCart();
  const User = useUser();

  function handleAddToCart(course, status, e) {
    e.stopPropagation();
    if (status === "Add To Cart") {
      Cart.dispatch({ type: "ADD_ITEM", payload: course });
      Cart.dispatch({ type: "SHOW_CART" });
    } else if (status === "Start") {
      postRequest("/user/course/start", {
        course: course._id,
      })
        .then((res) => {
          User.refreshUserData();
          let url = `/course/learn/${res.data.newId}/1/1`;
          navigate(url);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    } else if (status === "Continue") {
      let activeCourse = User.state.activeCourses.find(
        (item) => item.course === course._id
      );
      let url = `/course/learn/${activeCourse._id}/1/1`;
      navigate(url);
    }
  }

  function getBtnTextCard(id) {
    if (isLoggedIn()) {
      if (Cart.isExistInCart(id)) return "Added to Cart";
      if (User.state.profile.courses.notStarted.indexOf(id) !== -1) return "Start";
      if (User.state.profile.courses.active.indexOf(id) !== -1) return "Continue";
      if (User.state.profile.courses.completed.indexOf(id) !== -1) return "Competed";
      return "Add To Cart";
    }

    if (!Cart.isExistInCart(id)) {
      return "Add To Cart";
    } else {
      return "Added To Cart";
    }
  }

  function getTooltipText(course) {
    if (course.status === 0) {
      return `Course is locked`;
    } else {
      return "";
    }
  }

  return (
    <Grow in={true}>
      <Tooltip
        title={getTooltipText(course)}
        // disableHoverListener={course.status}
        // disableFocusListener={course.status}
        // disableTouchListener={course.status}
        placement="bottom-end"
        PopperProps={{ disablePortal: true }}
      >
        <div
          className={clsx(
            style.wrapper,
            isStaticCards && style.staticCard,
            !course.status && style.noPointer
          )}
          key={course._id}
          onClick={() => {
            if (course.status) {
              navigate(`/info/course/${course._id}`);
            }
          }}
        >
          <div
            className={`${style.cardImage} ${
              !course.img_url ? style.disabledCard : null
            }`}
          >
            {course.img_url ? <img src={course.img_url} alt="" /> : null}
          </div>
          <div className={style.cardTitle}>
            <p>{course.name}</p>
            <p>{course.hours} Hours</p>
          </div>
          <div className={style.cardFooter}>
            {!isStaticCards && (
              <div className={style.price}>
                <p>
                  $ {course.price}
                  {course.status !== 0 ? <span>{course.cutPrice}</span> : null}
                </p>
              </div>
            )}
            {isStaticCards ? (
              <div className={style.controller}>
                <button
                  onClick={() => {
                    if (course.status) {
                      navigate(`/info/course/${course._id}`);
                    }
                  }}
                  className={clsx(style.staticButton, !course.status && style.noPointer)}
                  style={{
                    color: bundle.colorTheme,
                    borderColor: bundle.colorTheme,
                    width: course.status === 0 ? "70%" : null,
                  }}
                >
                  {course.status === 0 ? "Know More" : "Know More"}
                </button>
                {course.status === 0 ? (
                  <div
                    className={style.locked}
                    style={{ borderColor: bundle.colorTheme, color: bundle.colorTheme }}
                  >
                    <Lock />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className={style.controller}>
                <button
                  onClick={() => {
                    if (course.status) {
                      navigate(`/info/course/${course._id}`);
                    }
                  }}
                  className={clsx(!course.status && style.noPointer)}
                  style={{
                    backgroundColor: bundle.colorTheme,
                    width: course.status === 0 ? "70%" : null,
                  }}
                >
                  {course.status === 0 ? "Know More" : "Know More"}
                </button>
                {course.status === 0 ? (
                  <div
                    className={style.locked}
                    style={{ borderColor: bundle.colorTheme, color: bundle.colorTheme }}
                  >
                    <Lock />
                  </div>
                ) : null}
                <button
                  onClick={handleAddToCart.bind(this, course, getBtnTextCard(course._id))}
                  className={clsx(
                    "openCart",
                    !course.status && style.hidden,
                    Cart.isExistInCart(course._id) === -1 && style.inCart
                  )}
                >
                  {getBtnTextCard(course._id)}
                </button>
              </div>
            )}
          </div>
        </div>
      </Tooltip>
    </Grow>
  );
}
