import React from "react";
import styles from "./Navbar.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import logo from "assets/images/landing/logo.png";

const NAV_LINKS = [
  {
    name: "Home",
    link: "/",
  },
];

export default function Navbar(props) {
  const navigate = useNavigate();

  return (
    <div className={clsx(styles.wrapper, styles.dark)}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <div className={clsx(styles.navigationWrapper, styles.desktopNavigation)}>
          {NAV_LINKS.map((nav) => {
            return (
              <div
                key={nav.name}
                className={styles.nav}
                onClick={() => navigate(nav.link)}
              >
                <p>{nav.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
