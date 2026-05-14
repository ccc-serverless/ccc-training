import React, { useState } from "react";
import errorStyle from "./Error.module.scss";
import { useField, ErrorMessage } from "formik";
import clsx from "clsx";

export default function TextField({ label, className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={clsx(className, meta.touched && meta.error && errorStyle.error)}>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} />
      <ErrorMessage name={field.name} component="p" />
    </div>
  );
}
