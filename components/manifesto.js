import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./button";
import Container from "./container";
import styles from "../styles/manifesto.module.scss";

function Manifesto() {
  return (
    <Container>
      <section className={styles.row}>
        <section className={styles.column}>
          <h1 className={styles.title}>Il Manifesto di Officina Coboldi</h1>
          <p>
            Come Officina Coboldi vogliamo essere una realtà di territorio
            inclusiva e accessibile perché tutti possano partecipare alle nostre
            attività e avvicinarsi al Gioco di Ruolo.
          </p>
          <br />
          <p>
            Per garantire che questo avvenga abbiamo stilato un Manifesto che
            raccoglie tutti i principi che condividiamo e reso scaricabile{" "}
            <a href="https://officina-coboldi.itch.io/manifesto-dei-principi-coboldi">
              sul nostro itch
            </a>
            .
          </p>
        </section>
        <section className={styles.column}>
          <Image
            className={styles.image}
            src="/assets/avatar/cute.png"
            alt="Un coboldo molto carino"
            layout="intrinsic"
            width={934}
            height={1077}
          />
        </section>
      </section>
    </Container>
  );
}

export default Manifesto;
