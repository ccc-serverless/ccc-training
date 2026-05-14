import React from "react";
import styles from "./Navbar.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";

import ProfileContainer from "./ProfileContainer";
import useAppStore from "stores/AppStore";

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

export default function NavbarLight() {
  const navigate = useNavigate();

  const [toggleLearningSidebar, isLearninSidebarOpen] = useAppStore((state) => [
    state.toggleLearningSidebar,
    state.isLearninSidebarOpen,
  ]);

  return (
    <div className={clsx(styles.wrapper, styles.light, styles.lms)}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src={logodark} alt="logo" />
        </div>
        <div className={styles.navigationWrapper}>
          <div className={styles.hamburgerLms}>
            <Hamburger
              toggled={isLearninSidebarOpen}
              onToggle={toggleLearningSidebar}
              color="#2f2f2f"
            />
          </div>
          <div className={clsx(styles.desktopNavigation, styles.navigationWrapper)}>
            {_NavLinks.map((nav) => (
              <div
                key={nav.name}
                className={styles.nav}
                onClick={() => navigate(nav.link)}
              >
                <p>{nav.name}</p>
              </div>
            ))}

            <div className={styles.nav}>
              <ProfileContainer color="dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
