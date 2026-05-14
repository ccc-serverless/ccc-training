import React, { useEffect, useState } from "react";
import style from "./Circle.module.scss";

import clsx from "clsx";
import ReactHtmlParser from "react-html-parser";

export default function Circle({ currResponses, optionKey, value, handleClickOption }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleIsSelected() {
    const isFound = currResponses.find((f) => f.value === value);
    if (isFound) setIsSelected(true);
    else setIsSelected(false);
  }

  useEffect(() => {
    handleIsSelected();
  }, [currResponses]);

  return (
    <div
      className={clsx(style.wrapper, isSelected && style.selected)}
      onClick={handleClickOption.bind(this, { key: optionKey, value })}
    >
      {ReactHtmlParser(value)}
    </div>
  );
}
