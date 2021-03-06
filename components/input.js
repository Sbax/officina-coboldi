import React from "react";
import inputStyles from "../styles/input.module.scss";

export default function Input({ className, error, ...props }) {
  return (
    <span>
      <input
        className={`${inputStyles.input} ${className} 
      ${error && inputStyles.error}`}
        {...props}
      />
    </span>
  );
}
