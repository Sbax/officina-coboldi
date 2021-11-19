import React from "react";
import stripStyles from "../styles/strip.module.scss";

export default function Strip({ children, primary, className, ...props }) {
  return (
    <section
      className={`${stripStyles.strip} ${
        primary && stripStyles.primary
      } ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
