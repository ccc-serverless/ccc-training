import React, { useState } from "react";
import styles from "./ModalNewUser.module.scss";

import Modal from "components/shared/Modal";
import Preloader from "components/shared/Preloader";

import { putRequest } from "utils/api";

export default function ModalNewUser(props) {
  const [newUserData, setNewUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleFormChange(e) {
    let data = { ...newUserData };
    data[e.target.name] = e.target.value;
    setNewUserData(data);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let data = { ...newUserData };
    putRequest("/user/profile", data)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

  return !isLoading ? (
    <Modal isOpen={props.isOpen} title="New to Jayaho?">
      <div className={styles.registerWrapper}>
        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" name="name" placeholder="Full Name" />
            </div>
            <div className={styles.formGroup}>
              <label>Class / Course</label>
              <input
                type="text"
                name="currClass"
                placeholder="Which class do you study in?"
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>School / University</label>
              <input
                type="text"
                name="school"
                placeholder="Where do you study?"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Which city do you live in?"
                required
              />
            </div>
          </div>
          <div className={styles.controller}>
            <button>Register</button>
          </div>
        </form>
      </div>
    </Modal>
  ) : (
    <Preloader />
  );
}
