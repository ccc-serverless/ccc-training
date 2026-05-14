import { useRef, useState } from "react";
import style from "./InputDate.module.scss";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

export default function InputDate({ label, name, className, onChange, value }) {
  const ref = useRef();

  return (
    <div className={clsx(style.wrapper, className)} ref={ref}>
      <label>{label}</label>
      <DatePicker selected={value} onChange={onChange} />
    </div>
  );
}
