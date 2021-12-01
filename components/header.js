import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import headerStyles from "../styles/header.module.scss";
import Button from "./button";
import Container from "./container";

function Nav({ callback = () => {} }) {
  return (
    <nav className={headerStyles.navigation}>
      <Link href="/events">
        <a alt="Eventi" onClick={callback}>
          <Button>Gioca con noi</Button>
        </a>
      </Link>

      <span>
        <Link href="/#about">
          <a alt="Chi Siamo" onClick={callback}>
            Chi Siamo
          </a>
        </Link>
      </span>

      <span>
        <Link href="/posts">
          <a alt="Blog" onClick={callback}>
            Blog
          </a>
        </Link>
      </span>

      <span>
        <Link href="/#contacts">
          <a alt="Contatti" onClick={callback}>
            Contatti
          </a>
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
        className={`${headerStyles.menu} 
        ${menuOpen ? headerStyles.open : headerStyles.closed}`}
      >
        <header className={headerStyles.mobileHeader}>
          <Link href="/">
            <a className={headerStyles.logo} alt="Officina Coboldi">
              <Image
                layout="fill"
                width="100%"
                height="100%"
                objectFit="contain"
                src="/assets/logo.svg"
                alt="Logo di Officina Coboldi, un coboldo rosso con occhiali da saldatore"
              />
            </a>
          </Link>

          <Image
            layout="intrinsic"
            width={25}
            height={25}
            objectFit="contain"
            onClick={() => setMenuOpen(false)}
            className={headerStyles.close}
            src="/assets/close.svg"
            alt="Chiudi"
          />
        </header>
        <Nav callback={() => setMenuOpen(false)} />
      </section>

      <header className={headerStyles.header}>
        <Container className={headerStyles.content}>
          <section
            className={headerStyles.mobile}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Image
              layout="intrinsic"
              width={25}
              height={25}
              objectFit="contain"
              className={headerStyles.hamburger}
              src="/assets/hamburger.svg"
              alt="Menu"
            />
          </section>
          <Link href="/">
            <a className={headerStyles.logo}>
              <Image
                layout="fill"
                width="100%"
                height="100%"
                objectFit="contain"
                src="/assets/logo_head.svg"
                alt="Logo di Officina Coboldi, un coboldo rosso con occhiali da saldatore"
              />
            </a>
          </Link>
          <Nav />
          <section className={headerStyles.mobile}></section>
        </Container>
      </header>
    </>
  );
}
