import React, { useState } from "react";
import errorStyle from "./Error.module.scss";
import { useField, ErrorMessage } from "formik";
import clsx from "clsx";
import Select from "react-select";

export default function SelectField({
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
      <Select
        {...props}
        options={options}
        onChange={(selectedOption) => {
          let fakeEvent = {
            target: { name: props.name, value: selectedOption },
          };
          onFieldChange(fakeEvent);
        }}
        onBlur={() => {
          onFieldBlur({ target: { name: props.name } });
        }}
      />
      <ErrorMessage name={field.name} component="p" />
    </div>
  );
}
