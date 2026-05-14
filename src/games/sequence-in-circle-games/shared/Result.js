import React, { Suspense } from "react";
import style from "./Result.module.scss";

import Modal from "games/shared/Modal";
import InlineLoader from "games/shared/Inline-Loader";
import ReactSpeedometer from "games/helpers/lazy-loading-components/Lazy-Speedometer";

export default function Result({ state, handleCloseResultModal }) {
  const screenSize = window.innerWidth;

  const stats = state.runData.resultStats;
  const settings = state.gameSettings;
  const isOpen = state.screenState.isOpenResultModal;

  return (
    <Modal title="Result" open={isOpen} onClose={handleCloseResultModal} showClose={true}>
      <div className={style.speedometersContainer}>
        <div className={style.speedometerContainer}>
          <div className={style.speedometerTitle} style={{ color: "#6a2c70", fontWeight: "500" }}>
            {stats.speed + " secs"}
          </div>
          <Suspense fallback={<InlineLoader />}>
            <ReactSpeedometer
              ringWidth={screenSize <= 700 ? 15 : 20}
              needleHeightRatio={screenSize <= 700 ? 0.6 : 0.8}
              width={200}
              height={130}
              maxSegmentLabels={0}
              segments={1}
              maxValue={settings.maxTimePerQues}
              minValue={0}
              value={stats.speed}
              needleColor="#f08a5d"
              startColor={"#6a2c70"}
              endColor={"#6a2c70"}
            />
          </Suspense>

          <div
            className={style.speedometerTitle}
            style={{ color: "#6a2c70", fontWeight: "500", marginTop: "-10px" }}
          >
            Avg speed
          </div>
        </div>

        <div className={style.speedometerContainer}>
          <div className={style.speedometerTitle} style={{ color: "#6a2c70", fontWeight: "500" }}>
            {stats.accuracy + "%"}
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
              value={stats.accuracy}
              needleColor="#f08a5d"
              startColor={"#6a2c70"}
              endColor={"#6a2c70"}
            />
          </Suspense>

          <div
            className={style.speedometerTitle}
            style={{ color: "#6a2c70", fontWeight: "500", marginTop: "-10px" }}
          >
            Accuracy
          </div>
        </div>
      </div>
    </Modal>
  );
}
