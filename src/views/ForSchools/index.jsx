//Core Imports
import React, { useState } from "react";
import styles from "./index.module.scss";

//Assets Imports
import plane from "assets/images/school/plane.png";
import floatingRight from "assets/images/landing/collegeRight.png";
import floatingLeft from "assets/images/landing/schoolLeft.png";
import fundamentals from "assets/images/landing/codingFundamental.svg";
import maths from "assets/images/landing/mathsLogical.svg";
import competitive from "assets/images/landing/competitiveCoding.svg";
import school1 from "assets/images/school/school1.jpeg";
import school2 from "assets/images/school/school2.jpeg";

import Modal from "components/shared/Modal";
import ModalLogin from "views/layout/Navbar/ModalLogin";
import BundlesContainer from "components/shared/BundlesContainer";
import { postRequest } from "utils/api";

import { useUser } from "contexts/AllContexts";

export default function School() {
  const [formData, setFormdata] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const User = useUser();

  function handleModalOpen() {
    setIsLoginModalOpen((prev) => !prev);
  }

  function handleToggleLoginModal(e) {
    User.openLoginModal();
    e.preventDefault();
    handleModalOpen();
  }

  function handleChangeSchoolLogin(e) {
    let temp = { ...formData };
    temp[e.target.name] = e.target.value;
    setFormdata(temp);
  }

  function handleSubmitSchoolLogin(e) {
    e.preventDefault();
    postRequest("/auth/login/business/student", formData)
      .then((resp) => {
        // console.log(resp);
      })
      .catch((err) => console.log(err))
      .finally(() => handleModalOpen());
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.container}>
          <div className={styles.text}>
            <p>
              Accelerate your Problem Solving Abilities & Algorithmic Thinking Skills with
              Jayaho
            </p>
            <p>
              Jayaho accelerates your Problem Solving Ability and Algorithmic Thinking
              Skills to make every Kid a Next Generation Leader.
            </p>
            <form className={styles.desktopForm} onSubmit={handleToggleLoginModal}>
              {/* <label>Click here to </label> */}
              <div className={styles.formGroup}>
                {/* <input
                  type="text"
                  name="username"
                  placeholder="Jayaho registered email"
                  onChange={(e) => {
                    let data = { ...formData };
                    data[e.target.name] = e.target.value;
                    setFormdata(data);
                  }}
                  required
                /> */}
                <button>Log In</button>
              </div>
            </form>
          </div>
          <div className={styles.image}>
            <img src={plane} alt="" />
          </div>
          <form className={styles.mobileForm} onSubmit={handleToggleLoginModal}>
            <label>Enter your registered email to get started</label>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="username"
                placeholder="Jayaho registered username"
                onChange={(e) => {
                  let data = { ...formData };
                  data[e.target.name] = e.target.value;
                  setFormdata(data);
                }}
                required
              />
              <button>Log In</button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.benefitsWrapper}>
        <p className={styles.heading}>
          Benefits for Students <span></span>
        </p>
        <img className={styles.floatingLeft} src={floatingLeft} alt="" />
        <img className={styles.floatingRight} src={floatingRight} alt="" />
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <img src={maths} alt="" />
            <p>Build strong maths & logical skills</p>
            <p>
              We offer tailored action plan based on your current preparation and goals.
            </p>
          </div>
          <div className={styles.benefit}>
            <img src={fundamentals} alt="" />
            <p>Coding Fundamentals</p>
            <p>
              We offer tailored action plan based on your current preparation and goals.
            </p>
          </div>
          <div className={styles.benefit}>
            <img src={competitive} alt="" />
            <p>Competitive Coding & Competitions</p>
            <p>
              We offer tailored action plan based on your current preparation and goals.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.homecampWrapper}>
        <p className={styles.heading}>
          Our Courses Preview <span></span>
        </p>
        <p className={styles.desc}>
          Experience game based learning modules. Go Faster & Better on problem solving
          capabilties with Jayaho
        </p>
      </div>

      <BundlesContainer options={{ allowSwipe: true, showHeadingSlide: true }} />

      <div className={styles.schoolsWrapper}>
        <p className={styles.heading}>
          Schools associated with Jayaho <span></span>
        </p>
        <p className={styles.desc}>More than 10+ schools trusts Jayaho</p>
        <div className={styles.schools}>
          <div className={styles.school}>
            <img src={school1} alt="" />
          </div>
          <div className={styles.school}>
            <img src={school2} alt="" />
          </div>
        </div>
      </div>

      {/* <div className={styles.prefooter}>
        <form onSubmit={handleToggleLoginModal}>
          <label>Enter your registered email to get started</label>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Jayaho registered email"
              onChange={(e) => {
                let data = { ...formData };
                data[e.target.name] = e.target.value;
                setFormdata(data);
              }}
              required
            />
            <button>Log In</button>
          </div>
        </form>
      </div> */}

      {/* <ModalLogin /> */}

      {/* <Modal
        title="Login to Jayaho For Schools"
        isOpen={isLoginModalOpen}
        onClose={handleModalOpen}
        displayCross
      >
        <div className={styles.schoolLogin}>
          <form onChange={handleChangeSchoolLogin} onSubmit={handleSubmitSchoolLogin}>
            <label>Registered Email ID</label>
            <input
              type="text"
              name="username"
              defaultValue={formData.username ? formData.username : null}
              required
            />
            <label>Password</label>
            <input type="password" name="password" />
            <button>Log In</button>
          </form>
        </div>
      </Modal> */}
    </div>
  );
}
