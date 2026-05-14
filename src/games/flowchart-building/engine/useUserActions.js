import { addEdge } from "react-flow-renderer";

export default function useUserActions({ state, dispatch, reactFlowRef }) {
  function onElementsRemove(id) {
    const toUpdate = [...state.runState.currFlowchart];

    const index = toUpdate.findIndex((f) => f.id === id);
    if (index === -1) return;

    toUpdate.splice(index, 1);

    dispatch({
      type: "UPDATE_CURR_FLOWCHART",
      payload: { currFlowchart: toUpdate },
    });
  }

  function removeEdge(elementsToRemove) {
    const toUpdate = [...state.runState.currFlowchart];

    if (elementsToRemove[0].type !== "CUSTOM_EDGE") return;

    const index = toUpdate.findIndex((f) => f.id === elementsToRemove[0].id);
    if (index === -1) return;

    toUpdate.splice(index, 1);
    dispatch({
      type: "UPDATE_CURR_FLOWCHART",
      payload: { currFlowchart: toUpdate },
    });
  }

  function findItemInElements(id) {
    const elements = state.runState.currFlowchart;
    return elements.find((f) => f.id === id);
  }

  function onConnect(params) {
    const sourceNode = findItemInElements(params.source);
    const targetNode = findItemInElements(params.target);

    const paramss = {
      ...params,
      sourceNode,
      targetNode,
      type: "CUSTOM_EDGE",
      arrowHeadType: "arrowclosed",
    };

    let toUpdate = [...state.runState.currFlowchart];
    toUpdate = addEdge(paramss, toUpdate);

    dispatch({
      type: "UPDATE_CURR_FLOWCHART",
      payload: { currFlowchart: toUpdate },
    });
  }

  function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function onLoad(_reactFlowInstance) {
    dispatch({
      type: "UPDATE_SCREEN_STATE",
      payload: { reactFlowInstance: _reactFlowInstance },
    });
  }

  function removeSidebarNodes(id) {
    let index = state.runState.sidebarNodes.findIndex((f) => f.id === id);
    if (index === -1) return;

    let toUpdate = [...state.runState.sidebarNodes];
    toUpdate.splice(index, 1);

    dispatch({ type: "UPDATE_RUN_STATE", payload: { sidebarNodes: toUpdate } });
  }

  function isNode(node) {
    return node.hasOwnProperty("text");
  }

  function onDrop(event) {
    event.preventDefault();

    const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const text = event.dataTransfer.getData("node-text");
    const id = event.dataTransfer.getData("node-id");

    const position = state.screenState.reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id,
      type,
      position,
      text,
      data: { label: text },
    };

    removeSidebarNodes(id);

    const questions = state.runState.questions.asked;
    const currQuestion = questions[questions.length - 1];

    let toUpdateState = JSON.parse(JSON.stringify(state));
    let updatedFlowchart = [...toUpdateState.runState.currFlowchart, newNode];

    if (type === "DECISION") {
      for (let i = 0; i < currQuestion.flowchart.length; i++) {
        let item = currQuestion.flowchart[i];

        if (isNode(item)) continue;

        if (item.source === id) {
          const targetId = item.target;
          const targetNode = currQuestion.flowchart.find((f) => f.id === targetId);

          let newPosition = { x: position.x, y: position.y + 100 };

          if (item.sourceHandle === "decision_edge_source_left")
            newPosition.x = newPosition.x - 125;
          else if (item.sourceHandle === "decision_edge_source_right")
            newPosition.x = newPosition.x + 160;
          else {
            newPosition.x = newPosition.x - 5;
            newPosition.y = newPosition.y + 90;
          }

          const newBranchNode = { ...targetNode, position: newPosition };

          item = { ...item, type: "CUSTOM_FIXED_EDGE", arrowHeadType: "arrowclosed" };
          delete item.animated;

          if (item.targetNode.type === "BRANCH") {
            updatedFlowchart.push(newBranchNode, item);
          }
        }
      }
    }

    dispatch({
      type: "UPDATE_CURR_FLOWCHART",
      payload: {
        currFlowchart: updatedFlowchart,
      },
    });
  }
  return { onLoad, onDragOver, onConnect, onDrop, onElementsRemove, removeEdge };
}
