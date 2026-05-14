import React, { memo } from "react";
import Block from "./Block";
import { Handle } from "react-flow-renderer";

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="source"
        position="bottom"
        id="input_edge_source_bottom"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="left"
        id="input_edge_source_left"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="right"
        id="input_edge_source_right"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position="top"
        id="input_edge_target_top"
        style={{ background: "#555" }}
      />

      <Block type="INPUT" text={data.label} />
    </>
  );
});
