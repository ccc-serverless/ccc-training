import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import GameHeader from "../shared/GameHeader";
import TimeSelector from "./TimerSelector";
import SweetAlert from "react-bootstrap-sweetalert";
import style from "./TimeTableSelection.module.scss";
import { SVG_PATH, ARR_TEXT_POS } from "./helper";

const optionsTimePerQues = [
  { label: "2 sec", value: 2 },
  { label: "4 sec", value: 4 },
  { label: "6 sec", value: 6 },
  { label: "8 sec", value: 8 },
];

const TimeTablesInit = (props) => {
  const [selectedTables, setSelectedTables] = useState([]);
  const [timePerQues, setTimePerQues] = useState(6);
  const [gameTime, setGameTime] = useState(4);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [svgPath, setSvgPath] = useState(SVG_PATH);

  function getCombinedSvgPositionAndText() {
    let arrText = genArrText(props.arrTable);
    return SVG_PATH.map((item) => {
      let textObj = arrText.find((f) => f.id === item.id);
      return { ...item, ...textObj };
    });
  }
  function handleConfirmSweetAlert() {
    setIsOpenAlert(false);
  }

  function handleCancelSweetAlert() {
    setIsOpenAlert(false);
  }

  function handleChangeTimePerQues(e) {
    setTimePerQues(e.value);
  }

  function handleChangeGameTime(e) {
    setGameTime(e.value);
  }
  function handlePlayClick() {
    props.handleTotalGameTime(gameTime);
    props.handleCountdown(timePerQues);
    props.handleSelectedTables(selectedTables);

    if (selectedTables.length) {
      props.handleGameStart(true);
    } else {
      setIsOpenAlert(true);
    }
  }

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

  function handlePieClick(ind) {
    ind = parseInt(ind);
    let newData = [...selectedTables];

    let itemIndex = newData.indexOf(ind);

    if (itemIndex === -1) newData.push(ind);
    else newData.splice(itemIndex, 1);

    newData.sort((a, b) => a - b);

    setSelectedTables(newData);
  }

  useEffect(() => {
    setSvgPath(getCombinedSvgPositionAndText());
  }, []);

  return (
    <div className={style.rootTimeTableSelection}>
      <GameHeader name="Time Tables" />
      {isOpenAlert ? (
        <SweetAlert
          warning
          confirmBtnStyle={{
            background: "#6a2c70",
            color: "white",
            width: "100px",
            textDecoration: "none",
            height: "40px",
            lineHeight: "40px",
            border: "none",
          }}
          title=""
          onConfirm={handleConfirmSweetAlert}
          onCancel={handleCancelSweetAlert}
        >
          Please select atleast one table
        </SweetAlert>
      ) : null}

      <div className={style.subheader}>Select tables you want to practice</div>
      <div className={style.svgContainer}>
        <svg
          className={style.tablesSvg}
          width="400"
          height="423"
          viewBox="0 0 420 423"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {svgPath.map((item) => {
            return (
              <path
                key={item.d}
                d={item.d}
                onClick={handlePieClick.bind(this, item.text)}
                fill={selectedTables.indexOf(parseInt(item.text)) == -1 ? "#EEECDA" : "#f08a5d"}
              />
            );
          })}
          {svgPath.map((item, i) => {
            return (
              <text
                key={i}
                className={
                  selectedTables.indexOf(parseInt(item.text)) == -1
                    ? style.txtBlack
                    : style.txtWhite
                }
                onClick={handlePieClick.bind(this, item.text)}
                x={item.x}
                y={item.y}
              >
                {item.text}
              </text>
            );
          })}
        </svg>

        <div className={style.btnContainer}>
          <div className={style.selectors}>
            <div style={{ marginBottom: "20px" }}>
              <TimeSelector
                title="Time per question"
                option={optionsTimePerQues}
                onChange={handleChangeTimePerQues}
                value={`${timePerQues} sec`}
              />
            </div>
          </div>
          <Button title="PLAY" background="orange" radius="25" onClick={handlePlayClick} />
        </div>
      </div>
    </div>
  );
};

export default TimeTablesInit;
