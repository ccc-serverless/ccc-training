import React, { Suspense } from "react";
import style from "./Result.module.scss";

import Modal from "../../components/shared/Modal";
import ReactSpeedometer from "../helpers/lazy-loading-components/Lazy-Speedometer";
import InlineLoader from "../shared/Inline-Loader";

export default function Result({ state, dispatch }) {
  const screenSize = window.innerWidth;
  function handleOpenModalResult() {
    dispatch({
      type: "SET_SCREEN_STATE",
      payload: { isOpenModalResult: !state.screen.isOpenModalResult },
    });
  }

  return (
    <Modal
      title="Result"
      isOpen={state.screen.isOpenModalResult}
      onClose={handleOpenModalResult}
      displayCross={true}
    >
      <div className={style.speedometersContainer}>
        <div className={style.speedometerContainer}>
          <div
            className={style.speedometerTitle}
            style={{ color: "#6a2c70", fontWeight: "500" }}
          >{`${state.result.speed} secs`}</div>
          <Suspense fallback={<InlineLoader />}>
            <ReactSpeedometer
              ringWidth={screenSize <= 700 ? 15 : 20}
              needleHeightRatio={screenSize <= 700 ? 0.6 : 0.8}
              width={200}
              height={130}
              maxSegmentLabels={0}
              segments={1}
              maxValue={state.gameSettings.maxTimePerQuestion}
              minValue={0}
              value={
                state.result.speed > state.gameSettings.maxTimePerQuestion
                  ? state.gameSettings.maxTimePerQuestion
                  : state.result.speed
              }
              needleColor="#f08a5d"
              startColor={"#6a2c70"}
              endColor={"#6a2c70"}
            />
          </Suspense>

          <div
            className={style.speedometerTitle}
            style={{
              color: "#6a2c70",
              fontWeight: "500",
              marginTop: "-10px",
            }}
          >
            Avg speed
          </div>
        </div>

        <div className={style.speedometerContainer}>
          <div
            className={style.speedometerTitle}
            style={{ color: "#6a2c70", fontWeight: "500" }}
          >{`${state.result.accuracy}%`}</div>
          <Suspense fallback={<InlineLoader />}>
            <ReactSpeedometer
              ringWidth={screenSize <= 700 ? 15 : 20}
              needleHeightRatio={screenSize <= 700 ? 0.6 : 0.8}
              width={200}
              height={130}
              maxSegmentLabels={0}
              segments={1}
              maxValue={100}
              minValue={0}
              value={state.result.accuracy}
              needleColor="#f08a5d"
              startColor={"#6a2c70"}
              endColor={"#6a2c70"}
            />
          </Suspense>

          <div
            className={style.speedometerTitle}
            style={{
              color: "#6a2c70",
              fontWeight: "500",
              marginTop: "-10px",
            }}
          >
            Accuracy
          </div>
        </div>
      </div>
    </Modal>
  );
}
