import React, { useState } from "react";
import styles from "./Navbar.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import { LogOut } from "react-feather";
import { ClickAwayListener } from "@material-ui/core";

import ProfileContainer from "./ProfileContainer";

import { useCart } from "contexts/AllContexts";
import logodark from "assets/images/logodark.png";

const _NavLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "My Courses",
    link: "/user/courses",
  },
];

export default function NavbarLight(props) {
  const Cart = useCart();
  const navigate = useNavigate();

  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  function handleLogout() {
    Cart.dispatch({ type: "EMPTY_CART" });
    localStorage.clear();
    window.location.href = "/";
  }

  function handleClickAwayMobile(e) {
    if (e.type === "touchend") return;
    setIsMobileDropdownOpen(false);
  }

  return (
    <div className={clsx(styles.wrapper, styles.light)}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src={logodark} alt="logo" />
          <div>
            <span>Campus Corporate Connect</span>
            <span>The most trusted training partner in India</span>
          </div>
        </div>

        <div className={clsx(styles.desktopNavigation, styles.navigationWrapper)}>
          {!props.hideNavLinks && (
            <>
              {_NavLinks.map((nav) => {
                return (
                  <div key={nav.name} className={styles.nav} onClick={() => navigate(nav.link)}>
                    <p>{nav.name}</p>
                  </div>
                );
              })}
            </>
          )}

          <div className={styles.nav} style={{ marginRight: "0 !important" }}>
            {props.hideNavLinks ? (
              <ProfileContainer hideMyAccount={true} color="dark" />
            ) : (
              <ProfileContainer color="dark" />
            )}
          </div>
        </div>

        {/* ---------------------------- Mobile Nav --------------------------------- */}
        <ClickAwayListener onClickAway={handleClickAwayMobile}>
          <div className={clsx(styles.mobileNavigation, styles.navigationWrapper)}>
            <div className={styles.hamburger}>
              <Hamburger toggled={isMobileDropdownOpen} toggle={setIsMobileDropdownOpen} color="#2f2f2f" />
            </div>

            <div className={clsx(styles.dropdown, isMobileDropdownOpen ? styles.open : styles.closed)}>
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
              <div
                key={"My Account"}
                className={styles.nav}
                onClick={() => {
                  setIsMobileDropdownOpen(false);
                  navigate("/user/profile");
                }}
              >
                <p>{"My Account"}</p>
              </div>
              <div onClick={handleLogout} className={styles.nav}>
                Logout <LogOut />
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
}
