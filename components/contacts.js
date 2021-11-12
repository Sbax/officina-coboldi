import React from "react";
import contactsStyles from "../styles/contacts.module.scss";

export default function Contacts() {
  return (
    <section className={contactsStyles.container}>
      <div className={contactsStyles.logo}>
        <img src="/assets/logo-black.svg" alt="Officina Coboldi" />
      </div>
      <div>
        <h1>Contatti</h1>
        <ul className={contactsStyles.social}>
          <li>
            <a href="mailto:info@officinacoboldi.it">mail</a>
          </li>
          <li>
            <a href="https://www.instagram.com/officinacoboldi/">instagram</a>
          </li>

          <li>
            <a href="https://www.facebook.com/OfficinaCoboldi/">facebook</a>
          </li>

          <li>
            <a href="https://t.me/OfficinaCoboldi">telegram</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
