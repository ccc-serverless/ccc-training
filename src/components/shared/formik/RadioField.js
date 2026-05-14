import React, { useState } from "react";
import style from "./RadioField.module.scss";
import errorStyle from "./Error.module.scss";
import { useField, ErrorMessage } from "formik";
import clsx from "clsx";

import styled from "styled-components";

const Radio = styled.div`
  width: 1.25em;
  height: 1.25em;
  border: 2px solid #ffffff;
  border-radius: 50%;
  margin-right: 10px;
  padding: 2px;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background-color: ${(props) => props.backgroundColor};
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.15s;
  }
`;

export default function RadioField({ label, className, backgroundColor, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className={clsx(className)}>
      <label htmlFor={props.id} className={style.radioWrapper}>
        <input type="radio" {...field} {...props} className={style.radioInput} />
        <Radio backgroundColor={backgroundColor} className={style.radio}></Radio>
        {label}
      </label>
    </div>
  );
}
