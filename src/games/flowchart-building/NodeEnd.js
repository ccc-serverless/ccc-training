import React, { memo } from "react";
import Block from "./Block";
import { Handle } from "react-flow-renderer";

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="top"
        id="end_edge_target_top"
        style={{ background: "#555" }}
      />
      <Block type="END" text={data.label} />
    </>
  );
});
