import Link from "next/link";
import AboutComponent from "../components/about";
import Button from "../components/button";
import Container from "../components/container";
import How from "../components/how";
import Layout from "../components/layout";
import Manifesto from "../components/manifesto";
import Meta from "../components/meta";
import Team from "../components/team";
import { getEvents } from "../lib/supabase";
import indexStyles from "../styles/index.module.scss";

export default function About({ events }) {
  return (
    <Layout>
      <Meta
        title="Chi siamo"
        description="I membri dell'associazione e alcune informazioni utili sulle nostre attività"
      />

      <Container>
        <AboutComponent hideButtons />

        <a href="#" className={indexStyles.anchor} id="manifesto" />
        <Manifesto />

        <Container>
          <section className={indexStyles.row}>
            <section className={indexStyles.column}>
              <p>
                Molti artisti hanno contribuito a creare materiale per aiutarci
                a diffondere le nostre attività e i nostri eventi. Tutte le
                illustrazioni che abbiamo utilizzato sono state create da
                diversi artisti, abbiamo raccolto tutto il materiale in una
                pagina dedicata per ringraziarli a dovere!
              </p>
              <Link href="/art">
                <a>
                  <Button primary>Vedi tutti gli artwork!</Button>
                </a>
              </Link>
            </section>
          </section>
        </Container>

        <a href="#" className={indexStyles.anchor} id="how" />
        <How />

        <a href="#" className={indexStyles.anchor} id="team" />
        <Team events={events} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const events = await getEvents();
  return {
    props: {
      events: events.error ? [] : events,
    },
  };
}
