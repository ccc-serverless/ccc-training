import React, { memo } from "react";
import Block from "./Block";
import { Handle } from "react-flow-renderer";

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="source"
        position="top"
        id="decision_edge_target_top"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="left"
        id="decision_edge_source_left"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="right"
        id="decision_edge_source_right"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="decision_edge_source_bottom"
        style={{ background: "#555" }}
      />

      <Block type="DECISION" text={data.label} />
    </>
  );
});
