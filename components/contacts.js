import Link from "next/link";
import React from "react";
import contactsStyles from "../styles/contacts.module.scss";

export default function Contacts() {
  return (
    <section className={contactsStyles.container}>
      <section className={contactsStyles.logo}>
        <img src="/assets/logo-black.svg" alt="Officina Coboldi" />
      </section>
      <section className={contactsStyles.links}>
        <section>
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
        </section>

        <section>
          <Link href="/privacy-policy">
            <a>privacy policy</a>
          </Link>
        </section>
      </section>
    </section>
  );
}
