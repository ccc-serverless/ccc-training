import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import clsx from "clsx";

import style from "./InputRadio.module.scss";

export default function InputRadio({
  label,
  options,
  name,
  className,
  validationErrors,
  value,
  ...props
}) {
  return (
    <div className={clsx(style.wrapper, className)}>
      <FormControl>
        <label style={{ marginBottom: "1em" }}>{label}</label>

        <RadioGroup sx={{ marginLeft: "7px" }} name={name} {...props}>
          {options.map(({ value: valueCheckbox, label }) => (
            <FormControlLabel
              value={valueCheckbox}
              control={
                value ? (
                  <Radio
                    checked={value === valueCheckbox}
                    sx={{ padding: 0, marginRight: "10px" }}
                  />
                ) : (
                  <Radio sx={{ padding: 0, marginRight: "6px" }} />
                )
              }
              label={label}
            />
          ))}
        </RadioGroup>

        {validationErrors && validationErrors[name] && (
          <p>{validationErrors[name].message}</p>
        )}
      </FormControl>
    </div>
  );
}
