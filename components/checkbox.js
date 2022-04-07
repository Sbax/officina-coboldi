import React from "react";
import { useRef, useEffect } from "react";
import checkboxStyle from "../styles/checkbox.module.scss";

export default function Checkbox({ children, value, onChange, indeterminate }) {
  const checked = indeterminate ? false : value;
  const ref = useRef();

  useEffect(() => {
    ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <span className={checkboxStyle.checkbox}>
      <input
        type="checkbox"
        name="checkbox"
        onChange={onChange}
        checked={checked}
        ref={ref}
      />
      {children}
    </span>
  );
}
