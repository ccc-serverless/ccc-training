import React, { useContext } from "react";
import { FlowChartContext } from "./InputOutput";
import clsx from "clsx";
import styles from "./ProcessFlow.module.scss";
import { BsArrowDown } from "react-icons/bs";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export default function ProcessFlow(props) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PROCESS,
    drop: (item, monitor) => useFlowChartContext.handleDropProcess(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const useFlowChartContext = useContext(FlowChartContext);

  function getProcessName(order) {
    switch (order) {
      case "1":
        return "Input";
      case "2":
        return "Process";
      case "3":
        return "Output";
      default:
        return "Invalid Process";
    }
  }

  function getProcessColor(order) {
    switch (order) {
      case "1":
        return styles.blue;
      case "2":
        return styles.yellow;
      case "3":
        return styles.pink;
      default:
        return null;
    }
  }

  return (
    <div className={styles.wrapper}>
      {props.flow.map((item) => (
        <React.Fragment key={item.order}>
          <p>{getProcessName(item.order)}</p>
          {item.text ? (
            <div className={clsx(styles.ioBox, getProcessColor(item.order))}>
              {item.text}
            </div>
          ) : (
            <div
              ref={drop}
              className={styles.processBox}
              style={
                isOver
                  ? { backgroundColor: "#eeeeee" }
                  : { backgroundColor: "#ffffff" }
              }
            >
              {props.children}
            </div>
          )}
          {item.order != 3 && (
            <div className={styles.connector}>
              <BsArrowDown />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
