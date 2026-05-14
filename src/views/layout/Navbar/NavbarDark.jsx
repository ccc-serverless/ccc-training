import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";

import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import { ClickAwayListener } from "@material-ui/core";

// import CartContainer from "./CartContainer";
import ModalLogin from "./ModalLogin";

import { useCart, useUser } from "contexts/AllContexts";
import useWindowDimensions from "utils/hooks/useWindowDimensions";
import { useScrollPosition } from "utils/hooks/useScrollPosition";

import logo from "assets/images/landing/logo.png";
import logoDark from "assets/images/logodark.png";

const _NavLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Challenges",
    link: "/contests",
  },
];

export default function NavbarDark() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [invertNavbar, setInvertNavbar] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const Cart = useCart();
  const User = useUser();
  const { width } = useWindowDimensions();

  useScrollPosition(
    ({ prevPos, currPos }) => {
      let route = location.pathname.split("/")[1];

      if (
        route !== "home" &&
        route !== "schools" &&
        route !== "entrepreneurs" &&
        route !== "courses" &&
        route !== "compete" &&
        route !== ""
      ) {
        setIsTransparent(false);
        return;
      }

      if (width <= 700) {
        if (currPos.y < -100) setIsTransparent(false);
        else setIsTransparent(true);

        if (route === "schools" && currPos.y > -100) {
          setInvertNavbar(true);
        } else setInvertNavbar(false);
      } else {
        if (currPos.y < -150) setIsTransparent(false);
        else setIsTransparent(true);

        if (route === "schools" && currPos.y > -150) {
          setInvertNavbar(true);
        } else setInvertNavbar(false);
      }
    },
    [isTransparent, location]
  );

  function handleLoginModal() {
    User.dispatch({
      type: "SET_LOGIN_MODAL",
      payload: { isOpen: !User.state.isOpenLoginModal },
    });
  }

  function handlePayment() {
    setIsOpenLoginModal(true);
    Cart.dispatch({ type: "HIDE_CART" });
  }

  function handleClickAwayMobile(e) {
    if (e.type === "touchend") return;
    setIsMobileDropdownOpen(false);
  }

  function openHome() {
    if (location.pathname === "/home") {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      navigate("/");
    }
  }

  useEffect(() => {
    let route = location.pathname.split("/")[1];
    if (
      route !== "home" &&
      route !== "schools" &&
      route !== "entrepreneurs" &&
      route !== "courses" &&
      route !== "compete" &&
      route !== ""
    ) {
      setIsTransparent(false);
    } else setIsTransparent(true);

    if (route === "schools") {
      setInvertNavbar(true);
    } else setInvertNavbar(false);

    setActiveRoute(`/${route}`);
  }, [location]);

  return (
    <div
      className={clsx(styles.wrapper, styles.dark, isTransparent && styles.transparent)}
    >
      <div className={styles.container}>
        <div className={styles.logo} onClick={openHome}>
          <img src={invertNavbar ? logoDark : logo} alt="logo" />
          <div>
            <span>Campus Corporate Connect</span>
            <span>The most trusted training partner in India</span>
          </div>
        </div>
        <div className={clsx(styles.desktopNavigation, styles.navigationWrapper)}>
          {_NavLinks.map((nav) => (
            <div key={nav.name} className={styles.nav} onClick={() => navigate(nav.link)}>
              <p className={clsx(invertNavbar && styles.invertColor)}>{nav.name}</p>
              <span
                className={` ${styles.indicator} ${
                  activeRoute == nav.link ? styles.activeRoute : null
                }`}
                style={
                  invertNavbar
                    ? { backgroundColor: "#6a2c70" }
                    : { backgroundColor: "#ffffff" }
                }
              ></span>
            </div>
          ))}

          {/* <div className={styles.nav} style={{ marginRight: "0 !important" }}>
            <CartContainer
              color={invertNavbar ? "invert" : "light"}
              handlePayment={handlePayment}
            />
          </div> */}

          <div className={styles.nav}>
            <button
              className={clsx(styles.login, invertNavbar && styles.invertButton)}
              onClick={handleLoginModal}
            >
              Log In / Sign Up
            </button>
          </div>
        </div>

        {/* -------------------------------------- MOBILE NAVBAR --------------------------------------------------------*/}
        <ClickAwayListener onClickAway={handleClickAwayMobile}>
          <div className={clsx(styles.mobileNavigation, styles.navigationWrapper)}>
            {/* <div className={styles.cartWrapper}>
              <CartContainer
                color={invertNavbar ? "dark" : "light"}
                handlePayment={handlePayment}
              />
            </div> */}
            <div className={styles.hamburger}>
              <Hamburger
                toggled={isMobileDropdownOpen}
                toggle={setIsMobileDropdownOpen}
                color={invertNavbar ? "#6a2c70" : "#ffffff"}
              />
            </div>
            <div
              className={clsx(
                styles.dropdown,
                isMobileDropdownOpen ? styles.open : styles.closed
              )}
            >
              {_NavLinks.map((nav) => {
                return (
                  <div
                    key={nav.name}
                    className={styles.nav}
                    onClick={() => {
                      setIsMobileDropdownOpen(false);
                      navigate(nav.link);
                    }}
                  >
                    <p>{nav.name}</p>
                  </div>
                );
              })}
              <div className={styles.nav}>
                <button className={styles.login} onClick={handleLoginModal}>
                  Log In / Sign Up
                </button>
              </div>
            </div>
          </div>
        </ClickAwayListener>

        {/* <ModalNewUser isOpen={isNewUser} />
         */}
        <ModalLogin
          isOpen={User.state.isOpenLoginModal}
          onClose={handleLoginModal}
          isOpenLoginModal={isOpenLoginModal}
          setIsNewUser={setIsNewUser}
        />
      </div>
    </div>
  );
}
