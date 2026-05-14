import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import style from "./GameTimeSelectors.module.scss";

const gameTime = [
  { value: 15, label: "15" },
  { value: 25, label: "25" },
  { value: 35, label: "35" },
];
const quesTime = [
  { value: 5, label: "5 sec" },
  { value: 6, label: "6 sec" },
  { value: 8, label: "8 sec" },
];
const defaultGameTime = gameTime[0];
const defaultQuesTime = quesTime[0];

export default function GameTimeSelectors(props) {
  function handleChangeMaxQues(e) {
    props.handleChangeMaxQues(e.value);
  }

  function handleChangeQuesTime(e) {
    props.handleChangeQuesTime(e.value);
  }

  return (
    <div className={style.dropdownWrapper}>
      <div className={style.dropdown}>
        <p>Number of questions</p>
        <Dropdown
          controlClassName={style.control}
          options={gameTime}
          value={defaultGameTime}
          placeholder="Select an option"
          onChange={handleChangeMaxQues}
        />
      </div>
      <div className={style.dropdown}>
        <p>Time per question</p>
        <Dropdown
          controlClassName={style.control}
          options={quesTime}
          value={defaultQuesTime}
          onChange={handleChangeQuesTime}
          placeholder="Select an option"
        />
      </div>
    </div>
  );
}
