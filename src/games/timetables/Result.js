import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { SVG_PATH, ARR_TEXT_POS } from "./helper";
import style from "./Result.module.scss";
import Button from "../shared/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "9999999999999 !important",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "0",
    borderRadius: "5px",
  },
  top: {
    display: "flex",
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.3)",
    padding: "10px 20px",
    color: "#000000",
    alignItems: "center",
  },
  title: {
    fontSize: "2em",
  },
  close: {
    marginLeft: "auto",
    background: "#eeeeee",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "30px",
    fontSize: "1.5em",
  },
}));

const ARR_RES_POS = [
  {
    x: "50%",
    y: "5%",
  },
  { x: "81%", y: "15%" },
  { x: "95%", y: "42%" },
  { x: "92%", y: "68%" },
  { x: "73%", y: "92%" },
  { x: "37%", y: "99%" },
  { x: "5%", y: "88%" },
  { x: "-13%", y: "60%" },
  { x: "-13%", y: "37%" },
  { x: "10%", y: "10%" },
];
const Result = (props) => {
  const classes = useStyles();
  // const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [isTwenty, setIsTwenty] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function genArrText(arrText) {
    return arrText.map((item, i) => {
      return {
        text: item,
        x: ARR_TEXT_POS[i].x,
        y: ARR_TEXT_POS[i].y,
        id: ARR_TEXT_POS[i].id,
      };
    });
  }
  function genArrRes(arrRes) {
    return arrRes.map((item, i) => {
      return {
        text: item,
        x: ARR_RES_POS[i].x,
        y: ARR_RES_POS[i].y,
        id: ARR_RES_POS[i].id,
      };
    });
  }

  
  function handlePlayAgain() {
    props.isGameReset();
  }

  // useEffect(() => {
  //   if (location.pathname === "/game/timetables/twenty") {
  //     setArr([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  //   }
  // }, []);

  useEffect(() => {
    if (props.arrTable.indexOf(20) > -1) setIsTwenty(true);
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.openResult}
        onClose={props.handleCloseResult}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 400,
        }}
        disableBackdropClick={true}
      >
        <Fade in={props.openResult}>
          <div className={classes.paper}>
            <div id="transition-modal-description">
              <div className={classes.top}>
                <div className={classes.title}>Result</div>
                <div onClick={props.handleCloseResult} className={classes.close}>
                  &times;
                </div>
              </div>
              <div className={`${style.modalContent} ${style.rootResultTimetable}`}>
                <div className={style.top}>
                  <div className={style.left}>
                    <h3>Accuracy (%)</h3>
                    <svg
                      width="420"
                      height="423"
                      viewBox="0 0 420 423"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {isTwenty ? (
                        <>
                          {SVG_PATH.map((item, i) => (
                            <path
                              key={item.d}
                              d={item.d}
                              fill={
                                props.selectedTables.indexOf(item.id + 10) === -1
                                  ? "#EEECDA"
                                  : "#f08a5d"
                              }
                            />
                          ))}{" "}
                        </>
                      ) : (
                        <>
                          {SVG_PATH.map((item, i) => (
                            <path
                              key={item.d}
                              d={item.d}
                              fill={
                                props.selectedTables.indexOf(item.id) === -1 ? "#EEECDA" : "#f08a5d"
                              }
                            />
                          ))}
                        </>
                      )}

                      {genArrText(props.arrTable).map((item, i) => (
                        <text key={i} className={style.txt} x={item.x} y={item.y}>
                          {item.text}
                        </text>
                      ))}
                      {isTwenty ? (
                        <>
                          {genArrRes(props.finalResult.accuracy.slice(10, 20)).map((item, i) => (
                            <text key={i} className={style.resTxt} x={item.x} y={item.y}>
                              {item.text !== null ? `${item.text}%` : null}
                            </text>
                          ))}
                        </>
                      ) : (
                        <>
                          {genArrRes(props.finalResult.accuracy.slice(0, 10)).map((item, i) => (
                            <text key={i} className={style.resTxt} x={item.x} y={item.y}>
                              {item.text !== null ? `${item.text}%` : null}
                            </text>
                          ))}
                        </>
                      )}
                    </svg>
                  </div>

                  <div className={style.right}>
                    <h3>Avg Speed per Question (sec)</h3>
                    <svg
                      width="420"
                      height="423"
                      viewBox="0 0 420 423"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {isTwenty ? (
                        <>
                          {SVG_PATH.map((item, i) => (
                            <path
                              key={item.d}
                              d={item.d}
                              fill={
                                props.selectedTables.indexOf(item.id + 10) === -1
                                  ? "#EEECDA"
                                  : "#f08a5d"
                              }
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {SVG_PATH.map((item, i) => (
                            <path
                              key={item.d}
                              d={item.d}
                              fill={
                                props.selectedTables.indexOf(item.id) === -1 ? "#EEECDA" : "#f08a5d"
                              }
                            />
                          ))}
                        </>
                      )}

                      {genArrText(props.arrTable).map((item, i) => (
                        <text key={i} className={style.txt} x={item.x} y={item.y}>
                          {item.text}
                        </text>
                      ))}
                      {isTwenty ? (
                        <>
                          {genArrRes(props.finalResult.avgSpeed.slice(10, 20)).map((item, i) => (
                            <text key={i} className={style.resTxt} x={item.x} y={item.y}>
                              {item.text !== null ? `${item.text}s` : null}
                            </text>
                          ))}
                        </>
                      ) : (
                        <>
                          {genArrRes(props.finalResult.avgSpeed.slice(0, 10)).map((item, i) => (
                            <text key={i} className={style.resTxt} x={item.x} y={item.y}>
                              {item.text !== null ? `${item.text}s` : null}
                            </text>
                          ))}
                        </>
                      )}
                    </svg>
                  </div>
                </div>
                <div className={style.bottom}>
                  <Button
                    title="Play Again"
                    background="purple"
                    onClick={handlePlayAgain}
                    radius="10"
                  />
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Result;
