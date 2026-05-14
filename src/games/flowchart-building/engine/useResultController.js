import { useEffect } from "react";
import useUploadResult from "views/CourseLearning/active-content/engine/useUploadResult";
import { FreeBreakfast } from "@material-ui/icons";

let _ToastTimeout = null;

export default function useResultController({
  state,
  dispatch,
  resumeGameTimer,
  pauseGameTimer,
  setNextQuestion,
}) {
  const { uploadResult } = useUploadResult();

  function isNode(node) {
    return node.hasOwnProperty("text");
  }

  function playToast(isCorrect, callback) {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: {
        toast: { isActive: true, isCorrect },
      },
    });
    _ToastTimeout = window.setTimeout(() => {
      dispatch({
        type: "UPDATE_SCREEN_STATE",
        payload: {
          toast: { isActive: false, isCorrect: false },
        },
      });
      if (callback) callback();
    }, 1500);
  }

  function isPoolRem() {
    const { questions } = state.runState;
    return questions.poolRem.length !== 0;
  }

  function parseData(elems) {
    let parsed = { nodesById: {} };
    elems.forEach((item) => {
      if (isNode(item)) {
        if (!parsed.nodesById[item.id]) parsed.nodesById[item.id] = {};
        if (!parsed.nodesById[item.id].edges) item.edges = [];
        parsed.nodesById[item.id] = item;
      } else {
        parsed.nodesById[item.source].edges.push({
          id: item.targetNode.id,
          type: item.targetNode.type,
          text: item.targetNode.text,
        });
      }
    });

    return parsed;
  }

  function handleSubmitAnswer() {
    const { toast } = state.screenState;
    if (toast.isActive) return;

    const currFlowchart = [...state.runState.currFlowchart];
    dispatch({
      type: "UPDATE_CURR_RESPONSE",
      payload: { resp: currFlowchart },
    });
  }

  function verifyAnswer() {
    const { toast } = state.screenState;
    if (toast.isActive) return;

    const { sidebarNodes } = state.runState;
    if (sidebarNodes.length !== 0) return playToast(false);

    const questionsAsked = state.runState.questions.asked;
    const targetFlowchart = questionsAsked[questionsAsked.length - 1].flowchart;
    const submittedFlowchart = state.runState.currFlowchart;
    const parsedSubmittedFlowchart = parseData(state.runState.currFlowchart);

    console.log("Start Iterating");
    console.log({ targetFlowchart, submittedFlowchart });

    let isCorrect = true;
    targetFlowchart
      .filter((item) => !isNode(item))
      .every((currEdge) => {
        const targetSource = currEdge.sourceNode;
        const targetTarget = currEdge.targetNode;

        console.log({ currEdge });
        console.log({ targetSource, targetTarget });

        const potentialSourceNodes = Object.entries(parsedSubmittedFlowchart.nodesById)
          .filter(
            ([key, value]) =>
              value.text.trim().toLowerCase() ===
                currEdge.sourceNode.text.trim().toLowerCase() &&
              value.type === currEdge.sourceNode.type
          )
          .map(([key, value]) => value);

        if (!potentialSourceNodes) {
          console.log("No Potential sources found");
          isCorrect = false;
          return false;
        }

        console.log({ potentialSourceNodes });
        console.log("Iterating over potential source nodes in submitted");

        const sourceInSubmitted = potentialSourceNodes.find((potSource) => {
          if (!potSource.edges) {
            console.log("no edges");
            return false;
          }

          return potSource.edges.find((f) => {
            console.log(f.type, f.text, targetTarget.type, targetTarget.text);
            return (
              f.type === targetTarget.type &&
              f.text.trim().toLowerCase() === targetTarget.text.trim().toLowerCase()
            );
          });
        });

        if (!sourceInSubmitted) {
          console.log("Source with the target edges not found");
          isCorrect = false;
        }

        console.log({ isCorrect });

        return isCorrect;

        // potentialSourceNodes.every((potSource) => {
        //   console.log({ potSource });

        //   if (potSource.edges.length <= 0) {
        //     console.log("Source has no edges, so this is not the source");
        //     return true;
        //   }

        //   const targetInEdges = potSource.edges.find((f) => {
        //     console.log(f.type, f.text, targetTarget.type, targetTarget.text);
        //     return (
        //       f.type === targetTarget.type &&
        //       f.text.trim().toLowerCase() === targetTarget.text.trim().toLowerCase()
        //     );
        //   });

        //   if (!targetInEdges) {
        //     console.log(
        //       "No target TargetNode found in edges , so skipping this potSource"
        //     );
        //     return true;
        //   }

        //   console.log("Target Found");
        //   console.log({ targetInEdges });
        //   return false;
        // });
      });

    if (isCorrect) {
      pauseGameTimer();

      playToast(true, () => {
        if (isPoolRem()) {
          setNextQuestion();
          dispatch({ type: "UPDATE_CURR_FLOWCHART", payload: { currFlowchart: [] } });
          resumeGameTimer();
        } else {
          dispatch({ type: "COMBINED", payload: { gameState: { isEnd: true } } });
          pauseGameTimer();
        }
      });
    } else {
      playToast(false);
    }
  }

  function verification() {
    const { toast } = state.screenState;
    if (toast.isActive) return;

    const { sidebarNodes } = state.runState;
    if (sidebarNodes.length !== 0) return playToast(false);

    /* ansFlowchart is saved as the answer and submittedFlowchart is what the user has submitted */

    let isCorrect = true;

    const questionsAsked = state.runState.questions.asked;
    const ansFlowchart = questionsAsked[questionsAsked.length - 1].flowchart;

    /* Flowchart is parsed for better searching*/
    let parsedSubmittedFlowchart = parseData(state.runState.currFlowchart);

    /* Iterate the answer flowchart and check if every element exists and is correctly connected 
       in the submitted flowchart */

    console.log("Starting iterating");
    for (let i = 0; i < ansFlowchart.length; i++) {
      if (!isCorrect) break;
      else console.log("Continuing to next block");

      const currItem = ansFlowchart[i];

      /* Ignore all nodes and compare only edges*/
      if (isNode(currItem)) continue;

      /* Source node connected with the edge exists or not*/

      let potentialSourceNodes = Object.entries(parsedSubmittedFlowchart.nodesById)
        .filter(
          ([key, value]) =>
            value.text.trim().toLowerCase() ===
              currItem.sourceNode.text.trim().toLowerCase() &&
            value.type === currItem.sourceNode.type
        )
        .map(([key, value]) => value);

      console.log({ currItem });
      console.log({ potentialSourceNodes });

      /* eslint-disable */

      console.log("Iterating over potential source nodes in submitted fc");

      let sourceFound = false;

      potentialSourceNodes.forEach((sourceNode) => {
        if (!sourceFound && isCorrect) {
          console.log("Next potential source in the list", sourceNode);

          // delete parsedSubmittedFlowchart.nodesById[sourceNode.id];

          /* No node should be without edges. The End node can never be a source of any edge*/
          if (sourceNode.edges.length <= 0) {
            console.log("Source has no edges, so flowchart is incorrect");
            isCorrect = false;
          }

          if (isCorrect) {
            console.log("Current potential source has edges");

            let targetNode = currItem.targetNode;
            console.log(
              "Target to find in submitted fc (from target of current answer item)",
              targetNode
            );

            console.log("Iterating the edges of current potential source node");
            const foundTarget = sourceNode.edges.find((f) => {
              console.log(f.type, f.text, targetNode.type, targetNode.text);
              return (
                f.type === targetNode.type &&
                f.text.trim().toLowerCase() === targetNode.text.trim().toLowerCase()
              );
            });

            if (!foundTarget) {
              console.log("Did not find target node , so this source is not found");
            } else {
              sourceFound = true;
              console.log("Found target");
              console.log({ foundTarget });
            }
          }
        }
      });

      if (!sourceFound) isCorrect = false;

      console.log({ isCorrect });
      console.log(
        "End of curr item ----------------------------------------------------"
      );
    }

    if (isCorrect) {
      pauseGameTimer();

      playToast(true, () => {
        if (isPoolRem()) {
          setNextQuestion();
          dispatch({ type: "UPDATE_CURR_FLOWCHART", payload: { currFlowchart: [] } });
          resumeGameTimer();
        } else {
          dispatch({ type: "COMBINED", payload: { gameState: { isEnd: true } } });
          pauseGameTimer();
        }
      });
    } else {
      playToast(false);
    }
  }

  // function verifyAnswer() {
  //   const { toast } = state.screenState;
  //   const { sidebarNodes } = state.runState;

  //   if (toast.isActive) return;

  //   if (sidebarNodes.length !== 0) {
  //     return playToast(false);
  //   }

  //   //Iterate all items from data and check if that exist in elems
  //   const questions = state.runState.questions.asked;
  //   let parsedData = parseData(state.runState.currFlowchart);

  //   let isCorrect = true;

  //   const currQuestion = questions[questions.length - 1];

  //   /* Check in curr question flowchart */
  //   for (let i = 0; i < currQuestion.flowchart.length; i++) {
  //     /*Compare each node of the flowchart against the stored question */

  //     //Ignore all non edge items
  //     let currItem = currQuestion.flowchart[i];
  //     if (isNode(currItem)) continue;

  //     console.log(currItem);
  //     // Check if sourceNode exists in the elements
  //     let sourceNode = parsedData.nodesById[currItem.source];
  //     if (!sourceNode) {
  //       isCorrect = false;
  //       break;
  //     }

  //     //Check if there is any edge for this node in elems
  //     if (sourceNode.edges.length <= 0) {
  //       isCorrect = false;
  //       break;
  //     }

  //     //Check if edge is correctly connected
  //     let targetId = currItem.target;
  //     if (sourceNode.edges.indexOf(targetId) === -1) {
  //       isCorrect = false;
  //       break;
  //     }
  //   }

  //   if (isCorrect) {
  //     pauseGameTimer();

  //     playToast(true, () => {
  //       if (isPoolRem()) {
  //         setNextQuestion();
  //         dispatch({ type: "UPDATE_CURR_FLOWCHART", payload: { currFlowchart: [] } });
  //         resumeGameTimer();
  //       } else {
  //         dispatch({ type: "COMBINED", payload: { gameState: { isEnd: true } } });
  //         pauseGameTimer();
  //       }
  //     });
  //   } else {
  //     playToast(false);
  //   }
  // }

  function calculateResult() {
    const { runState } = state;
    const { questions, totTimeElapsed } = runState;

    let finalResult = { speed: 0, accuracy: 0 };
    finalResult.speed = parseFloat(
      (totTimeElapsed / 1000 / questions.asked.length).toFixed(2)
    );

    let totalResponses = questions.asked.reduce(
      (accum, curr) => accum + curr.responses.length,
      0
    );

    finalResult.accuracy = parseFloat(
      ((questions.asked.length / totalResponses) * 100).toFixed(2)
    );

    dispatch({ type: "UPDATE_RUN_STATE", payload: { result: finalResult } });
  }

  useEffect(() => {
    if (!state.runState.questions.asked.length) return;

    const quesAsked = state.runState.questions.asked;
    const currQues = quesAsked[quesAsked.length - 1];
    if (!currQues.responses.length) return;

    verifyAnswer();
  }, [state.runState.questions.asked]);

  useEffect(() => {
    if (state.gameState.isEnd) calculateResult();
  }, [state.gameState.isEnd]);

  useEffect(() => {
    if (state.runState.result)
      uploadResult({
        gameId: state.gameSettings.gameId,
        arrData: state.runState.questions.asked,
        result: state.runState.result,
      });
  }, [state.runState.result]);

  useEffect(() => {
    return () => window.clearTimeout(_ToastTimeout);
  }, []);

  return { handleSubmitAnswer };
}
