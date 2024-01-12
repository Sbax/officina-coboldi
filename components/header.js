import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import headerStyles from "../styles/header.module.scss";
import Button from "./button";
import Container from "./container";

function Nav({ callback = () => {}, children }) {
  return (
    <nav className={headerStyles.navigation}>
      <Link href="/events">
        <a alt="Eventi" onClick={callback}>
          <Button>Gioca con noi</Button>
        </a>
      </Link>

      <span>
        <Link href="/about">
          <a alt="Chi Siamo" onClick={callback}>
            Chi Siamo
          </a>
        </Link>
      </span>

      <span>
        <Link href="/about#how">
          <a alt="Come si gioca?" onClick={callback}>
            Come si gioca?
          </a>
        </Link>
      </span>

      {children}
    </nav>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [top, setTop] = useState(true);

  useEffect(() => {
    const main = document.querySelector("main");

    const handleScroll = () => setTop(main.scrollTop === 0);

    main.addEventListener("scroll", handleScroll);

    return () => {
      main.removeEventListener("scroll", handleScroll);
    };
  }, [setTop]);

  const closeMenu = () => setMenuOpen(false);

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
                objectFit="contain"
                src="/assets/logo.svg"
                alt="Logo di Officina Coboldi, un coboldo rosso in un ingranaggio"
              />
            </a>
          </Link>

          <Image
            layout="intrinsic"
            width={25}
            height={25}
            objectFit="contain"
            onClick={closeMenu}
            className={headerStyles.close}
            src="/assets/close.svg"
            alt="Chiudi"
          />
        </header>
        <Nav callback={closeMenu}>
          <span>
            <Link href="/posts">
              <a alt="Blog" onClick={closeMenu}>
                Blog
              </a>
            </Link>
          </span>

          <span>
            <Link href="/#contacts">
              <a alt="Contatti" onClick={closeMenu}>
                Contatti
              </a>
            </Link>
          </span>

          <span>
            <a href="https://feedback.officinacoboldi.it" alt="Feedback">
              Feedback
            </a>
          </span>
        </Nav>
      </section>

      <header className={`${headerStyles.header} ${top && headerStyles.top}`}>
        <Container className={headerStyles.content}>
          <section
            onClick={() => setMenuOpen(!menuOpen)}
            className={headerStyles.hamburger}
          >
            <Image
              layout="intrinsic"
              width={25}
              height={25}
              objectFit="contain"
              src="/assets/hamburger.svg"
              alt="Menu"
            />
          </section>
          <Link href="/">
            <a className={headerStyles.logo}>
              <Image
                layout="fill"
                objectFit="contain"
                src="/assets/logo.svg"
                alt="Logo di Officina Coboldi, un coboldo rosso in un ingranaggio"
              />
            </a>
          </Link>
          <Nav />
          <div className={headerStyles.hideOnDesktop}>
            <Link href="/events">
              <a alt="Eventi">
                <Button>Gioca con noi</Button>
              </a>
            </Link>
          </div>
        </Container>
      </header>
    </>
  );
}
