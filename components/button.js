import React from "react";
import buttonStyles from "../styles/button.module.scss";

export default function Button({ children, primary, secondary }) {
  return (
    <button
      className={`${buttonStyles.button} ${
        primary ? buttonStyles.primary : ""
      } ${secondary ? buttonStyles.secondary : ""}`}
    >
      {children}
    </button>
  );
}
