import Link from "next/link";
import React from "react";
import footerStyles from "../styles/footer.module.scss";
import AuthenticationButtons from "./authentication-buttons";
import Contacts from "./contacts";
import Container from "./container";

export default function Footer() {
  return (
    <footer className={footerStyles.container}>
      <Container>
        <Contacts />
      </Container>
      <Container className={footerStyles.footer}>
        <nav className={footerStyles.links}>
          <span>
            <Link href="/privacy-policy">
              <a alt="Privacy Policy">privacy policy</a>
            </Link>
          </span>

          <span>
            <Link href="/statuto">
              <a alt="Statuto">statuto</a>
            </Link>
          </span>

          <span>
            <AuthenticationButtons />
          </span>
        </nav>

        <section className={footerStyles.disclaimer}>
          Il sito raccoglie dati anonimi di navigazione{" / "}
          <a
            href="https://app.beampipe.io/domain/officinacoboldi.it"
            alt="Beampipe"
          >
            beampipe
          </a>
        </section>
      </Container>
    </footer>
  );
}
