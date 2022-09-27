import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./button";
import Container from "./container";
import aboutStyles from "../styles/about.module.scss";

function How() {
  return (
    <Container>
      <section className={aboutStyles.rowReverse}>
        <section className={aboutStyles.column}>
          <h1 className={aboutStyles.title}>Come si gioca con noi?</h1>
          <p>
            Proponiamo diversi appuntamenti a cadenza settimanale sia per
            avventure brevi che per oneshot che si concludono in un&apos;unica
            serata.
          </p>
          <br />
          <p>
            I nostri eventi sono completamente gratuiti, vogliamo far conoscere
            e giocare il gioco di ruolo a chiunque sia interessato, porta
            soltanto una matita e una buona dose di immaginazione, al resto
            pensiamo noi!
          </p>
          <div className={aboutStyles.buttonContainer}>
            <Link href="/events">
              <a alt="eventi">
                <Button secondary>Gioca con noi!</Button>
              </a>
            </Link>
          </div>
          <p>
            Se non trovi spazi disponibili, che tu sia un giocatore o un master,{" "}
            <Link href="/#contacts">
              <a alt="Contatti">contattaci</a>
            </Link>
            ! Organizziamo tavoli anche basandoci sulle richieste ricevute.
          </p>
          <br />
          <p>
            Se non diversamente specificato le nostre sessioni sono rivolte a un
            pubblico maggiorenne, non per i temi o i toni, ma perché troviamo
            molto difficile far incontrare i gusti di fasce di età molto
            differenti, preferendo organizzare appuntamenti distinti rivolti a
            pubblici più giovani.
          </p>
          <p>
            Se sei minorenne, ma vuoi comunque partecipare a una sessione{" "}
            <Link href="/#contacts">
              <a alt="Contatti">contattaci</a>
            </Link>{" "}
            e troveremo un modo per accontentarti!
          </p>
        </section>
        <section className={aboutStyles.column}>
          <Image
            className={aboutStyles.image}
            src="/assets/avatar/cute.png"
            alt="Un coboldo molto carino"
            layout="intrinsic"
            width={934}
            height={1077}
          />
        </section>
      </section>

      <section className={aboutStyles.row}>
        <section className={aboutStyles.column}>
          <Image
            className={aboutStyles.iamge}
            src="/assets/avatar/angry.png"
            alt="Un coboldo molto arrabbiato"
            layout="intrinsic"
            width={934}
            height={1309}
          />
        </section>
        <section className={aboutStyles.column}>
          <h1 className={aboutStyles.title}>Dove giochiamo?</h1>
          <p>
            Al momento non abbiamo una vera e propria sede e organizziamo le
            nostre serate in vari locali che ci ospitano.
          </p>
          <p>
            Il luogo dove &egrave; più frequente trovarci è il{" "}
            <a href="https://goo.gl/maps/Zmrvr5iyZi4L28Kp8">
              Centro Giovanile Ca&apos;Vaina
            </a>{" "}
            in cui collaboriamo con l&apos;associazione{" "}
            <a href="https://officinaimmaginata.it/">Officina Immaginata</a> per
            organizzare serate di gioco di ruolo a cadenza fissa.
          </p>
          <br />
          <p>
            Se gestisci uno spazio e ci vuoi accogliere per giocare di ruolo, se
            vuoi giocare con noi, oppure venire a vedere una delle nostre serate
            contattaci via <a href="mailto:info@officinacoboldi.it">mail</a>!
          </p>
        </section>
      </section>
    </Container>
  );
}

export default How;