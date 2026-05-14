import clsx from "clsx";
import style from "./Input.module.scss";

export default function Input({
  label,
  validationErrors,
  className,
  ...props
}) {
  return (
    <div className={clsx(style.wrapper, className)}>
      <label>{label}</label>
      <input {...props} />

      {validationErrors && validationErrors[props.name] && (
        <p>{validationErrors[props.name].message}</p>
      )}
    </div>
  );
}
