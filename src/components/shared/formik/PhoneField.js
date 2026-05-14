import React, { useState } from "react";
import errorStyle from "./Error.module.scss";
import { useField, ErrorMessage } from "formik";
import clsx from "clsx";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneField({
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
      <PhoneInput
        {...props}
        // pass defaultCountry as props
        value={field.phone}
        onChange={(phoneNumber) => {
          let fakeEvent = { target: { name: props.name, value: phoneNumber } };
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
