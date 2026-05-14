import React from "react";
import { Rect, Text, Group } from "react-konva";

import nodeSizes from "../helpers/_data_nodeSizes.json";

export default function RectComp({ x, y, text }) {
  const { width, height } = nodeSizes.rect;

  return (
    <Group>
      <Rect
        x={x - width / 2}
        y={y - height / 2}
        height={height}
        width={width}
        fill={"white"}
        cornerRadius={5}
        globalCompositeOperation={"destination-over"}
      />
      <Text
        text={text}
        x={x - width / 2}
        y={y - height / 2}
        height={height}
        width={width}
        align="center"
        verticalAlign="middle"
        fill="#4e71b8"
        fontSize={15}
        fontStyle={"bold"}
      />
    </Group>
  );
}
