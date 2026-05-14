import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import style from "./InputPhone.module.scss";

export default function InputPhone({
  name,
  label,
  value,
  onChange,
  validationErrors,
}) {
  return (
    <div className={style.wrapper}>
      <label>{label}</label>
      <PhoneInput
        name={name}
        defaultCountry="IN"
        value={value}
        onChange={(e) => {
          onChange({ target: { name, value: e } });
        }}
      />

      <p>{validationErrors[name] && validationErrors[name].message}</p>
    </div>
  );
}
