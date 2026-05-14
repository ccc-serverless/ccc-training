import React from "react";
import { Group, Circle, Text } from "react-konva";

import nodeSizes from "../helpers/_data_nodeSizes.json";

export default function CircleComp({ x, y, text, event }) {
  const { radius } = nodeSizes.circle;
  const width = radius;
  const height = radius;

  return (
    <Group>
      {event === "START" || event === "END" ? (
        <Circle
          x={x}
          y={y}
          radius={radius}
          fill={"white"}
          globalCompositeOperation={"destination-over"}
        />
      ) : (
        <Circle
          x={x}
          y={y}
          radius={radius}
          fill={"white"}
          globalCompositeOperation={"destination-over"}
        />
      )}

      {text && (
        <Text
          x={x - width / 2}
          y={y - height / 2}
          text={text}
          height={height}
          width={width}
          align="center"
          verticalAlign="middle"
          fill="#4e71b8"
          fontSize={13}
          fontStyle={"bold"}
        />
      )}
    </Group>
  );
}
