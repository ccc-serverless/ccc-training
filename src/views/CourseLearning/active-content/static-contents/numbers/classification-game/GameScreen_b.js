import React, { useEffect } from "react";
import style from "./GameScreen.module.scss";

import { ItemTypes } from "./ItemTypes";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Dustbin from "./Dustbin";
import { Box } from "./Box";

import { useGameEngine } from "./engine/GameEngineProvider";
import GameClock from "./shared/GameClock";
import Header from "./Header";

export default function GameScreen() {
  const { state, dispatch } = useGameEngine();
  const { runData } = state;

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
          <div className={style.realNosDustbin}>
            <Dustbin
              name="Real Numbers"
              acceptedItemType={ItemTypes.REAL_NUMBERS}
              dropNumbersClassname={style.realNumbersDrop}
              lottieClassname={style.realLottie}
            >
              <div className={style.rationalNosDustbin}>
                <Dustbin
                  name="Rational Numbers"
                  acceptedItemType={ItemTypes.RATIONAL_NUMBERS}
                  headingClassname={style.rationalNumbersHeading}
                  dropNumbersClassname={style.rationalNumbersDrop}
                  lottieClassname={style.rationalLottie}
                >
                  <div className={style.integersDustbin}>
                    <Dustbin
                      name="Integers"
                      acceptedItemType={ItemTypes.INTEGERS}
                      headingClassname={style.integersHeading}
                      dropNumbersClassname={style.integersDrop}
                      lottieClassname={style.integerLottie}
                    >
                      <div className={style.wholeNosDustbin}>
                        <Dustbin
                          name="Whole Numbers"
                          acceptedItemType={ItemTypes.WHOLE_NUMBERS}
                          headingClassname={style.wholeNumberHeading}
                          dropNumbersClassname={style.wholeNumbersDrop}
                          lottieClassname={style.wholeLottie}
                        >
                          <div className={style.naturalNosDustbin}>
                            <Dustbin
                              name="Natural Numbers"
                              acceptedItemType={ItemTypes.NATURAL_NUMBERS}
                              headingClassname={style.naturalNumberHeading}
                              dropNumbersClassname={style.naturalNumberDrop}
                              lottieClassname={style.naturalLottie}
                            ></Dustbin>
                          </div>
                        </Dustbin>
                      </div>
                    </Dustbin>
                  </div>
                </Dustbin>
              </div>
              <div className={style.irrationalNosDustbin}>
                <Dustbin
                  name="Irrational Numbers"
                  acceptedItemType={ItemTypes.IRRATIONAL_NUMBERS}
                  headingClassname={style.irrationalNumberHeading}
                  dropNumbersClassname={style.irrationalNumberDrop}

                ></Dustbin>
              </div>
            </Dustbin>
          </div>
        </div>
      </DndProvider>
    </div>
  );
}
