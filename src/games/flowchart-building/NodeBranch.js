import React, { memo } from "react";
import Block from "./Block";
import { Handle } from "react-flow-renderer";

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="source"
        position="bottom"
        id="bottom"
        style={{ background: "#555" }}
      />
      <Handle type="source" position="top" id="top" style={{ background: "#555" }} />

      <Handle type="source" position="left" id="left" style={{ background: "#555" }} />
      <Handle type="source" position="right" id="right" style={{ background: "#555" }} />

      <Block type="BRANCH" text={data.label} />
    </>
  );
});
