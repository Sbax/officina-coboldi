import Link from "next/link";
import React from "react";
import footerStyles from "../styles/footer.module.scss";
import Contacts from "./contacts";
import Container from "./container";

export default function Footer() {
  return (
    <footer>
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
        </nav>

        <section>
          Il sito raccoglie dati anonimi di navigazione{" / "}
          <a href="https://beampipe.io" alt="Beampipe">
            beampipe
          </a>
        </section>
      </Container>
    </footer>
  );
}
