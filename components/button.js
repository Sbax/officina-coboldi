import React from "react";
import buttonStyles from "../styles/button.module.scss";

export default function Button({
  children,
  primary,
  secondary,
  className,
  ...props
}) {
  return (
    <button
      {...props}
      className={`${buttonStyles.button}
        ${primary ? buttonStyles.primary : ""}
        ${secondary ? buttonStyles.secondary : ""}
        ${className} 
      `}
    >
      {children}
    </button>
  );
}
