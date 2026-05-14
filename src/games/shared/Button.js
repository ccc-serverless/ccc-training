import React from "react";

const Button = (props) => {
  let background, color, border;
  if (props.background === "orange") {
    background = "#f08a5d";
    color = "#ffffff";
    border = "#f08a5d";
  } else if (props.background === "maroon") {
    background = "#b83b5e";
    color = "#ffffff";
    border = "#b83b5e";
  } else if (props.background === "purple") {
    background = "#6a2c70";
    color = "#ffffff";
    border = "#6a2c70";
  } else if (props.background === "white-grey") {
    background = "#ffffff";
    color = "#a6a6a6";
    border = "#cacaca";
  } else if (props.background === "white-orange") {
    background = "#ffffff";
    color = "#f08a5d";
    border = "#f08a5d";
  } else if (props.background === "white-maroon") {
    background = "#ffffff";
    color = "#b83b5e";
    border = "#cacaca";
  } else {
    background = "#f08a5d";
    color = "#ffffff";
  }

  const buttonStyle = {
    backgroundColor: `${background}`,
    color: `${color}`,
    outline: "none",
    width: "120px",
    height: "40px",
    border: `1px solid ${border}`,
    borderRadius: `${props.radius}px`,
    fontSize: "1rem",
    fontWeight: "500",
    letterspacing: "1px",
    cursor: "pointer",
  };
  return (
    <button
      className={props.className}
      style={buttonStyle}
      onClick={props.onClick}
      id={props.id}
    >
      {props.title}
    </button>
  );
};

export default Button;
