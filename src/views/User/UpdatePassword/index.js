import React from "react";
import style from "./UpdatePassword.module.scss";

import { ArrowRight, Eye } from "react-feather";

import BackgroundImg from "assets/images/user/password_bg.webp";
import UserIcon from "assets/images/icons/user.png";
import useUpdatePassword from "./useUpdatePassword";

export default function UpdatePassword() {
  const {
    profile,
    errorPassword,
    passwordMatchError,
    typePassword,
    typePasswordConfirm,
    handleClickEye,
    handleFormChange,
    handleFormSubmit,
  } = useUpdatePassword();

  return (
    <div className={style.wrapper}>
      <div className={style.graphic}>
        <img src={BackgroundImg} alt="" />
      </div>
      <div className={style.banner}>
        <p>Profile</p>
      </div>
      <div className={style.card}>
        <div className={style.header}>
          <div className={style.left}>
            <div className={style.image}>
              <img src={UserIcon} alt="" />
            </div>
          </div>
          <div className={style.right}>
            <div>Hello, {profile && profile.name}</div>
            <div>Welcome to Jayaho, the problem solving playground for the future</div>
          </div>
        </div>
        <div className={style.subheader}>
          Please create your new password and remember it !
        </div>
        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
          <div>
            <label>Enter New Password</label>
            <input required name="password" type={typePassword} />
            <Eye onClick={handleClickEye.bind(this, "password")} />
          </div>

          <div>
            <label>Confirm Password</label>
            <input required name="confirm_password" type={typePasswordConfirm} />
            <Eye onClick={handleClickEye.bind(this, "passwordConfirm")} />
          </div>

          {passwordMatchError && <div className={style.error}>Passwords don't match</div>}
          {errorPassword && (
            <div className={style.error}>
              Password has to be between 6 and 15 characters
            </div>
          )}

          <button>
            Go To Courses <ArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
