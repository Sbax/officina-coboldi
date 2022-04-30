import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import aboutStyles from "../styles/about.module.scss";
import Container from "./container";
import ExpandableQAndA from "./expandable-q-and-a";

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
          gioco di ruolo GdR a Imola e nel circondario imolese
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
            centri eterogenei per vivere la comunit&agrave; che il territorio ci offre.
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

        <section>
          <ExpandableQAndA title="Dove siamo?">
            <p>
              Al momento non abbiamo una vera e propria sede e organizziamo le
              nostre serate in vari locali che ci ospitano.
            </p>
            <p>
              Il luogo dove sar&agrave; più frequente trovarci è il{" "}
              <a href="https://goo.gl/maps/Zmrvr5iyZi4L28Kp8">
                Centro Giovanile Ca&apos;Vaina
              </a>{" "}
              in cui collaboriamo con l&apos;associazione{" "}
              <a href="https://officinaimmaginata.it/">Officina Immaginata</a>{" "}
              per organizzare serate di gioco di ruolo a cadenza fissa.
            </p>
            <br />
            <p>
              Se gestisci uno spazio e ci vuoi accogliere per giocare di ruolo,
              se vuoi giocare con noi, oppure venire a vedere una delle nostre
              serate contattaci via{" "}
              <a href="mailto:info@officinacoboldi.it">mail</a>!
            </p>
          </ExpandableQAndA>

          <ExpandableQAndA title="Come si gioca con noi?">
            <p>
              Proponiamo diversi appuntamenti a cadenza settimanale: le oneshot
              sono partite che si concludono la sera stessa, utili per provare
              un nuovo gioco o avventure inconsuete.
            </p>
            <p>
              Le campagne sono avventure lunghe che si protraggono nell&apos;arco di
              più settimane, permettono di esplorare a fondo un sistema di gioco
              e interpretare la crescita del personaggio che interpreterete e
              accompagnerete in avventure epiche.
            </p>
            <br />
            <p>
              Se non trovi spazi disponibili, che tu sia un giocatore o un
              master,{" "}
              <Link href="/#contacts">
                <a alt="Contatti">contattaci</a>
              </Link>
              ! Organizziamo tavoli anche basandoci sulle richieste ricevute.
            </p>
          </ExpandableQAndA>

          <ExpandableQAndA title="Quanto costa?">
            <p>
              I nostri eventi sono completamente gratuiti! Vogliamo far
              conoscere e giocare il gioco di ruolo a chiunque sia interessato,
              porta soltanto una matita e una buona dose di immaginazione, al
              resto pensiamo noi!
            </p>
          </ExpandableQAndA>
        </section>
      </Container>
    </>
  );
}
