import React, { useState, useEffect } from "react";
import style from "./Dustbin.module.scss";

import { useDrop } from "react-dnd";

import { useGameEngine } from "./engine/GameEngineProvider";
import clsx from "clsx";

import lottieJson from "assets/lottie/classify.json";

import Lottie from "react-lottie-player";

export default function Dustbin({
  name,
  children,
  acceptedItemType,
  headingClassname,
  dropNumbersClassname,
  lottieClassname,
}) {
  const { state, dispatch, handleCorrectAnswer } = useGameEngine();
  const { gameState } = state;

  const [dropppedNumber, setDroppedNumber] = useState([]);

  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: acceptedItemType,
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        handleCorrectAnswer();
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        setDroppedNumber((prev) => [...prev, item.text]);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild, state.runData]
  );

  if (isOverCurrent || isOver) {
    // backgroundColor = "darkgreen";
  }

  useEffect(() => {
    setDroppedNumber([]);
  }, [gameState.isEnd]);

  return (
    <div ref={drop} className={style.wrapper}>
      <p className={clsx(style.dustbinName, headingClassname)}>{name}</p>
      {/* {hasDropped && <span>dropped {hasDroppedOnChild && " on child"}</span>} */}
      <div className={dropNumbersClassname}>
        {dropppedNumber.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      {hasDropped && (
        <div className={clsx(style.lottieWrapper, lottieClassname)}>
          <Lottie loop={false} play={hasDropped} animationData={lottieJson} />
        </div>
      )}
      <div className={style.children}>{children}</div>
    </div>
  );
}
