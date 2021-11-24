import React from "react";
import Container from "./container";

export default function Footer() {
  return (
    <footer>
      <Container>
        Il sito raccoglie dati anonimi di navigazione{" / "}
        <a href="https://beampipe.io" alt="Beampipe">
          beampipe
        </a>
      </Container>
    </footer>
  );
}
