import { useState } from "react";
import { getNodeDimensions } from "./functions";

export default function useTree(data) {
  const [tree, setTree] = useState(null);
  const [state, setState] = useState(null);

  /** Helper Functions */

  function findStartNode(flowchartData) {
    return flowchartData.find((f) => f.type === "START");
  }
  function parseNodesById(flowchartData) {
    let obj = {};
    flowchartData.forEach((item) => {
      if (!item.text) return;

      obj[item.id] = item;
    });

    return obj;
  }
  function findEdgesFromNode(flowchartData, node) {
    const id = node.id;
    let arr = [];
    flowchartData.forEach((item) => {
      if (item.text) return;

      if (item.source === id) {
        arr.push(item);
      }
    });

    return arr;
  }

  /** -------------------------------------------------  */

  /* Recursively make a tree */
  function findChildren(flowchartData, node) {
    node.children.map((child) => {
      const edgesFrom = findEdgesFromNode(flowchartData, child);
      if (edgesFrom.length) {
        child.children = [
          ...edgesFrom.map((e) => parseNodesById(flowchartData)[e.target]),
        ];
        findChildren(flowchartData, child);
      } else {
        child.children = [];
      }
    });
  }

  function getCanvasDrawings(flowchartData) {
    const nodesById = parseNodesById(flowchartData);
    const start = findStartNode(flowchartData);
    start.children = findEdgesFromNode(flowchartData, start).map(
      (e) => nodesById[e.target]
    );
    findChildren(flowchartData, start);

    let arr = [];
    /* Prev is array so that it can be passed by ref instead of value */
    let prev = [tree];
    let currPos = [0, 0];

    getCooridnatesForCanvasDrawings(start, arr, prev, currPos);
    return arr;
  }

  /* Generate the cooridnates of each canvas shape */
  function getCooridnatesForCanvasDrawings(node, arr, prev, currPos) {
    const countChildren = node.children.length;

    /* Add the node for rendering on canvas */
    node.x = currPos[0];
    node.y = currPos[1];
    arr.push({ ...node });

    if (countChildren === 0) {
      // console.log("End reached, Back to last fork");
      return;
    }

    prev[0] = node;
    /* Update the currPos depending on the type of node . This currPos will be used by the next node for position */
    if (countChildren === 1) {
      /* Store the position of current node for reference and update it to the position of next node*/
      let oldPos = [...currPos];

      /* Decision Node adjust the spacing */
      if (node.children[0].type === "DECISION")
        currPos = [
          currPos[0],
          currPos[1] - 150 - getNodeDimensions(node.children[0]).height / 2 + 10,
        ];
      else currPos = [currPos[0], currPos[1] - 150];

      /* Set position of the arrow towards the next node */
      let arrowPos = {
        from: { x: oldPos[0], y: oldPos[1] - getNodeDimensions(node).height / 2 },
        to: {
          x: currPos[0],
          y: currPos[1] + getNodeDimensions(node.children[0]).height / 2 + 5,
        },
      };

      /* Push the node and arrow to the array for rendering on canvas */
      arr.push({
        type: "ARROW",
        ...arrowPos,
      });

      /* Recursively go throught to the children of current node and repeat the proess */
      getCooridnatesForCanvasDrawings(node.children[0], arr, prev, currPos);
    } else if (countChildren === 2) {
      let oldPos = [...currPos];

      /*Left branch */
      currPos = [currPos[0] - 230, currPos[1] - 110];
      let arrowPos = {
        from: {
          x: oldPos[0] - getNodeDimensions(node).width / 2,
          y: oldPos[1],
        },
        to: {
          x: currPos[0],
          y: currPos[1] + getNodeDimensions(node.children[0]).height / 2 + 5,
        },
      };
      arr.push({
        type: "ARROW_BRANCH_LEFT",
        ...arrowPos,
      });
      getCooridnatesForCanvasDrawings(node.children[0], arr, prev, currPos);

      /* Right Branch */
      currPos = [currPos[0] + 450, currPos[1]];
      arrowPos = {
        from: {
          x: oldPos[0] + getNodeDimensions(node).width / 2,
          y: oldPos[1],
        },
        to: {
          x: currPos[0],
          y: currPos[1] + getNodeDimensions(node.children[1]).height / 2 + 5,
        },
      };
      arr.push({
        type: "ARROW_BRANCH_RIGHT",
        ...arrowPos,
      });
      getCooridnatesForCanvasDrawings(node.children[1], arr, prev, currPos);
    }
  }

  return { tree, canvasDrawings: state, getCanvasDrawings };
}
