import React from "react";
import styles from "./Block.module.scss";

import clsx from "clsx";

export default function Block({ type, text, bgColor }) {
  function getBlockType(type) {
    switch (type) {
      case "pill":
        return styles.pill;
      case "paralellogram":
        return styles.paralellogram;
      case "rectangle":
        return styles.rectangle;
      default:
        return styles.rectangle;
    }
  }

  return (
    <div className={clsx(styles.block, getBlockType(type))} style={{ backgroundColor: bgColor }}>
      <p>{text}</p>
    </div>
  );
}
