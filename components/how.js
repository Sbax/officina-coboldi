import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./button";
import Container from "./container";
import aboutStyles from "../styles/how.module.scss";

function How() {
  return (
    <Container>
      <section className={aboutStyles.column}>
        <article>
          <h1 className={aboutStyles.title}>
            <span>Come si gioca con noi</span>
          </h1>
          <p>
            Vai nella pagina che contiene{" "}
            <Link href="/events">
              <a>tutti i nostri eventi</a>
            </Link>{" "}
            e scegli quello che ti piace di più, se hai domande su qualche
            serata unisciti al nostro{" "}
            <a href="https://t.me/OfficinaCoboldiGruppo">gruppo Telegram</a> e
            chiedi direttamente ai Coboldi!
          </p>
        </article>
        <article>
          <h1 className={aboutStyles.title}>
            <span>E se non so le regole?</span>
          </h1>
          <p>
            Siamo qui apposta! Tutte le nostre sessioni sono pensate per essere
            accessibili anche a chi è alla prima esperienza, ogni volta che sarà
            necessario conoscere le regole sarà specificato chiaramente.
          </p>
        </article>
        <article>
          <h1 className={aboutStyles.title}>
            <span>Non ho tempo per una campagna!</span>
          </h1>
          <p>
            La maggioranza dei nostri appuntamenti sono <i>oneshot</i>, delle
            partite che iniziano e finiscono nell&apos;arco della stessa serata.
          </p>

          <p>
            Alcune sessioni sono invece <b>open table</b> o{" "}
            <b>campagne aperte</b>, si tratta di storie più lunghe che si
            evolvono nel corso di più <i>episodi</i>, ma che non richiedono un
            gruppo fisso o una presenza costate. Potete partecipare a una
            sessione, vedere se vi piace e tornare liberamente quando ne avrete
            la possibilità!
          </p>
        </article>
        <article>
          <h1 className={aboutStyles.title}>
            <span>Non ho l&apos;età giusta!</span>
          </h1>
          <p>
            Se non diversamente specificato le nostre sessioni sono rivolte a un{" "}
            <b>pubblico maggiorenne</b>, non per i temi o i toni, ma perché
            troviamo molto difficile far incontrare i gusti di fasce di età
            molto differenti, preferendo organizzare appuntamenti distinti
            rivolti a pubblici più giovani.
          </p>

          <p>
            Se invece sei maggiorenne non ti fare problemi, i Coboldi accolgono
            tutte le generazioni!
          </p>
        </article>
        <article>
          <h1 className={aboutStyles.title}>
            <span>Voglio fare il master!</span>
          </h1>
          <p>
            Fantastico! Scrivici sul{" "}
            <a href="https://t.me/OfficinaCoboldiGruppo">gruppo Telegram</a> o
            tramite uno qualunque dei nostri contatti, cerceremo di riservarti
            uno spazio per farci giocare!
          </p>
        </article>
        <article>
          <h1 className={aboutStyles.title}>
            <span>Avete i tavoli sempre pieni!</span>
          </h1>
          <p>
            Spesso capita che le sessioni vadano a ruba! Scrivici e
            organizzeremo altri appuntamenti per accontentare la tua fame di
            giocare!
          </p>
        </article>
        <article>
          <h1 className={aboutStyles.title}>
            <span>Quanto si paga?</span>
          </h1>
          <p>
            La maggior parte dei nostri eventi sono completamente gratuiti e ci
            finanziamo tramite donazioni volontarie. Vogliamo far conoscere e
            giocare il gioco di ruolo a chiunque sia interessato, porta soltanto
            una matita e una buona dose di immaginazione, al resto pensiamo noi!
          </p>
        </article>
      </section>
    </Container>
  );
}

export default How;
