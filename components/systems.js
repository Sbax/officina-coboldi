import React from "react";
import Container from "./container";
import aboutStyles from "../styles/about.module.scss";

function Systems({ systems }) {
  return (
    <Container className={aboutStyles.systemsContainer}>
      <h1 className={aboutStyles.title}>A cosa giochiamo?</h1>

      <section className={aboutStyles.column}>
        <p>
          Di seguito potete trovare una lista di tutti i giochi che abbiamo
          proposto, ma è in continuo aggiornamento! Ci piace sperimentare con
          nuovi sistemi e metterci alla prova con diversi stili di gioco,
          inoltre siamo tanti master con gusti e passioni differenti, che ci
          permette di avere una scelta davvero ampia!
        </p>

        <ul className={aboutStyles.list}>
          {systems
            .sort((a, b) => a.localeCompare(b))
            .map((system) => (
              <li key={system}>{system}</li>
            ))}
        </ul>

        <p>
          Qualcuno di questi giochi ti incuriosisce? Vuoi fare qualche domanda
          ai Coboldi e richiedere una sessione? Unisciti al nostro{" "}
          <a href="https://t.me/OfficinaCoboldiGruppo">gruppo Telegram</a>!
        </p>
      </section>
    </Container>
  );
}

export default Systems;
