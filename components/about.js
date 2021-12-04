import React from "react";
import Container from "./container";
import aboutStyles from "../styles/about.module.scss";
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  return (
    <>
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
          Un&apos;associazione dedicata alla promozione e la diffusione del
          gioco di ruolo nel circondario imolese
        </p>

        <hr />
      </Container>
      <Container className={aboutStyles.container}>
        <section className={aboutStyles.description}>
          <p>
            Siamo DM e giocatori appassionati e sempre alla ricerca di nuovi
            giochi e sistemi su cui sfogare la nostra fantasia.
          </p>

          <p>
            Organizziamo serate di gioco di ruolo per novizi ed esperti in
            centri eterogenei per vivere la comunità che il territorio ci offre.
          </p>
        </section>
      </Container>
      <Container>
        <section className={aboutStyles.avatar}>
          <article className={aboutStyles.profile}>
            <Image
              src="/assets/avatar/angry.png"
              alt="Un coboldo molto arrabbiato"
              layout="intrinsic"
              width={934}
              height={1309}
            />

            <h1>Matteo</h1>
            <h2>Giuro che di persona non sono cos&igrave; arrabbiato</h2>
            <h3>
              <Link href="https://www.instagram.com/heysbax/">
                <a alt="Instagram di Matteo">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </Link>

              <Link href="https://mb.maletta.space/">
                <a alt="Sito di Matteo">
                  <FontAwesomeIcon icon={faLink} />
                </a>
              </Link>
            </h3>
          </article>

          <article className={aboutStyles.profile}>
            <Image
              src="/assets/avatar/cute.png"
              alt="Un coboldo molto carino"
              layout="intrinsic"
              width={934}
              height={1077}
            />

            <h1>William</h1>
            <h2>Hai un momento per parlare di Sine Requie?</h2>
            <h3>
              <Link href="https://www.instagram.com/_.am.i.will._/">
                <a alt="Instagram di William">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </Link>
            </h3>
          </article>
        </section>
      </Container>
    </>
  );
}
