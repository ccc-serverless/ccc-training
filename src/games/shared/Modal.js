import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./Modal.module.scss";

const ModalStructure = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if ("authToken" in localStorage) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Modal
      className={styles.modal}
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 400,
      }}
      disableBackdropClick={true}
    >
      <Fade in={props.open}>
        <div className={`${styles.paper} ${props.paper}`}>
          <div id="transition-modal-description">
            <div className={styles.top}>
              {props.title ? (
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>{props.title}</div>
                  {props.subTitle ? <div className={styles.subTitle}>{props.subTitle}</div> : null}
                </div>
              ) : null}
              {isLoggedIn || props.showClose ? (
                <div onClick={props.onClose} className={styles.close}>
                  &times;
                </div>
              ) : null}
            </div>
            <div className={styles.modalContent}>{props.children}</div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalStructure;
