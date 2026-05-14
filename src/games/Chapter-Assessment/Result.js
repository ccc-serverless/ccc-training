import React, { Suspense } from "react";
import style from "./Result.module.scss";

import Modal from "../shared/Modal";
import ReactSpeedometer from "../shared/Lazy-Speedometer";
import InlineLoader from "../shared/Inline-Loader";

export default function Result({ result, isOpen, handleClose, handleGameReset }) {
  const screenSize = window.innerWidth;

  return (
    <Modal
      title="Result"
      isOpen={true}
      open={true}
      onClose={handleClose}
      displayCross={true}
    >
      <div className={style.speedometersContainer}>
        <div className={style.speedometerContainer}>
          {result.speed !== null && result.speed !== undefined ? (
            <>
              <div
                className={style.speedometerTitle}
                style={{ color: "#6a2c70", fontWeight: "500" }}
              >
                {`${result.speed} secs`}
              </div>

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
                  value={result.speed}
                  needleColor="#f08a5d"
                  startColor={"#6a2c70"}
                  endColor={"#6a2c70"}
                />
              </Suspense>
            </>
          ) : null}

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
          {result.accuracy !== null && result.accuracy !== undefined ? (
            <>
              <div
                className={style.speedometerTitle}
                style={{ color: "#6a2c70", fontWeight: "500" }}
              >
                {`${result.accuracy}%`}
              </div>
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
                  value={result.accuracy}
                  needleColor="#f08a5d"
                  startColor={"#6a2c70"}
                  endColor={"#6a2c70"}
                />
              </Suspense>
            </>
          ) : null}

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
