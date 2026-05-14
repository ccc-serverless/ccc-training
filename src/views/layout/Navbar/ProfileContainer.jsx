import React, { useState } from "react";
import styles from "./ProfileContainer.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import { User as UserIcon, ChevronDown, ChevronRight, LogOut } from "react-feather";

import config from "config/config.js";
import { useUser } from "contexts/AllContexts";

export default function ProfileContainer(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  const User = useUser();
  const navigate = useNavigate();

  return (
    <div
      className={clsx(styles.wrapper, styles[props.color])}
      onClick={() => setIsOpen(true)}
    >
      <div className={styles.top}>
        <span
          className={styles.image}
          style={
            !User.state.profile.profileImage ? { border: "1px solid #979797" } : null
          }
        >
          {User.state.profile.profileImage ? (
            <img
              src={`${config.apiBaseUrl}/${User.state.profile.profileImage}`}
              alt="profile"
            />
          ) : (
            <UserIcon />
          )}
        </span>
        <span className={styles.name}>
          {User.state.profile.name} {isOpen ? <ChevronDown /> : <ChevronRight />}
        </span>
      </div>

      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <div className={styles.dropdownWrapper}>
            {!props.hideMyAccount && (
              <div
                className={styles.menu}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  navigate("/user/profile");
                }}
              >
                <UserIcon />
                <p>My Account</p>
              </div>
            )}

            <div onClick={handleLogout} className={styles.menu}>
              <LogOut />
              <p>Logout</p>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
