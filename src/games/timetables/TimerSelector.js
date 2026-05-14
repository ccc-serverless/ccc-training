import React from "react";
import { PropTypes } from "prop-types";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import style from "./TimeSelector.module.scss";

const SelectTime = (props) => {
  return (
    <div className={style.rootTimeSelector}>
      <span>{props.title}</span>
      <Dropdown
        controlClassName={style.dropdownControl}
        placeholderClassName={style.dropdownPlaceholder}
        options={props.option}
        onChange={props.onChange}
        value={props.value}
        // style={props.style}
      />
    </div>
  );
};

SelectTime.propTypes = {
  option: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
export default SelectTime;
