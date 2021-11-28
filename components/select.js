import React from "react";
import inputStyles from "../styles/input.module.scss";

export default function Select({ className, error, children, ...props }) {
  return (
    <span>
      <select
        className={`${inputStyles.input} ${className} 
      ${error && inputStyles.error}`}
        {...props}
      >
        {children}
      </select>
    </span>
  );
}
