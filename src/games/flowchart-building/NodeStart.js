import React, { memo } from "react";
import Block from "./Block";
import { Handle } from "react-flow-renderer";

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="source"
        position="bottom"
        id="start_edge_source_bottom"
        style={{ background: "#555" }}
      />
      <Block event="START" type="START" text={data.label} />
    </>
  );
});
