import React from "react";
import { Image } from "react-konva";

import useImage from "use-image";

const UserIcon = React.forwardRef((props, ref) => {
  const [image] = useImage("https://jayaho-common.s3.ap-south-1.amazonaws.com/player-icon.svg");
  return <Image ref={ref} x={props.x - 7} y={props.y - 10} image={image} width={15} height={24} />;
});

export default UserIcon;
