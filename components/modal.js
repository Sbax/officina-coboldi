import React from "react";
import modalStyle from "../styles/modal.module.scss";
import Button from "./button";

export default function Modal({ children, onClose }) {
  return (
    <section className={modalStyle.backdrop}>
      <section className={modalStyle.body}>
        <Button className={modalStyle.close} onClick={onClose || (() => {})}>
          <img src="/assets/times.svg" alt="Close" />
        </Button>
        {children}
      </section>
    </section>
  );
}
