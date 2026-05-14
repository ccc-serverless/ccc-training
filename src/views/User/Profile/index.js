import React from "react";
import styles from "./Profile.module.scss";

import Preloader from "components/shared/Preloader";

import config from "config/config.js";
import userImage from "assets/images/icons/user.png";
import { useUser } from "contexts/AllContexts";

export default function Profile() {
  const User = useUser();

  return (
    <>
      {User.state.isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.banner}>
            <p>Profile</p>
          </div>
          <div className={styles.profileWrapper}>
            <div className={styles.profile}>
              <div className={styles.userWrapper}>
                <div className={styles.userImage}>
                  <img
                    src={
                      User.state.profile.profileImage
                        ? `${config.apiBaseUrl}/${User.state.profile.profileImage}`
                        : userImage
                    }
                    alt=""
                  />
                </div>
                <p>{User.state.profile.name}</p>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.info}>
                  <p>Class / Course</p>
                  <p>{User.state.profile.currClass}</p>
                </div>
                <div className={styles.info}>
                  <p>School / University</p>
                  <p>{User.state.profile.school}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
