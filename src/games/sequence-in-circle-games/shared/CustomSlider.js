import React from "react";
import PropTypes from "prop-types";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./Slider.scss";

function CustomSlider(props) {
  function handleChange(value) {
    props.handleChange(value);
  }

  return (
    <div className="slider custom-labels">
      <Slider
        tooltip={false}
        min={props.min}
        max={props.max}
        labels={props.label}
        value={props.value}
        handleLabel={props.value.toString()}
        onChange={handleChange}
      />
    </div>
  );
}

CustomSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.object,
  handleLabel: PropTypes.number,
  onChange: PropTypes.func,
};

export default CustomSlider;
