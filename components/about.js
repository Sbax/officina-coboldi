import Image from "next/image";
import Link from "next/link";
import aboutStyles from "../styles/about.module.scss";
import Button from "./button";
import Container from "./container";

export default function About({ hideButtons }) {
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

        <section className={aboutStyles.description}>
          <p>
            Un&apos;associazione dedicata alla promozione e la diffusione del
            gioco di ruolo GdR a Imola e nel circondario imolese
          </p>
        </section>
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
            centri eterogenei per vivere la comunit&agrave; che il territorio ci
            offre.
          </p>
        </section>
      </Container>
      {!hideButtons && (
        <Container className={aboutStyles.buttons}>
          <p>Vuoi saperne di più? Clicca uno dei due pulsanti!</p>
          <article>
            <Link href="/about#team">
              <a>
                <Button primary>Chi siamo?</Button>
              </a>
            </Link>
            <Link href="/about#how">
              <a>
                <Button secondary>Come si gioca con noi?</Button>
              </a>
            </Link>
          </article>
        </Container>
      )}
    </>
  );
}
