import React, { useEffect } from "react";
import style from "./GameScreen.module.scss";

import { ItemTypes } from "./ItemTypes";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Dustbin from "./Dustbin";
import { Box } from "./Box";
import { ChevronRight } from "react-feather";

import { useGameEngine } from "./engine/GameEngineProvider";
import GameClock from "./shared/GameClock";
import Header from "./Header";

export default function GameScreen() {
  const { state, resetGame } = useGameEngine();
  const { runData, gameState } = state;

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.numbers}>
        {runData.questionsAsked.map((item) => (
          <Box text={item.text} itemType={item.type} />
        ))}
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className={style.dropTargetWrapper}>
          {gameState.isEnd && (
            <div className={style.tryAgainWrapper}>
              <p>Superb! you have answerd all the questions.</p>
              <button onClick={resetGame}>
                Play Again <ChevronRight />
              </button>
            </div>
          )}
          <div className={style.realNosDustbin}>
            <Dustbin
              name="Real Numbers"
              acceptedItemType={ItemTypes.REAL_NUMBERS}
              dropNumbersClassname={style.realNumbersDrop}
              lottieClassname={style.realLottie}
            ></Dustbin>
          </div>
          <div className={style.rationalNosDustbin}>
            <Dustbin
              name="Rational Numbers"
              acceptedItemType={ItemTypes.RATIONAL_NUMBERS}
              headingClassname={style.rationalNumbersHeading}
              dropNumbersClassname={style.rationalNumbersDrop}
              lottieClassname={style.rationalLottie}
            ></Dustbin>
          </div>
          <div className={style.integersDustbin}>
            <Dustbin
              name="Integers"
              acceptedItemType={ItemTypes.INTEGERS}
              headingClassname={style.integersHeading}
              dropNumbersClassname={style.integersDrop}
              lottieClassname={style.integerLottie}
            ></Dustbin>
          </div>
          <div className={style.wholeNosDustbin}>
            <Dustbin
              name="Whole Numbers"
              acceptedItemType={ItemTypes.WHOLE_NUMBERS}
              headingClassname={style.wholeNumberHeading}
              dropNumbersClassname={style.wholeNumbersDrop}
              lottieClassname={style.wholeLottie}
            ></Dustbin>
          </div>
          <div className={style.naturalNosDustbin}>
            <Dustbin
              name="Natural Numbers"
              acceptedItemType={ItemTypes.NATURAL_NUMBERS}
              headingClassname={style.naturalNumberHeading}
              dropNumbersClassname={style.naturalNumberDrop}
              lottieClassname={style.naturalLottie}
            ></Dustbin>
          </div>
          <div className={style.irrationalNosDustbin}>
            <Dustbin
              name="Irrational Numbers"
              acceptedItemType={ItemTypes.IRRATIONAL_NUMBERS}
              headingClassname={style.irrationalNumberHeading}
              dropNumbersClassname={style.irrationalNumberDrop}
            ></Dustbin>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}
