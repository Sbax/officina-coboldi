import Image from "next/image";
import React from "react";
import { createPortal } from "react-dom";
import modalStyle from "../styles/modal.module.scss";
import Button from "./button";

export default function Modal({ children, onClose }) {
  return createPortal(
    <section className={modalStyle.backdrop}>
      <section className={modalStyle.body}>
        <Button className={modalStyle.close} onClick={onClose || (() => {})}>
          <Image
            layout="intrinsic"
            width={25}
            height={25}
            objectFit="contain"
            src="/assets/times.svg"
            alt="Chiudi"
          />
        </Button>
        {children}
      </section>
    </section>,
    document.querySelector("main")
  );
}
