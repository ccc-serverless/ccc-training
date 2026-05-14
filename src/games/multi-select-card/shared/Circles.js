import React, { useEffect, useState } from "react";
import style from "./Circles.module.scss";

import Circle from "./Circle";

export default function Circles({ runData, question, handleClickOption }) {
  const [arrOptions, setArrOptions] = useState([]);

  function parseOptions() {
    let arrOptions = [];
    for (const key in question.options) {
      arrOptions.push({ key: key, value: question.options[key] });
    }

    /* Random array shuffle (if needed) using  Schwartzian transform */
    if (!question.keepOptionsOrder) {
      arrOptions = arrOptions
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    }

    setArrOptions(arrOptions);
  }

  useEffect(() => {
    parseOptions();
  }, [runData.questionsAsked.length]);

  return arrOptions.length ? (
    <div className={style.wrapper}>
      {[arrOptions[0], arrOptions[1]].map((option) => (
        <Circle
          key={option.key}
          optionKey={option.key}
          value={option.value}
          currResponses={runData.currResponses}
          handleClickOption={handleClickOption}
        />
      ))}

      {[arrOptions[2], arrOptions[3]].map((option) => (
        <Circle
          key={option.key}
          optionKey={option.key}
          value={option.value}
          currResponses={runData.currResponses}
          handleClickOption={handleClickOption}
        />
      ))}
    </div>
  ) : null;
}
