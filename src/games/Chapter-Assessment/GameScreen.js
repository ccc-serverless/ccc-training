import React, { useEffect } from "react";
import style from "./GameScreen.module.scss";

import ClipLoader from "react-spinners/PulseLoader";

import GameCard from "./GameCard";
import ResultModal from "./Result";
import Modal from "components/shared/Modal";

import { useGameEngine } from "./engine/GameEngineProvider";

export default function GameScreen({ chapter }) {
  const {
    state,
    dispatch,
    handleCloseResultModal,
    handleEndGame,
    handleCloseConfirmation,
    handleGameReset,
  } = useGameEngine();

  useEffect(() => {
    if (!chapter) return;

    dispatch({ type: "UPDATE_GAME_SETTINGS", payload: { chapter: chapter } });
  }, [chapter]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>Assessment Challenge</div>

      {state.screenState.isLoading ? (
        <div
          style={{
            display: "flex",
            height: "400px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipLoader color={"white"} size={10} />
        </div>
      ) : (
        <GameCard />
      )}

      {/* Result Modal  */}
      {state.screenState.isOpenResultModal && state.runData.result && (
        <ResultModal
          isOpen={state.screenState.isOpenResultModal}
          handleClose={handleCloseResultModal}
          result={state.runData.result}
          handleGameReset={handleGameReset}
        />
      )}

      {state.screenState.isOpenSubmitConfirmation && (
        <Modal
          isOpen={state.screenState.isOpenSubmitConfirmation}
          title="Confirm Submission"
        >
          <div className={style.submissionModalWrapper}>
            <div className={style.body}>Are you sure you want to submit ? </div>
            <div className={style.buttons}>
              <button onClick={handleCloseConfirmation}>No</button>
              <button onClick={handleEndGame}>Yes</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
