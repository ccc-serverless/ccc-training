import React from "react";
import style from "./Answer.module.scss";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import dragIcon from "assets/images/icons/draggable.png";
import { useTags } from "./_common/TagsContext";

import clsx from "clsx";

export default function (props) {
  const Tags = useTags();

  const questions = props.questions.asked;
  const lastIndex = questions.length - 1;
  const question = questions[lastIndex];
  const { showSubmitButton } = props.state.screenState;

  //DND VARIABLES
  const grid = 8;

  //-----------DND FUNCTIONS------------------------------------------------------------//
  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function getItemStyle(isDragging, draggableStyle) {
    return {
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,

      // change background colour if dragging
      background: isDragging ? "lightgreen" : "white",
      borderRadius: "5px",

      // styles we need to apply on draggables
      ...draggableStyle,
    };
  }

  function getListStyle(isDraggingOver) {
    return { background: "transparent", padding: grid, width: "100%" };
  }

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const updateItems = reorder(
      question.randomSteps,
      result.source.index,
      result.destination.index
    );

    props.setQuestions((prev) => {
      let update = { ...prev };
      update.asked[update.asked.length - 1].randomSteps = updateItems;
      return update;
    });
  }

  //--------DND FUNCTION END----------------------------------------------------------//

  function handleSubmitAnswer() {
    let currQues = question;
    currQues.resp.push(currQues.randomSteps.map((item) => item.order));
    let isCorrect = true;
    for (let i = 0; i < currQues.steps.length; i++) {
      if (currQues["randomSteps"][i] !== currQues["steps"][i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      if (!props.questions.poolRem.length) handleEndGame();
      props.dispatch({
        type: "SET_STYLE_CARD_BG",
        payload: { currState: "Correct" },
      });

      props.dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          showNextButton: true,
          showIncorrect: false,
          showCorrect: true,
          showSolutionButton: false,
          showSubmitButton: false,
        },
      });
    } else {
      props.dispatch({
        type: "SET_STYLE_CARD_BG",
        payload: { currState: "Incorrect" },
      });
      props.dispatch({
        type: "SET_SCREEN_STATE",
        payload: {
          showNextButton: false,
          showIncorrect: true,
        },
      });
    }
  }

  function handleEndGame() {
    props.calculateResult(Tags);
    props.dispatch({ type: "SET_GAME_STATE", payload: { isEnd: true } });
    props.stopTimer();
  }

  function getBlockStyle(type) {
    switch (type) {
      case "pill":
        return style.pill;
      case "rectangle":
        return style.rectangle;
      case "paralleogram":
        return style.paralellogram;
      case "parallelogram":
        return style.paralellogram;
      case "diamond":
        return style.diamond;
      default:
        return style.pill;
    }
  }

  return (
    <div
      style={{ background: props.state.style.cardBackground }}
      id={style.sequenceWrapper}
      className={style.wrapper}
    >
      <div className={style.controller}>
        <p>Drag and drop in correct order</p>
        {showSubmitButton && <button onClick={handleSubmitAnswer}>Submit</button>}
      </div>

      {props.questions.asked.length ? (
        <div className={style.drag}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className={style.droppable}
                >
                  {question.randomSteps.map((item, index) => (
                    <p className={style.slNo} key={`step${index}`}>
                      {index + 1}
                    </p>
                  ))}

                  {question.randomSteps.map((item, index) => (
                    <Draggable
                      key={item.uid}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className={style.draggableItem}
                        >
                          {props.name === "Flowchart Sequencing" && (
                            <div
                              className={clsx(
                                style.itemContent,
                                getBlockStyle(item.type)
                              )}
                            >
                              <p>{item.text}</p>
                            </div>
                          )}
                          {props.name === "Sequence" && (
                            <div className={style.itemContent}>
                              <p>{item.value}</p>
                            </div>
                          )}
                          <div className={style.dragIcon}>
                            <img src={dragIcon} alt="" />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      ) : null}
    </div>
  );
}
