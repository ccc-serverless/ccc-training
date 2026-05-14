import React from "react";
import style from "./ItemCompleteButton.module.scss";

import { useParams } from "react-router-dom";
import { Check } from "react-feather";

import { useMarkItemCompleted } from "../engine/useMarkItemCompleted";
import { useEngine } from "../../Engine";
import clsx from "clsx";

export default function ItemCompleteButton({ theme }) {
  const params = useParams();

  const { state } = useEngine();
  const { allocatedCourse } = state;
  const { upload } = useMarkItemCompleted();

  function handleClick() {
    if (isItemCompleted()) return;
    upload();
  }

  function isItemCompleted() {
    const module = allocatedCourse.modulesWithProgress.find(
      (f) => f.order == parseInt(params.moduleNumber)
    );
    const item = module.items.find((f) => f.slNo == parseInt(params.itemNumber));
    return item.isCompleted;
  }

  return (
    <span className={clsx(style.wrapper, theme === "light" && style.light)}>
      {!isItemCompleted() ? (
        <button onClick={handleClick}>Mark as Completed</button>
      ) : (
        <span>
          Completed <Check color={theme === "light" ? "#6a2c70" : "white"} />
        </span>
      )}
    </span>
  );
}
