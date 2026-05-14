import React, { useEffect, useState } from "react";
import style from "./GameScreen.module.scss";

import clsx from "clsx";
import ClipLoader from "react-spinners/PulseLoader";
import { Cross as Hamburger } from "hamburger-react";

import { GameEngineProvider } from "./engine/GameEngineProvider";

import GameCard from "./GameCard";
import ResultModal from "./Result";
import Sidebar from "../shared/Sidebar";
import Modal from "components/shared/Modal";

import { useGameEngine } from "./engine/GameEngineProvider";
import useGetAllocatedCourse from "hooks/useGetAllocatedCourse";

function GameScreen({ getQuestions, postResult, type }) {
  const {
    state,
    dispatch,
    handleCloseResultModal,
    handleEndGame,
    handleCloseConfirmation,
    handleGameReset,
  } = useGameEngine();

  const { unansweredQuestions } = state.runData;
  const { allocatedCourse } = useGetAllocatedCourse();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleClickHam() {
    setIsSidebarOpen((prev) => !prev);
  }

  function setAllocatedCourse() {
    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: { allocatedCourse: allocatedCourse, type },
    });
  }

  function setTerminalHandlers() {
    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: { getQuestions, postResult },
    });
  }

  useEffect(setAllocatedCourse, [allocatedCourse]);
  useEffect(setTerminalHandlers, []);

  return (
    <div className={style.wrapper}>
      <div className={clsx(style.sidebar, isSidebarOpen && style.mobOpen)}>
        <Sidebar handleClickHam={handleClickHam} state={state} dispatch={dispatch} />
      </div>

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
        <div className={style.main}>
          <div className={style.ham}>
            <Hamburger onToggle={handleClickHam} size={20} />
          </div>
          {allocatedCourse && allocatedCourse.courseDetails && (
            <div className={style.header}>
              {allocatedCourse.courseDetails.name}{" "}
              {type === "pre-chapter"
                ? "Pre Chapter Assessment"
                : type === "course-end"
                ? "Course End Assessment"
                : "Post Chapter Assessment"}
            </div>
          )}

          <GameCard />
        </div>
      )}

      {state.screenState.isOpenSubmitConfirmation && (
        <Modal
          isOpen={state.screenState.isOpenSubmitConfirmation}
          title="Confirm Submission"
        >
          <div className={style.submissionModalWrapper}>
            <div className={style.body}>Are you sure you want to submit ? </div>
            {unansweredQuestions.length ? (
              <div className={style.unansweredWrapper}>
                <div className={style.title}>You have not attempted these questions</div>
                <div className={style.questions}>
                  {unansweredQuestions.map((ques) => (
                    <div className={style.ques}>Question {ques.index + 1}</div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className={style.buttons}>
              <button onClick={handleCloseConfirmation}>Continue Assessment</button>
              <button onClick={handleEndGame}>Submit</button>
            </div>
          </div>
        </Modal>
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
    </div>
  );
}

/*Wrapper for accessing context*/
export default function GameContainer(props) {
  return (
    <GameEngineProvider>
      <GameScreen {...props} />
    </GameEngineProvider>
  );
}
