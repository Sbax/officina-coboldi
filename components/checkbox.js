import React from "react";
import checkboxStyle from "../styles/checkbox.module.scss";

export default function Checkbox({ children }) {
  return (
    <label class={checkboxStyle.checkbox}>
      <input type="checkbox" name="checkbox" />
      {children}
    </label>
  );
}
