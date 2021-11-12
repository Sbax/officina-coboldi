import React from "react";
import { strip } from "../styles/strip.module.scss";

export default function Strip({ children, ...props }) {
  return (
    <section className={strip} {...props}>
      {children}
    </section>
  );
}
