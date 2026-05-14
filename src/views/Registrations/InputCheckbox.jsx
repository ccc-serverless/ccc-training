import styles from "./InputCheckbox.module.scss";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";

export default function InputCheckboxes({
  row,
  label,
  style,
  name,
  group,
  onChange,
  ...props
}) {
  function handleChange(e) {
    onChange(e, group, name);
    console.log({ group, name });
  }

  return (
    <div
      className={clsx(styles.wrapper, row && styles.row)}
      style={style ? style : {}}
    >
      <Checkbox
        onChange={handleChange}
        name={name}
        value={null}
        sx={{ padding: 0, marginRight: "6px" }}
        {...props}
      />
      <label>{label}</label>
    </div>
  );
}
