import React from "react";
import ClipLoader from "react-spinners/PulseLoader";

export default function InlinePreloader() {
  return (
    <div
      style={{
        display: "flex",
        height: "250px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ClipLoader color={"#1176ae"} size={10} />
    </div>
  );
}
