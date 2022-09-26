import Container from "../components/container";
import How from "../components/how";
import Layout from "../components/layout";
import Meta from "../components/meta";
import Team from "../components/team";
import { getEvents } from "../lib/supabase";
import indexStyles from "../styles/index.module.scss";

export default function Events() {
  return (
    <>
      <Layout>
        <Meta
          title="Chi siamo"
          description="I membri dell'associazione e alcune informazioni utili sulle nostre attività"
        />

        <Container>
          <a href="#" className={indexStyles.anchor} id="team" />
          <Team />

          <a href="#" className={indexStyles.anchor} id="how" />
          <How />
        </Container>
      </Layout>
    </>
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
