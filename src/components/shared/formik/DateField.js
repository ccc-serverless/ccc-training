import React, { useState } from "react";
import errorStyle from "./Error.module.scss";
import { useField, ErrorMessage } from "formik";
import clsx from "clsx";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateField({
  label,
  className,
  options,
  onFieldChange,
  onFieldBlur,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <div className={clsx(className, meta.touched && meta.error && errorStyle.error)}>
      <label htmlFor={field.name}>{label}</label>
      <DatePicker
        name="dob"
        selected={field.value}
        onChange={(selectedDate) => {
          let fakeEvent = { target: { name: "dob", value: selectedDate } };
          onFieldChange(fakeEvent);
        }}
        onBlur={() => {
          onFieldBlur({ target: { name: "dob" } });
        }}
      />
      <ErrorMessage name={field.name} component="p" />
    </div>
  );
}
