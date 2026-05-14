import React, { useRef, useState, useEffect } from "react";
import styles from "./Block.module.scss";

import clsx from "clsx";

export default function Block({ type, text }) {
  const blockRef = useRef();
  const [style, setStyle] = useState({});

  function getBlockType(type) {
    switch (type) {
      case "START":
        return styles.pill;
      case "END":
        return styles.pill;
      case "INPUT":
        return styles.paralellogram;
      case "PROCESS":
        return styles.rectangle;
      case "DECISION":
        return styles.diamond;
      case "BRANCH":
        return styles.circle;
      default:
        return styles.rectangle;
    }
  }

  useEffect(() => {
    if (type !== "BRANCH" && type !== "DECISION") {
      setStyle({});
    } else {
      setStyle(() => {
        const styles = window.getComputedStyle(blockRef.current);
        setStyle({
          height: `${styles.width}`,
          minHeight: `${styles["min-width"]}`,
        });
      });
    }
  }, [type]);

  return (
    <div ref={blockRef} className={clsx(styles.block, getBlockType(type))} style={style}>
      <p>{text}</p>
    </div>
  );
}
