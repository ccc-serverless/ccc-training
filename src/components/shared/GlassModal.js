import React from "react";
import style from "./GlassModal.module.scss";

import modalImage from "assets/images/entrepreneurs/modalImage.png";

import { FiX } from "react-icons/fi";
export default function GlassModal(props) {
  return (
    props.isVisible && (
      <div className={style.backdrop}>
        <div className={style.container}>
          <div className={style.sidebar}>
            <div className={style.image}>
              <img src={props.data.sidebarImage} alt="" />
            </div>
            <p className={style.sidebarHeading}>{props.data.sidebarHeading}</p>
            {props.data.sidebarSteps && (
              <div className={style.steps}>
                <p className={style.stepsHeading}>Steps</p>
                {props.data.sidebarSteps.map((step, index) => (
                  <p>
                    {index + 1}. {step}
                  </p>
                ))}
              </div>
            )}
            <div className={style.sidebarFooter}>
              <p>{props.data.sidebarFooterText}</p>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.header}>
              <button onClick={props.onClose}>
                <FiX />
              </button>
            </div>
            <div className={style.mainContent}>{props.children}</div>
          </div>
        </div>
      </div>
    )
  );
}
