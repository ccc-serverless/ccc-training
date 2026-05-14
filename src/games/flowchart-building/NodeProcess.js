import React, { memo } from "react";
import Block from "./Block";
import { Handle } from "react-flow-renderer";

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="source"
        position="bottom"
        id="process_edge_source_bottom"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="top"
        id="process_edge_target_top"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="left"
        id="process_edge_target_left"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="right"
        id="process_edge_target_right"
        style={{ background: "#555" }}
      />
      <Block type="PROCESS" text={data.label} />
    </>
  );
});
