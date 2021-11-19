import React from "react";
import inputStyles from "../styles/input.module.scss";

export default function Input({ className, error, ...props }) {
  return (
    <input
      className={`${inputStyles.input} ${className} 
      ${error && inputStyles.error}`}
      {...props}
    />
  );
}
