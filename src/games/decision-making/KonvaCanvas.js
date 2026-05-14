import React, { useState, useEffect } from "react";
import style from "./KonvaCanvas.module.scss";
import { ChevronRight, ChevronUp, ChevronDown, ChevronLeft } from "react-feather";

import Konva from "konva";
import { Stage, Layer } from "react-konva";
import { useWindowResize } from "beautiful-react-hooks";

import RectNode from "./nodes/Rect";
import DiamondNode from "./nodes/Diamond";
import CircleNode from "./nodes/Circle";
import ArrowStraight from "./nodes/ArrowStraight";
import ArrowBranchLeft from "./nodes/ArrowBranchLeft";
import ArrowBranchRight from "./nodes/ArrowBranchRight";
import UserIcon from "./UserIcon";
import ViewResult from "../shared/ViewResult";

import ResultIndicator from "./ResultIndicator";
import { getNodeDimensions } from "./helpers/functions";

const _Scale = 1;
const _Velocity = 200;

function easeInOutCubic(x) {
  let y = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  return y + 0.8;
}

export default function KonvaCanvas({
  canvasDrawings,
  checkEndGame,
  isGameStart,
  isGameEnd,
  handleStartGame,
  handleResultModal,
  resetGame,
  stopTimer,
  startTimer,
}) {
  const userRef = React.useRef();
  const inputRef = React.useRef();

  const [layer, setLayer] = useState();
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const [userCurrentNode, setUserCurrentNode] = useState();
  const [isAnimActive, setIsAnimActive] = useState(false);

  const [lottie, setLottie] = useState({ isActive: false, isCorrect: true });
  const [isResized, setIsResized] = useState(false);

  const [showInstruction, setShowInstruction] = useState(true);

  const offset = window.innerWidth < 1000 ? 0 : 250;
  const padding = window.innerWidth < 550 ? 10 : 60;

  useWindowResize(() => {
    setIsResized(true);
  });

  /* Adjust the position of each shape wrt to generated origin */
  function render(node) {
    const { x, y, text } = node;

    let actualPosition = { x: (x + origin.x) / _Scale, y: (y + origin.y) / _Scale };
    if (node.type.split("_")[0] === "ARROW") {
      actualPosition = {
        from: {
          x: (node.from.x + origin.x) / _Scale,
          y: (node.from.y + origin.y) / _Scale,
        },
        to: { x: (node.to.x + origin.x) / _Scale, y: (node.to.y + origin.y) / _Scale },
      };
    }

    switch (node.type) {
      case "START":
        return (
          <CircleNode
            {...actualPosition}
            type={node.type}
            key={`${actualPosition.x}${actualPosition.y}`}
          />
        );
      case "ARROW":
        return (
          <ArrowStraight
            {...actualPosition}
            key={`${actualPosition.from.x}${actualPosition.from.y}`}
          />
        );
      case "ARROW_BRANCH_LEFT":
        return (
          <ArrowBranchLeft
            {...actualPosition}
            key={`${actualPosition.from.x}${actualPosition.from.y}`}
          />
        );
      case "ARROW_BRANCH_RIGHT":
        return (
          <ArrowBranchRight
            {...actualPosition}
            key={`${actualPosition.from.x}${actualPosition.from.y}`}
          />
        );
      case "END":
      case "ANSWER":
        return (
          <CircleNode
            {...actualPosition}
            text={node.text}
            type={node.type}
            key={`${actualPosition.x}${actualPosition.y}`}
          />
        );
      case "DECISION":
        return (
          <DiamondNode
            {...actualPosition}
            text={text}
            key={`${actualPosition.x}${actualPosition.y}`}
          />
        );
      case "BRANCH":
        return (
          <CircleNode
            {...actualPosition}
            text={text}
            type={node.type}
            key={`${actualPosition.x}${actualPosition.y}`}
          />
        );
      case "INPUT":
      case "PROCESS":
        return (
          <RectNode
            {...actualPosition}
            text={text}
            key={`${actualPosition.x}${actualPosition.y}`}
          />
        );
      default:
        return (
          <RectNode
            {...actualPosition}
            text={text}
            key={`${actualPosition.x}${actualPosition.y}`}
          />
        );
    }
  }

  function animUserHorizontal(currNode, nextNode, direction) {
    let totalDistance = 0;
    let user = userRef.current;
    let diff = Math.abs(currNode.y - nextNode.y);

    if (nextNode.type === "DECISION") {
      diff =
        Math.abs(currNode.y - nextNode.y) -
        getNodeDimensions(currNode).height / 2 -
        getNodeDimensions(nextNode).height / 4;
    }

    if (currNode.type === "DECISION") {
      diff =
        Math.abs(currNode.y - nextNode.y) -
        getNodeDimensions(currNode).height / 4 -
        getNodeDimensions(nextNode).height / 2;
    }

    const anim = new Konva.Animation((frame) => {
      let progress = totalDistance / diff;
      let x = easeInOutCubic(progress);
      let v = (x * _Velocity * frame.timeDiff) / 1000;
      let distForFrame = v + totalDistance < diff ? v : diff - totalDistance;
      totalDistance += distForFrame;

      user.move({ x: 0, y: direction === "UP" ? -distForFrame : distForFrame });
      layer.getChildren().forEach((item) => {
        item.move({ x: 0, y: direction === "UP" ? distForFrame : -distForFrame });
      });
      if (totalDistance >= diff) {
        if (nextNode.type === "ANSWER") {
          window.setTimeout(() => {
            setLottie({ isActive: true, isCorrect: true });
            stopTimer();
            window.setTimeout(() => {
              setLottie({ isActive: false, isCorrect: false });
              startTimer();
              user.absolutePosition({ x: origin.x, y: origin.y });
              checkEndGame();
            }, 1500);
          }, 100);
        }
        anim.stop();
        setIsAnimActive(false);
        return false;
      }
    });

    setIsAnimActive(true);
    anim.start();
  }

  useEffect(() => {
    if (canvasDrawings && canvasDrawings.length)
      setUserCurrentNode({ ...canvasDrawings[0], parent: null });
  }, [canvasDrawings]);

  function animUserBranch(currNode, nextNode, dir1, dir2) {
    let totalDistance = { x: 0, y: 0, offset: 0 };
    let isDir1 = true;
    let isDir2 = false;
    let isOffset = true;
    let user = userRef.current;

    const anim = new Konva.Animation((frame) => {
      let movementCooridnates = { x: 0, y: 0 };

      if (isOffset && isDir1 && (dir1 === "LEFT" || dir1 === "RIGHT")) {
        const offset = Math.floor(getNodeDimensions(currNode).height / 4);
        let x = easeInOutCubic(0.1);
        let v = (x * _Velocity * frame.timeDiff) / 1000;
        let distForFrame =
          totalDistance.offset + v < offset ? v : offset - totalDistance.offset;
        totalDistance.offset += distForFrame;
        user.move({ y: -distForFrame, x: 0 });
        layer.getChildren().forEach((item) => {
          item.move({ x: 0, y: distForFrame });
        });
        if (totalDistance.offset >= offset) isOffset = false;
      }

      if (!isDir2 && !isDir1) {
        const offset = Math.floor(getNodeDimensions(nextNode).height / 4);
        let x = easeInOutCubic(1);
        let v = (x * _Velocity * frame.timeDiff) / 1000;
        let distForFrame =
          totalDistance.offset + v < offset ? v : offset - totalDistance.offset;
        totalDistance.offset += distForFrame;
        user.move({ y: distForFrame, x: 0 });
        layer.getChildren().forEach((item) => {
          item.move({ x: 0, y: -distForFrame });
        });

        if (totalDistance.offset >= offset) {
          anim.stop();
          setIsAnimActive(false);
          isOffset = false;
        }
      }

      let diff = {};
      if (isDir1) {
        if (dir1 === "UP") return false;
        if (isOffset && (dir1 === "RIGHT" || dir1 === "LEFT")) return;

        diff = {
          y: Math.floor(
            Math.abs(currNode.y - nextNode.y) + getNodeDimensions(nextNode).height / 4
          ),
          x: Math.floor(Math.abs(currNode.x - nextNode.x)),
        };

        if (dir1 === "DOWN") {
          let progress = totalDistance.y / diff.y;
          let x = easeInOutCubic(progress);
          let v = (x * _Velocity * frame.timeDiff) / 1000;

          let distForFrame = totalDistance.y + v < diff.y ? v : diff.y - totalDistance.y;
          movementCooridnates = { x: 0, y: distForFrame };
          totalDistance.y += distForFrame;
        } else {
          let progress = totalDistance.x / diff.x;
          let x = easeInOutCubic(progress);
          let v = (x * _Velocity * frame.timeDiff) / 1000;
          let distForFrame = totalDistance.x + v < diff.x ? v : diff.x - totalDistance.x;

          if (dir1 === "LEFT") {
            movementCooridnates = { x: -distForFrame, y: 0 };
          } else if (dir1 === "RIGHT") movementCooridnates = { x: distForFrame, y: 0 };
          totalDistance.x += distForFrame;
        }

        user.move(movementCooridnates);
        layer.getChildren().forEach((item) => {
          item.move({ x: -movementCooridnates.x, y: -movementCooridnates.y });
        });
      } else {
        if (dir2 === "DOWN") return false;

        diff = {
          y: Math.floor(
            Math.abs(currNode.y - nextNode.y) + getNodeDimensions(nextNode).height / 2
          ),
          x: Math.floor(Math.abs(currNode.x - nextNode.x)),
        };

        if (dir2 === "UP") {
          let progress = totalDistance.y / diff.y;
          let x = easeInOutCubic(progress);
          let v = (x * _Velocity * frame.timeDiff) / 1000;

          let distForFrame = totalDistance.y + v < diff.y ? v : diff.y - totalDistance.y;

          movementCooridnates = { x: 0, y: -distForFrame };
          totalDistance.y += distForFrame;
        } else {
          let progress = totalDistance.x / diff.x;
          let x = easeInOutCubic(progress);
          let v = (x * _Velocity * frame.timeDiff) / 1000;
          let distForFrame = totalDistance.x + v < diff.x ? v : diff.x - totalDistance.x;

          if (dir2 === "LEFT") movementCooridnates = { x: -distForFrame, y: 0 };
          else if (dir2 === "RIGHT") movementCooridnates = { x: distForFrame, y: 0 };
          totalDistance.x += distForFrame;
        }

        user.move(movementCooridnates);
        layer.getChildren().forEach((item) => {
          item.move({ x: -movementCooridnates.x, y: -movementCooridnates.y });
        });
      }

      if (dir1 === "LEFT" || dir1 === "RIGHT") {
        if (totalDistance.x >= diff.x) {
          isDir1 = false;
          isDir2 = true;
        }

        if (totalDistance.y >= diff.y) {
          anim.stop();
          setIsAnimActive(false);
          return false;
        }
      } else {
        if (totalDistance.y >= diff.y) {
          isDir1 = false;
          isDir2 = true;
        }
        if (totalDistance.x >= diff.x) {
          isDir2 = false;
        }
      }
    });

    anim.start();
    setIsAnimActive(true);
  }

  function handleKeyDown(e) {
    if (isAnimActive) return;
    if (showInstruction) setShowInstruction(false);

    if (e.keyCode === 38) {
      /* Up key */
      if (!userCurrentNode || !userCurrentNode.children) return;

      if (userCurrentNode.children.length === 1) {
        animUserHorizontal(userCurrentNode, userCurrentNode.children[0], "UP");
        setUserCurrentNode((prev) => {
          return { ...prev.children[0], parent: prev };
        });
      }
    } else if (e.keyCode === 40) {
      /* Down key */
      if (!userCurrentNode || !userCurrentNode.parent) return;

      if (userCurrentNode.parent.children.length !== 1) {
        if (userCurrentNode.id === userCurrentNode.parent.children[0].id) {
          animUserBranch(userCurrentNode, userCurrentNode.parent, "DOWN", "RIGHT");
          setUserCurrentNode((prev) => {
            return { ...prev.parent, children: prev.parent.children };
          });
        } else if (userCurrentNode.id === userCurrentNode.parent.children[1].id) {
          animUserBranch(userCurrentNode, userCurrentNode.parent, "DOWN", "LEFT");
          setUserCurrentNode((prev) => {
            return { ...prev.parent, children: prev.parent.children };
          });
        }
      } else if (userCurrentNode.parent.children.length === 1) {
        animUserHorizontal(userCurrentNode, userCurrentNode.parent, "DOWN");
        setUserCurrentNode((prev) => {
          return { ...prev.parent, children: prev.parent.children };
        });
      }
    } else if (e.keyCode === 37) {
      /* Left Key */
      if (!userCurrentNode || !userCurrentNode.children) return;
      if (userCurrentNode.children.length <= 1) return;

      animUserBranch(userCurrentNode, userCurrentNode.children[0], "LEFT", "UP");
      setUserCurrentNode((prev) => {
        return { ...prev.children[0], parent: prev };
      });
    } else if (e.keyCode === 39) {
      /* Right Key */
      if (!userCurrentNode || !userCurrentNode.children) return;
      if (userCurrentNode.children.length <= 1) return;

      animUserBranch(userCurrentNode, userCurrentNode.children[1], "RIGHT", "UP");
      setUserCurrentNode((prev) => {
        return { ...prev.children[1], parent: prev };
      });
    }
  }

  function handleClickVirtualKey(mockKeyCode) {
    let mockEvent = {
      keyCode: mockKeyCode,
    };
    handleKeyDown(mockEvent);
  }

  useEffect(() => {
    if (!layer) return;
    setOrigin({ x: layer.width() / 2 + 7, y: layer.height() / 2 + 9 });
  }, [layer]);

  useEffect(() => {
    if (canvasDrawings) setUserCurrentNode({ ...canvasDrawings[0], parent: null });
  }, [canvasDrawings]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [canvasDrawings]);

  return isResized ? (
    <div className={style.refreshWrapper}>Please refresh the page to play the game</div>
  ) : !isGameStart && !isGameEnd ? (
    <div className={style.refreshWrapper}>
      Press start to begin
      <div>
        <button onClick={handleStartGame}>Start</button>
      </div>
    </div>
  ) : isGameStart && isGameEnd ? (
    <div className={style.viewResultContainer}>
      <ViewResult onClick={handleResultModal} playAgain={resetGame} />
    </div>
  ) : (
    <div className={style.wrapper}>
      <div className={style.blur}></div>
      <div className={style.controllers}>
        {showInstruction && (
          <div className={style.instruction}>
            Use these buttons or your keypad to move
          </div>
        )}

        <div className={style.buttons}>
          <button onClick={handleClickVirtualKey.bind(this, 38)}>
            <ChevronUp />
          </button>
          <button onClick={handleClickVirtualKey.bind(this, 40)}>
            <ChevronDown />
          </button>
          <button onClick={handleClickVirtualKey.bind(this, 37)}>
            <ChevronLeft />
          </button>
          <button onClick={handleClickVirtualKey.bind(this, 39)}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <input ref={inputRef} onKeyDown={handleKeyDown} />

      {/* RESULT INDICATOR */}
      {lottie.isActive && (
        <div
          className={style.resultIndicatorContainer}
          style={{
            width: window.innerWidth - offset - 2 * padding,
            height: window.innerHeight - 260,
          }}
        >
          <ResultIndicator isCorrect={lottie.isCorrect} />
        </div>
      )}

      {!lottie.isActive && (
        <Stage
          className={style.wrapper}
          width={window.innerWidth - offset - 2 * padding}
          height={window.innerHeight - 260}
          scaleX={_Scale}
          scaleY={_Scale}
        >
          <Layer ref={(node) => setLayer(node)}>
            {canvasDrawings.map((item) => render(item))}
            {layer && <UserIcon ref={userRef} x={origin.x} y={origin.y - 24} />}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
