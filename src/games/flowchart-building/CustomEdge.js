import React from "react";
import { getBezierPath, getMarkerEnd } from "react-flow-renderer";

export default function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    arrowHeadType,
    markerEndId,
  } = props;

  const style = {
    strokeWidth: 2,
  };

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        style={style}
        d={edgePath}
        markerEnd={markerEnd}
      />
      <path
        className="react-flow__edge-path"
        style={{ strokeWidth: 40, stroke: "initial" }}
        d={edgePath}
      />
    </>
  );
}
