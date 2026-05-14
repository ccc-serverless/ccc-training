let _ToastTimeout = null;

export default function useResultController({ state, dispatch }) {
  function playToast(isCorrect) {
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
    }, 1500);
  }

  function handleVerifyAnswer() {
    const { toast } = state.screenState;
    const { sidebarNodes } = state.runState;

    if (toast.isActive) return;

    if (sidebarNodes.length !== 0) {
      return playToast(false);
    }

    //Iterate all items from data and check if that exist in elems

    let parsedData = parseData(elements);
    let isCorrect = true;

    const currQuestion = questions[questions.length - 1];
    for (let i = 0; i < currQuestion.flowchart.length; i++) {
      //Ignore all non edge items
      let currItem = currQuestion.flowchart[i];
      if (isNode(currItem)) continue;

      // Check if sourceNode exists
      let sourceNode = parsedData.nodesById[currItem.source];
      if (!sourceNode) {
        isCorrect = false;
        break;
      }

      //Check if there is any edge for this node in elems
      if (sourceNode.edges.length <= 0) {
        isCorrect = false;
        break;
      }

      //Check if edge is correctly connected
      let targetId = currItem.target;
      if (sourceNode.edges.indexOf(targetId) === -1) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      pauseGameTimer();
      setToast({ isActive: true, isCorrect: true });

      _ToastTimeout = window.setTimeout(() => {
        setToast({ isActive: false, isCorrect: false });
        if (isPoolRem()) {
          setNextQuestion();
          setElements([]);
          resumeGameTimer();
        } else {
          setIsGameEnd(true);
          setElements([]);
          upload();
        }
      }, 1500);
    } else {
      setToast({ isActive: true, isCorrect: false });
      _ToastTimeout = window.setTimeout(() => {
        setToast({ isActive: false, isCorrect: false });
      }, 1500);
    }
  }

  function parseData(elems) {
    let parsed = { nodesById: {} };
    elems.forEach((item) => {
      if (isNode(item)) {
        if (!parsed.nodesById[item.id]) parsed.nodesById[item.id] = {};
        if (!parsed.nodesById[item.id].edges) item.edges = [];
        parsed.nodesById[item.id] = item;
      } else {
        parsed.nodesById[item.source].edges.push(item.target);
      }
    });
    return parsed;
  }
}
