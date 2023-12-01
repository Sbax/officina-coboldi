import React, { useState } from "react";
import Container from "./container";
import aboutStyles from "../styles/about.module.scss";
import Button from "./button";

function Systems({ systems }) {
  const [systemsToShow, setSystemsToShow] = useState(systems.slice(0, 20));

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
        <section className={aboutStyles.column}>
          <ul className={aboutStyles.list}>
            {systemsToShow.map((system) => (
              <li key={system}>{system}</li>
            ))}
            {systemsToShow.length !== systems.length && <li>...</li>}
          </ul>

          {systemsToShow.length !== systems.length && (
            <a
              href="#"
              onClick={() => setSystemsToShow(systems)}
              className={aboutStyles.showMore}
            >
              Mostra tutti
            </a>
          )}
        </section>

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
