import Link from "next/link";
import { useState } from "react";
import headerStyles from "../styles/header.module.scss";
import Button from "./button";
import Container from "./container";

function Nav({ callback = () => {} }) {
  return (
    <nav className={headerStyles.navigation}>
      <Link href="/#play">
        <a onClick={callback}>
          <Button>Gioca con noi</Button>
        </a>
      </Link>

      <span>
        <Link href="/#about">
          <a onClick={callback}>Chi Siamo</a>
        </Link>
      </span>

      <span>
        <Link href="/#blog">
          <a onClick={callback}>Blog</a>
        </Link>
      </span>

      <span>
        <Link href="/#contacts">
          <a onClick={callback}>Contatti</a>
        </Link>
      </span>
    </nav>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section
        className={`${headerStyles.menu} ${
          !menuOpen ? headerStyles.closed : ""
        }`}
      >
        <header className={headerStyles.mobileHeader}>
          <Link href="/">
            <a className={headerStyles.logo}>
              <img src="/assets/logo.svg" alt="Officina Coboldi" />
            </a>
          </Link>

          <img
            onClick={() => setMenuOpen(false)}
            className={headerStyles.close}
            src="/assets/close.svg"
            alt="Close"
          />
        </header>
        <Nav callback={() => setMenuOpen(false)} />
      </section>

      <header className={headerStyles.header}>
        <Container className={headerStyles.content}>
          <div
            className={headerStyles.mobile}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              className={headerStyles.hamburger}
              src="/assets/hamburger.svg"
              alt="Menu"
            />
          </div>
          <Link href="/">
            <a className={headerStyles.logo}>
              <img src="/assets/logo.svg" alt="Officina Coboldi" />
            </a>
          </Link>
          <Nav />
          <div className={headerStyles.mobile}></div>
        </Container>
      </header>
    </>
  );
}
