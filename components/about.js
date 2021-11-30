import React from "react";
import Container from "./container";
import aboutStyles from "../styles/about.module.scss";
import Image from "next/image";

export default function About() {
  return (
    <Container className={aboutStyles.container}>
      <div className={aboutStyles.image}>
        <Image
          src="/assets/logo.svg"
          alt="Logo di Officina Coboldi, un coboldo rosso con occhiali da saldatore"
          layout="intrinsic"
          width={600}
          height={300}
        />
      </div>

      <p>
        Un&apos;associazione dedicata alla promozione e la diffusione del gioco
        di ruolo nel circondario imolese
      </p>

      <hr />

      <section className={aboutStyles.description}>
        <p>
          Siamo DM e giocatori appassionati e sempre alla ricerca di nuovi
          giochi e sistemi su cui sfogare la nostra fantasia.
        </p>

        <p>
          Organizziamo serate di gioco di ruolo per novizi ed esperti in centri
          eterogenei per vivere la comunità che il territorio ci offre.
        </p>
      </section>
    </Container>
  );
}
