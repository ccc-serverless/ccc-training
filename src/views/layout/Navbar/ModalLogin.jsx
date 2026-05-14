import React, { useState } from "react";
import styles from "./ModalLogin.module.scss";

import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode";
import clsx from "clsx";

import Modal from "components/shared/Modal";
import Preloader from "components/shared/Preloader";
import InlinePulseLoader from "components/shared/InlinePulseLoader";

import config from "config/config.js";
import { postRequest } from "utils/api";
import googleImage from "assets/images/icons/google.png";
import { Eye, EyeOff } from "react-feather";

export default function ModalLogin(props) {
  const [loadingGoogle, setLoadingGoogle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formdata, setFormdata] = useState({});

  const [isPassVisible, setIsPassVisible] = useState(false);

  function togglePassVisiblity() {
    setIsPassVisible((prev) => !prev);
  }

  function handleGoogleSuccess(response) {
    setIsLoading(true);
    postRequest("/auth/login/google", { token: response.tokenId })
      .then((res) => {
        let decoded = jwt_decode(res.data.token);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("exp", decoded.exp);
        if (res.data.isNew) {
          props.setIsNewUser(true);
          props.onClose();
          setIsLoading(false);
          window.location.href = "/user/reset-pass";
        } else window.location.href = "/user/courses";
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

  // function handleGoogleFailure(res) {
  //   console.log(res);
  // }

  function handleLoginFormChange(e) {
    setError(false);
    let data = { ...formdata };
    data[e.target.name] = e.target.value;
    setFormdata(data);
  }

  function handleLoginFormSubmit(e) {
    e.preventDefault();
    let data = {
      username: formdata.username,
      password: formdata.password,
    };
    postRequest(`/auth/login`, data)
      .then((resp) => {
        let decoded = jwt_decode(resp.data.token);
        localStorage.setItem("authToken", resp.data.token);
        localStorage.setItem("exp", decoded.exp);
        if (resp.data.isNew) {
          props.setIsNewUser(true);
          props.onClose();
          setIsLoading(false);
          window.location.href = "/user/reset-pass";
        } else window.location.href = "/user/courses";
      })
      .catch((err) => {
        setError(true);
      });
  }

  return !isLoading ? (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Log In / Sign Up"
      displayCross
    >
      <div className={styles.tncModal}>
        <div className={styles.loginForm}>
          <form
            onChange={handleLoginFormChange}
            onSubmit={handleLoginFormSubmit}
          >
            <label>Username</label>
            <input
              required
              type="text"
              name="username"
              defaultValue={props.username}
            />
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                required
                type={!isPassVisible ? "password" : "text"}
                name="password"
              />
              <button type="button" onClick={togglePassVisiblity}>
                {!isPassVisible ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <button>Login</button>
            <p className={clsx(styles.error, error && styles.showError)}>
              Invalid credentials, try again
            </p>
          </form>
        </div>
        {/* <p className={styles.or}>OR</p>
        <GoogleLogin
          clientId={config.googleClientId}
          buttonText="Continue with Google"
          cookiePolicy={"single_host_origin"}
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          onAutoLoadFinished={() => {
            setLoadingGoogle(false);
          }}
          render={(renderProps) =>
            !loadingGoogle ? (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={styles.google}
              >
                <img src={googleImage} alt="googleLogo" />
                Continue with Google
              </button>
            ) : (
              <InlinePulseLoader />
            )
          }
        /> */}
        <p>
          By continuing you agree to our
          <span onClick={() => window.open("/terms-and-conditions")}>
            {" "}
            Terms and Conditions
          </span>
        </p>
      </div>
    </Modal>
  ) : (
    <Preloader />
  );
}
