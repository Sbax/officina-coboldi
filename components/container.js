import React from "react";
import { container } from "../styles/container.module.scss";

export default function Container({ children, className, ...props }) {
  return (
    <section className={`${container} ${className}`} {...props}>
      {children}
    </section>
  );
}
