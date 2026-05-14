import Select from "react-select";
import style from "./InputSelect.module.scss";

export default function InputSelect({
  label,
  options,
  name,
  onChange,
  validationErrors,
  ...props
}) {
  const selectorStyle = {
    container: (styles, { isFocused }) => ({
      ...styles,
      borderColor: "transparent !important",
      backgroundColor: "#e7f6ff",
    }),
    control: (styles, { isFocused }) => ({
      ...styles,
      boxShadow: "unset !important",
      borderColor: "#e6e6e6 !important",
      fontSize: "14px",
      borderRadius: "5px",
      width: "100%",
      cursor: "pointer",
      backgroundColor: "#e7f6ff",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#e7f6ff" : "white",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#e7f6ff",
        },
      };
    },
    input: (styles) => ({ ...styles, color: "transparent" }),
  };

  function handleChange(e) {
    onChange(e, name);
  }

  return (
    <div className={style.wrapper}>
      <label>{label}</label>
      <Select
        styles={selectorStyle}
        options={options}
        onChange={handleChange}
        {...props}
      />

      {validationErrors && validationErrors[name] && (
        <p>{validationErrors[name].message}</p>
      )}
    </div>
  );
}
