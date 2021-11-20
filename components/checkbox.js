import React from "react";
import checkboxStyle from "../styles/checkbox.module.scss";

export default function Checkbox({ children, value, onChange }) {
  return (
    <div className={checkboxStyle.checkbox}>
      <input
        type="checkbox"
        name="checkbox"
        checked={value}
        onChange={onChange}
      />
      {children}
    </div>
  );
}
